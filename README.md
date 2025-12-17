# Feby - Portfolio

Welcome to the source code for my personal portfolio website! This repository contains the source code which is built and deployed to [lainx86.github.io](https://lainx86.github.io).

## 🚀 Tech Stack

- **Static Site Generator:** [Eleventy (11ty)](https://www.11ty.dev/)
- **Templating Engine:** Nunjucks
- **Styling:** Vanilla CSS (with custom utilities and animations)
- **Icons:** Lucide Icons

## 🚀 Deployment

This project uses **GitHub Actions** to automatically build and deploy the website.

- **Workflow:** `.github/workflows/deploy.yml`
- **Trigger:** Push to `main` branch
- **Process:**
    1.  Builds the Eleventy site.
    2.  Clones the target repository `lainx86/lainx86.github.io`.
    3.  Copies the build output (`_site/`) to the target repository.
    4.  Commits and pushes the changes to deploy the site.

**Note:** This repository is purely for development. The live site is served from the `lainx86.github.io` repository.
