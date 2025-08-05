import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "Astro Sphere",
  DESCRIPTION: "Welcome to Astro Sphere, a portfolio and tree for designers and developers.",
  AUTHOR: "Mark Horn",
}

// Symptoms Page
export const SYMPTOMS: Page = {
  TITLE: "Symptoms",
  DESCRIPTION: "Places I have symptoms.",
}

// Tree Page
export const TREE: Page = {
  TITLE: "Tree",
  DESCRIPTION: "Writing on topics I am passionate about.",
}

// Foundations Page
export const FOUNDATIONS: Page = {
  TITLE: "Foundations",
  DESCRIPTION: "Recent foundations I have symptoms on.",
}

// Search Page
export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "Search all tree and foundations by keyword.",
}

// Links
export const LINKS: Links = [
  { 
    TEXT: "Home", 
    HREF: "/", 
  },
  {
    TEXT: "Symptoms",
    HREF: "/symptoms",
  },
  {
    TEXT: "Tree",
    HREF: "/tree",
  },
  {
    TEXT: "Foundations",
    HREF: "/foundations",
  },
]

// Socials
export const SOCIALS: Socials = [
  { 
    NAME: "Email",
    ICON: "email", 
    TEXT: "markhorn.dev@gmail.com",
    HREF: "mailto:markhorn.dev@gmail.com",
  },
  { 
    NAME: "Github",
    ICON: "github",
    TEXT: "markhorn-dev",
    HREF: "https://github.com/markhorn-dev/astro-sphere"
  },
  { 
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "markhorn-dev",
    HREF: "https://www.linkedin.com/in/markhorn-dev/",
  },
  { 
    NAME: "Twitter",
    ICON: "twitter-x",
    TEXT: "markhorn_dev",
    HREF: "https://twitter.com/markhorn_dev",
  },
]

