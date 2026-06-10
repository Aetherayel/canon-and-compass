import type { APIRoute } from "astro"

export const prerender = false

const CONTACT_SUCCESS_PATH = "/contact/thanks/"
const OWNER_SUBJECT = "New Canon & Compass contact form submission"
const OWNER_MESSAGE_LIMIT = 10000
const FIELD_LIMIT = 200

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")

const normalize = (value: FormDataEntryValue | null, maxLength = FIELD_LIMIT) => {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, maxLength)
}

const normalizeMessage = (value: FormDataEntryValue | null) => {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, OWNER_MESSAGE_LIMIT)
}

const buildAbsoluteUrl = (request: Request, path: string) => new URL(path, request.url).toString()

const htmlResponse = (message: string, status: number) =>
  new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Contact Form Error</title></head><body><main><h1>Contact form error</h1><p>${escapeHtml(message)}</p><p><a href="/contact">Return to contact page</a></p></main></body></html>`,
    {
      status,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    },
  )

const sendEmail = async ({
  apiKey,
  payload,
}: {
  apiKey: string
  payload: Record<string, unknown>
}) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Resend request failed (${response.status}): ${body}`)
  }
}

export const POST: APIRoute = async ({ request }) => {
  const contentType = request.headers.get("content-type") ?? ""
  if (
    !contentType.includes("application/x-www-form-urlencoded") &&
    !contentType.includes("multipart/form-data")
  ) {
    return htmlResponse("Invalid form submission.", 400)
  }

  const origin = request.headers.get("origin")
  if (origin && origin !== new URL(request.url).origin) {
    return htmlResponse("Cross-site form submissions are not allowed.", 403)
  }

  const formData = await request.formData()

  const honeypot = normalize(formData.get("company"))
  if (honeypot) {
    return Response.redirect(buildAbsoluteUrl(request, CONTACT_SUCCESS_PATH), 303)
  }

  const name = normalize(formData.get("name"))
  const email = normalize(formData.get("email"))
  const subject = normalize(formData.get("subject"))
  const message = normalizeMessage(formData.get("message"))

  if (!subject || !message) {
    return htmlResponse("Subject and message are required.", 400)
  }

  if (email && !emailPattern.test(email)) {
    return htmlResponse("Return email must be a valid email address.", 400)
  }

  const apiKey = import.meta.env.RESEND_API_KEY
  const fromEmail = import.meta.env.CONTACT_FROM_EMAIL
  const toEmail = import.meta.env.CONTACT_TO_EMAIL ?? "contact@canonandcompass.com"

  if (!apiKey || !fromEmail) {
    console.error("Missing contact form email configuration.")
    return htmlResponse("The contact form is temporarily unavailable.", 500)
  }

  const safeName = name || "Not provided"
  const safeEmail = email || "Not provided"
  const safeSubject = escapeHtml(subject)
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />")

  try {
    await sendEmail({
      apiKey,
      payload: {
        from: fromEmail,
        to: [toEmail],
        subject: `${OWNER_SUBJECT}: ${subject}`,
        reply_to: email || undefined,
        html: `
          <h1>${OWNER_SUBJECT}</h1>
          <p><strong>Name:</strong> ${escapeHtml(safeName)}</p>
          <p><strong>Return email:</strong> ${escapeHtml(safeEmail)}</p>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <hr />
          <p>${safeMessage}</p>
        `,
        text: [
          OWNER_SUBJECT,
          `Name: ${safeName}`,
          `Return email: ${safeEmail}`,
          `Subject: ${subject}`,
          "",
          message,
        ].join("\n"),
        tags: [
          { name: "source", value: "contact-form" },
          { name: "site", value: "canon-and-compass" },
        ],
      },
    })

    if (email) {
      await sendEmail({
        apiKey,
        payload: {
          from: fromEmail,
          to: [email],
          subject: "Canon & Compass received your message",
          html: `
            <p>Thank you for reaching out to Canon &amp; Compass.</p>
            <p>Your note was received. Every message is read with care, though response times vary and not every note will receive a personal reply.</p>
          `,
          text:
            "Thank you for reaching out to Canon & Compass.\n\nYour note was received. Every message is read with care, though response times vary and not every note will receive a personal reply.",
          tags: [
            { name: "source", value: "contact-autoreply" },
            { name: "site", value: "canon-and-compass" },
          ],
        },
      })
    }
  } catch (error) {
    console.error("Contact form delivery failed.", error)
    return htmlResponse("Message delivery failed. Please try again later.", 502)
  }

  return Response.redirect(buildAbsoluteUrl(request, CONTACT_SUCCESS_PATH), 303)
}
