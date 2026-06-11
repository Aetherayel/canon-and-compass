#!/usr/bin/env python3

from __future__ import annotations

import textwrap
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

PALETTE = {
    "ink": "#14110f",
    "night": "#050505",
    "paper": "#fcfaf5",
    "bone": "#f1ecdf",
    "ash": "#6f695f",
    "starlight": "#c3ab72",
    "moss": "#60735c",
    "fig": "#6d5964",
    "pine": "#31463e",
    "ember": "#9b6b43",
}

OG_SIZE = (1200, 630)
SQUARE_SIZE = (1024, 1024)


def rgb(hex_color: str) -> tuple[int, int, int]:
    value = hex_color.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))


def rgba(hex_color: str, alpha: int = 255) -> tuple[int, int, int, int]:
    return (*rgb(hex_color), alpha)


def load_font(*candidates: str, size: int) -> ImageFont.FreeTypeFont:
    for candidate in candidates:
        path = Path(candidate)
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    raise FileNotFoundError(f"No font found for: {candidates}")


TITLE_FONT_PATHS = (
    "/mnt/c/Windows/Fonts/georgiab.ttf",
    "/mnt/c/Windows/Fonts/cambriab.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf",
)
SANS_FONT_PATHS = (
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
)
BOLD_SANS_FONT_PATHS = (
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/mnt/c/Windows/Fonts/arialbd.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
)


def wrap_text(text: str, font: ImageFont.FreeTypeFont, width: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        trial = word if not current else f"{current} {word}"
        box = font.getbbox(trial)
        if box[2] - box[0] <= width:
            current = trial
            continue
        if current:
            lines.append(current)
        current = word
    if current:
        lines.append(current)
    return lines


def draw_multiline(
    draw: ImageDraw.ImageDraw,
    text: str,
    font: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int, int],
    origin: tuple[int, int],
    max_width: int,
    line_gap: int,
) -> int:
    x, y = origin
    for line in wrap_text(text, font, max_width):
        draw.text((x, y), line, font=font, fill=fill)
        box = font.getbbox(line)
        y += (box[3] - box[1]) + line_gap
    return y


def blur_circle(
    image: Image.Image,
    center: tuple[int, int],
    radius: int,
    color: tuple[int, int, int, int],
    blur: int,
) -> None:
    overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    x, y = center
    draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=color)
    overlay = overlay.filter(ImageFilter.GaussianBlur(blur))
    image.alpha_composite(overlay)


def add_grain(image: Image.Image, opacity: int = 20) -> None:
    width, height = image.size
    noise = Image.effect_noise((width, height), 10).convert("L")
    noise = ImageChops.multiply(noise, Image.new("L", (width, height), opacity))
    grain = Image.new("RGBA", (width, height), rgba(PALETTE["paper"], 0))
    grain.putalpha(noise)
    image.alpha_composite(grain)


def draw_landscape(image: Image.Image, layers: list[dict]) -> None:
    for layer in layers:
        overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
        draw = ImageDraw.Draw(overlay)
        draw.polygon(layer["points"], fill=layer["fill"])
        if layer.get("blur"):
            overlay = overlay.filter(ImageFilter.GaussianBlur(layer["blur"]))
        image.alpha_composite(overlay)


def tint_non_black(image: Image.Image, color: str) -> Image.Image:
    grayscale = image.convert("L")
    alpha = grayscale.point(lambda value: 255 if value > 8 else 0)
    tinted = Image.new("RGBA", image.size, rgba(color))
    tinted.putalpha(alpha)
    return tinted


def load_emblem(target_width: int, tint: str) -> Image.Image:
    source = Image.open(ROOT / "_canonandcompass.png").convert("RGB")
    cropped = source.crop((205, 75, 825, 585))
    tinted = tint_non_black(cropped, tint)
    bbox = tinted.getbbox()
    trimmed = tinted.crop(bbox)
    ratio = target_width / trimmed.width
    size = (target_width, int(trimmed.height * ratio))
    return trimmed.resize(size, Image.Resampling.LANCZOS)


