# Arcanum PWA — TE-IT MAD & PWA Lab
## Experiments 8, 9 & 11

---

## 📁 Final Project Structure

```
arcanum/
├── package.json
├── public/
│   ├── index.html          ← PWA meta tags, manifest link
│   ├── manifest.json       ← PWA installability config  (Exp 9)
│   ├── service-worker.js   ← SW: install/activate/fetch (Exp 9)
│   └── icons/
│       ├── icon-192.png
│       └── icon-512.png
└── src/
    ├── index.js            ← Entry point + SW registration
    ├── App.js              ← Root component, state management
    ├── index.css           ← Global CSS variables + reset
    ├── data/
    │   └── products.js     ← Product data + helpers
    ├── components/
    │   ├── Navbar.js / .css
    │   ├── MobileMenu.js / .css
    │   ├── ProductCard.js / .css
    │   ├── CartDrawer.js / .css
    │   ├── Toast.js / .css
    │   └── Footer.js / .css
    └── pages/
        └── Home.js / .css  ← Hero, Featured, Catalogue
```

---

## ⚙️ Setup — Do This First (One Time)

```bash
# 1. Create a new React app
npx create-react-app arcanum
cd arcanum

# 2. Delete the default src/ and public/ contents
rm -rf src/* public/*

# 3. Copy ALL the provided files into their folders
#    (replace src/ and public/ with the given files)

# 4. Install dependencies
npm install
```

---

## 🧪 Experiment 8 — Responsive UI

**Aim:** Create a responsive UI using React for an E-commerce application.

### Steps:
```bash
# Start the development server
npm start
# Opens http://localhost:3000
```

### What to show:
- The Arcanum rare books store with Hero, Featured, and Catalogue sections
- Filter buttons (All / Science / Occult / Maps / Arts)
- Cart drawer opens when clicking "Collection"
- Responsive layout — resize browser to see mobile view
- Custom gold cursor on desktop

### Media Query proof (in index.css):
```css
@media (max-width: 900px) { /* tablet: hide nav links, show hamburger */ }
@media (max-width: 600px) { /* mobile: single column, stacked buttons  */ }
@media (max-width: 380px) { /* small: single column product grid        */ }
```

---

## 🧪 Experiment 9 — Service Worker Registration

**Aim:** Register a service worker and complete install/activate lifecycle.

### Steps:
```bash
# Build for production (SW only works on HTTPS or localhost build)
npm run build

# Serve the production build locally
npx serve -s build
# Opens http://localhost:3000
```

### Verify the Service Worker:
1. Open Chrome → **F12** → **Application** tab
2. Click **Service Workers** in the left panel
3. You should see `service-worker.js` with status **activated and running** ✅
4. Check **Cache Storage** → `arcanum-cache-v1` → you'll see cached files ✅
5. Tick **Offline** checkbox → reload page → app still loads! ✅

### Service Worker Lifecycle (as coded in service-worker.js):
| Event    | What happens                                          |
|----------|-------------------------------------------------------|
| install  | Opens cache, stores `/` and `/index.html`             |
| activate | Deletes old caches, claims all clients                |
| fetch    | Returns cached response; if miss → fetches & caches  |

### SW Registration (src/index.js):
```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg  => console.log('SW registered:', reg.scope))
      .catch(err => console.log('SW failed:', err));
  });
}
```

---

## 🧪 Experiment 11 — Lighthouse PWA Testing

**Aim:** Use Google Lighthouse to test and analyse the PWA.

### Steps:
```bash
# Make sure you're serving the production build
npm run build
npx serve -s build
# Must be running at http://localhost:3000
```

### Run Lighthouse:
**Option A — Chrome DevTools (recommended):**
1. Open `http://localhost:3000` in Chrome
2. Press **F12** → click **Lighthouse** tab
3. Select categories: ✅ Performance ✅ Accessibility ✅ PWA
4. Click **Analyze page load**
5. Wait ~30 seconds for report

**Option B — Command Line:**
```bash
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

### Expected PWA Checklist Results:
| Check                        | Expected |
|------------------------------|----------|
| Registers a service worker   | ✅ Pass  |
| Responds with 200 when offline | ✅ Pass |
| Has a `<meta name=viewport>` | ✅ Pass  |
| Has a web app manifest       | ✅ Pass  |
| Manifest has icons           | ✅ Pass  |
| theme-color meta tag         | ✅ Pass  |

### Screenshots to take for your report:
1. Lighthouse score panel (Performance, Accessibility, PWA scores)
2. PWA section showing passing audits
3. Application → Service Workers → "activated and running"
4. Application → Cache Storage → cached files list

---

## 🔑 Key Theory Points

### PWA Principles (8 key ones):
1. **Discoverable** — found via search engines
2. **Installable** — can be added to home screen (manifest.json)
3. **Linkable** — shareable via URL
4. **Network independent** — works offline (service worker)
5. **Progressively enhanced** — works for all browsers
6. **Re-engageable** — push notifications possible
7. **Responsively designed** — all screen sizes (media queries)
8. **Secure** — HTTPS only

### 3 Responsive Design Approaches (React):
1. **Media Queries** — CSS `@media` rules (used in index.css)
2. **Inline Styles** — JS object styles with `window.innerWidth`
3. **Higher Order Components** — wrap components with screen-size logic
