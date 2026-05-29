# CHE Edinburgh — Website

Official website for CHE Takeaway, 21 Forrest Road, Edinburgh EH1 2QH.

## Files

```
che-website/
├── index.html      — Main HTML page
├── style.css       — All styles
├── menu-data.js    — Menu items (confirmed from Uber Eats)
├── main.js         — Nav, tabs, animations, image handling
└── README.md       — This file
```

## Deploy to Cloudflare Pages (via GitHub)

### Step 1 — Push to GitHub

1. Create a new repository on [github.com](https://github.com) (e.g. `che-website`)
2. Open Terminal / Command Prompt in this folder and run:

```bash
git init
git add .
git commit -m "Initial commit — CHE Edinburgh website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/che-website.git
git push -u origin main
```

### Step 2 — Connect to Cloudflare Pages

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. Select your GitHub repository (`che-website`)
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave blank)*
   - **Build output directory:** `/` (or leave blank)
5. Click **Save and Deploy**

Cloudflare Pages will deploy the site automatically on every push to `main`.

### Step 3 — Custom Domain (optional)

In Cloudflare Pages → your project → **Custom domains** → add your domain.

---

## Menu Updates

To update menu prices or items, edit **menu-data.js** — no rebuild needed.
Just commit and push; Cloudflare Pages redeploys automatically.

---

Built by Halvern Studios.