def create_canvas(size: tuple[int, int], colors: dict[str, str]) -> Image.Image:
    image = Image.new("RGBA", size, rgba(colors["background"]))
    width, height = size

    blur_circle(image, (int(width * 0.18), int(height * 0.12)), int(height * 0.28), rgba(colors["glow_a"], 90), 90)
    blur_circle(image, (int(width * 0.72), int(height * 0.38)), int(height * 0.33), rgba(colors["glow_b"], 110), 120)
    blur_circle(image, (int(width * 0.94), int(height * 0.88)), int(height * 0.26), rgba(colors["glow_c"], 90), 80)
    blur_circle(image, (int(width * 0.50), int(height * 0.80)), int(height * 0.38), rgba(colors["shadow"], 165), 130)

    vignette = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(vignette)
    draw.rectangle((0, 0, width, height), fill=rgba(colors["background"], 54))
    vignette = vignette.filter(ImageFilter.GaussianBlur(24))
    image.alpha_composite(vignette)

    add_grain(image, opacity=16)
    return image


def draw_brand_row(
    image: Image.Image,
    x: int,
    y: int,
    accent: str,
    label: str = "CANON & COMPASS",
) -> None:
    emblem = load_emblem(70, accent)
    image.alpha_composite(emblem, (x, y - 6))
    draw = ImageDraw.Draw(image)
    brand_font = load_font(*BOLD_SANS_FONT_PATHS, size=24)
    label_box = brand_font.getbbox(label)
    label_y = y + (emblem.height - (label_box[3] - label_box[1])) // 2 + 1
    draw.text((x + emblem.width + 22, label_y), label, font=brand_font, fill=rgba(PALETTE["bone"], 235))


def draw_title_block(
    image: Image.Image,
    *,
    title: str,
    description: str,
    accent: str,
    content_width: int,
    origin: tuple[int, int],
    title_size: int,
    body_size: int,
    title_fill: str | None = None,
    body_fill: str | None = None,
    title_gap: int = 18,
) -> None:
    draw = ImageDraw.Draw(image)
    title_font = load_font(*TITLE_FONT_PATHS, size=title_size)
    body_font = load_font(*SANS_FONT_PATHS, size=body_size)
    title_color = rgba(title_fill or PALETTE["paper"])
    body_color = rgba(body_fill or PALETTE["bone"], 232)

    x, y = origin
    title_lines = wrap_text(title, title_font, content_width)
    for line in title_lines:
        draw.text((x, y), line, font=title_font, fill=title_color)
        box = title_font.getbbox(line)
        y += (box[3] - box[1]) + title_gap

    y += 12
    draw.rounded_rectangle((x, y, x + 96, y + 4), radius=3, fill=rgba(accent, 255))
    y += 34
    draw_multiline(
        draw,
        description,
        font=body_font,
        fill=body_color,
        origin=(x, y),
        max_width=content_width,
        line_gap=10,
    )


def draw_default_scene(image: Image.Image, size: tuple[int, int], colors: dict[str, str]) -> None:
    overlay = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    draw.arc((830, 108, 1260, 540), start=212, end=318, fill=rgba(colors["path"], 92), width=6)
    overlay = overlay.filter(ImageFilter.GaussianBlur(0.2))
    image.alpha_composite(overlay)

    blur_circle(image, (936, 228), 48, rgba(colors["glow_a"], 220), 18)
    blur_circle(image, (936, 228), 17, rgba(PALETTE["paper"], 255), 1)

    draw_landscape(
        image,
        [
            {
                "fill": rgba(colors["ridge_mid"], 212),
                "points": [
                    (760, 630),
                    (950, 392),
                    (1044, 494),
                    (1150, 378),
                    (1200, 630),
                ],
            },
            {
                "fill": rgba(colors["ridge_front"], 255),
                "points": [
                    (880, 630),
                    (1030, 494),
                    (1126, 528),
                    (1162, 458),
                    (1200, 630),
                ],
            },
        ],
    )


def draw_clearing_scene(image: Image.Image, size: tuple[int, int], colors: dict[str, str]) -> None:
    blur_circle(image, (962, 270), 102, rgba(PALETTE["paper"], 112), 42)
    blur_circle(image, (962, 270), 38, rgba(colors["glow_a"], 190), 10)

    overlay = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    trunks = [
        (882, 112, 914, 534),
        (1008, 132, 1040, 518),
    ]
    for left, top, right, bottom in trunks:
        draw.rounded_rectangle((left, top, right, bottom), radius=14, fill=rgba(colors["trunk"], 230))
    draw.arc((836, 214, 1116, 530), start=212, end=314, fill=rgba(colors["path"], 132), width=6)
    overlay = overlay.filter(ImageFilter.GaussianBlur(0.6))
    image.alpha_composite(overlay)

    draw_landscape(
        image,
        [
            {
                "fill": rgba(colors["ground_front"], 255),
                "points": [(760, 630), (936, 470), (1096, 520), (1200, 630)],
            },
        ],
    )


