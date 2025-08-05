---
title: "Astro Sphere: Adding a new post or foundation."
summary: "Adding a new article (tree post or foundation) is pretty easy."
date: "Mar 14 2024"
draft: false
tags:
- Tutorial
- Astro
- Astro Sphere
---
### Basics

Create a folder in the respective collection you wish to create content. The name of the folder will be the slug in which your content will be found.

```text
creating the following

/content/tree/my-new-post/index.md

will be published to

https://yourdomain.com/tree/my-new-post

```

### Frontmatter

Front matter is in yaml if you are familiar with the format. All posts and foundations require frontmatter at the top of the document to be imported. All frontmatter must be inside triple dashes, similar to Astro format. See example below.

### Tree Collection

| Field   | Type    | Req? | Description                                                   |
| :------ | :------ | :--- | :------------------------------------------------------------ |
| title   | string  | yes  | Title of the post. Used in SEO.                               |
| summary | string  | yes  | Short description of the post. Used in SEO.                   |
| date    | string  | yes  | Any string date that javascript can convert. Used in sorting  |
| tags    | array   | yes  | Post topic. Array of strings. Used in filtering.              |
| draft   | boolean | no   | Hides the post from collections. Unpublished entry.           |

Example tree post frontmatter

```yaml
---
title: "Astro Sphere: Adding a new post or foundation."
summary: "Adding a new article (tree post or foundation) is pretty easy."
date: "Mar 18 2024"
draft: false
tags:
- Tutorial
- Astro
- Astro Sphere
---
```

### Foundations Collection (extends Tree Collection)

| Field   | Type    | Req? | Description                                                   |
| :------ | :------ | :--- | :------------------------------------------------------------ |
| title   | string  | yes  | Title of the post. Used in SEO.                               |
| summary | string  | yes  | Short description of the post. Used in SEO.                   |
| date    | string  | yes  | Any string date that javascript can convert. Used in sorting  |
| tags    | array   | yes  | Post topic. Array of strings. Used in filtering.              |
| draft   | boolean | no   | Hides the post from collections. Unpublished entry.           |
| demoUrl | string  | no   | A link to the deployed foundation, if applicable.              |
| repoUrl | string  | no   | A link to the repository, if applicable.                      |

Example foundation frontmatter

```yaml
---
title: "Astro Sphere"
summary: "Astro Sphere, a portfolio and tree for designers and developers."
date: "Mar 18 2024"
draft: false
tags:
- Astro
- Typescript
- Javascript
- Tailwind
- SolidJS
demoUrl: https://astro-sphere.vercel.app
repoUrl: https://github.com/markhorn-dev/astro-sphere
---
```

### Write your content
You've made it this far, all that is left to do is write your content beneath the frontmatter. Writing markdown will be covered in the next article.