def draw_forest_scene(image: Image.Image, size: tuple[int, int], colors: dict[str, str]) -> None:
    draw_landscape(
        image,
        [
            {
                "fill": rgba(colors["ground_front"], 255),
                "points": [(840, 630), (1020, 486), (1146, 538), (1200, 630)],
            },
        ],
    )

    overlay = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    x, top, span = 1006, 90, 170
    draw.polygon(
        [
            (x, top),
            (x - span * 0.46, top + span),
            (x - span * 0.16, top + span),
            (x - span * 0.62, top + span * 1.88),
            (x - span * 0.2, top + span * 1.88),
            (x - span * 0.76, top + span * 2.72),
            (x + span * 0.76, top + span * 2.72),
            (x + span * 0.2, top + span * 1.88),
            (x + span * 0.62, top + span * 1.88),
            (x + span * 0.16, top + span),
            (x + span * 0.46, top + span),
        ],
        fill=rgba(colors["tree"], 236),
    )
    draw.rounded_rectangle((x - 14, top + span * 2.72, x + 14, top + span * 3.7), radius=5, fill=rgba(colors["trunk"], 236))
    draw.arc((860, 126, 1188, 394), start=202, end=332, fill=rgba(colors["ground_back"], 72), width=4)
    overlay = overlay.filter(ImageFilter.GaussianBlur(0.45))
    image.alpha_composite(overlay)

    blur_circle(image, (1060, 192), 38, rgba(colors["glow_a"], 210), 16)
    blur_circle(image, (1060, 192), 14, rgba(PALETTE["paper"], 255), 1)


def draw_fruit_scene(image: Image.Image, size: tuple[int, int], colors: dict[str, str]) -> None:
    overlay = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    draw.arc((850, 148, 1200, 510), start=208, end=320, fill=rgba(colors["path"], 112), width=6)

    branch_color = rgba(colors["branch"], 218)
    draw.line((842, 510, 954, 404), fill=branch_color, width=7, joint="curve")
    draw.line((954, 404, 1040, 344), fill=branch_color, width=7, joint="curve")
    draw.line((954, 404, 1070, 462), fill=branch_color, width=5, joint="curve")

    for center, fill in [
        ((1040, 342), colors["fruit_a"]),
    ]:
        blur_circle(overlay, center, 26, rgba(fill, 220), 8)
        draw.ellipse((center[0] - 13, center[1] - 13, center[0] + 13, center[1] + 13), fill=rgba(fill, 255))

    overlay = overlay.filter(ImageFilter.GaussianBlur(0.35))
    image.alpha_composite(overlay)

    draw_landscape(
        image,
        [
            {
                "fill": rgba(colors["ground_front"], 255),
                "points": [(850, 630), (1010, 496), (1136, 548), (1200, 630)],
            },
        ],
    )


def create_og_card(
    filename: str,
    title: str,
    description: str,
    colors: dict[str, str],
    scene,
) -> None:
    image = create_canvas(OG_SIZE, colors)
    draw_brand_row(image, 78, 52, colors["accent"])
    draw_title_block(
        image,
        title=title,
        description=description,
        accent=colors["accent"],
        content_width=570,
        origin=(78, 154),
        title_size=90,
        body_size=32,
    )
    scene(image, OG_SIZE, colors)
    image.convert("RGB").save(PUBLIC / filename, quality=95)


def create_square_brand(filename: str) -> None:
    colors = {
        "background": PALETTE["night"],
        "glow_a": PALETTE["starlight"],
        "glow_b": PALETTE["pine"],
        "glow_c": PALETTE["ember"],
        "shadow": PALETTE["ink"],
        "accent": PALETTE["starlight"],
    }
    image = create_canvas(SQUARE_SIZE, colors)
    blur_circle(image, (780, 248), 186, rgba(PALETTE["pine"], 92), 72)
    blur_circle(image, (712, 340), 146, rgba(PALETTE["ember"], 88), 58)

    emblem = load_emblem(500, PALETTE["paper"])
    image.alpha_composite(emblem, ((SQUARE_SIZE[0] - emblem.width) // 2, 110))

    draw = ImageDraw.Draw(image)
    overline_font = load_font(*BOLD_SANS_FONT_PATHS, size=26)
    title_font = load_font(*TITLE_FONT_PATHS, size=84)
    body_font = load_font(*SANS_FONT_PATHS, size=34)

    overline = "CANON & COMPASS"
    overline_box = overline_font.getbbox(overline)
    overline_x = (SQUARE_SIZE[0] - (overline_box[2] - overline_box[0])) // 2
    draw.text((overline_x, 598), overline, font=overline_font, fill=rgba(PALETTE["starlight"], 240))

    title = "Name the fruit.\nTrace the roots.\nReturn to Christ."
    title_lines = title.splitlines()
    current_y = 650
    for line in title_lines:
        box = title_font.getbbox(line)
        line_x = (SQUARE_SIZE[0] - (box[2] - box[0])) // 2
        draw.text((line_x, current_y), line, font=title_font, fill=rgba(PALETTE["paper"]))
        current_y += (box[3] - box[1]) + 12

    body = "A quiet place for truthful reorientation, worldview diagnosis, and steady Christward formation."
    body_lines = textwrap.wrap(body, width=40)
    body_y = 896
    for line in body_lines:
        box = body_font.getbbox(line)
        line_x = (SQUARE_SIZE[0] - (box[2] - box[0])) // 2
        draw.text((line_x, body_y), line, font=body_font, fill=rgba(PALETTE["bone"], 225))
        body_y += (box[3] - box[1]) + 8

    image.convert("RGB").save(PUBLIC / filename, quality=95)


def main() -> None:
    create_og_card(
        "canonandcompass-og.png",
        "Canon & Compass",
        "Name the fruit, trace the roots, and return to Christ as the true center of reality.",
        {
            "background": PALETTE["night"],
            "glow_a": PALETTE["starlight"],
            "glow_b": PALETTE["pine"],
            "glow_c": PALETTE["ember"],
            "shadow": PALETTE["ink"],
            "accent": PALETTE["starlight"],
            "path": PALETTE["starlight"],
            "path_secondary": PALETTE["bone"],
            "ridge_far": PALETTE["pine"],
            "ridge_mid": PALETTE["moss"],
            "ridge_front": PALETTE["bone"],
        },
        draw_default_scene,
    )

    create_og_card(
        "the-clearing-og.png",
        "The Clearing",
        "Where the noise softens, appearances loosen, and attention returns to Christ.",
        {
            "background": PALETTE["night"],
            "glow_a": PALETTE["starlight"],
            "glow_b": PALETTE["paper"],
            "glow_c": PALETTE["fig"],
            "shadow": PALETTE["ink"],
            "accent": PALETTE["starlight"],
            "path": PALETTE["paper"],
            "trunk": PALETTE["pine"],
            "ground_back": PALETTE["moss"],
            "ground_front": PALETTE["bone"],
        },
        draw_clearing_scene,
    )

    create_og_card(
        "the-forests-og.png",
        "The Forests",
        "Worldviews are habitats that train what people notice, ignore, fear, and love.",
        {
            "background": PALETTE["night"],
            "glow_a": PALETTE["starlight"],
            "glow_b": PALETTE["moss"],
            "glow_c": PALETTE["pine"],
            "shadow": PALETTE["ink"],
            "accent": PALETTE["moss"],
            "tree": PALETTE["moss"],
            "trunk": PALETTE["ember"],
            "ground_back": PALETTE["pine"],
            "ground_mid": PALETTE["moss"],
            "ground_front": PALETTE["bone"],
        },
        draw_forest_scene,
    )

    create_og_card(
        "fruit-paths-og.png",
        "Fruit Paths",
        "Start with what is showing up, expose the false center beneath it, and return to truth in Christ.",
        {
            "background": PALETTE["night"],
            "glow_a": PALETTE["ember"],
            "glow_b": PALETTE["fig"],
            "glow_c": PALETTE["starlight"],
            "shadow": PALETTE["ink"],
            "accent": PALETTE["ember"],
            "path": PALETTE["starlight"],
            "path_secondary": PALETTE["bone"],
            "branch": PALETTE["bone"],
            "fruit_a": PALETTE["ember"],
            "fruit_b": PALETTE["starlight"],
            "fruit_c": PALETTE["fig"],
            "ground_back": PALETTE["pine"],
            "ground_front": PALETTE["bone"],
        },
        draw_fruit_scene,
    )

    create_square_brand("canonandcompass.jpg")


if __name__ == "__main__":
    main()
