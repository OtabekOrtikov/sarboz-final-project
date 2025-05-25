README.md

```markdown
# 🛒 TypeScript Shopping Cart

A tiny e-commerce demo written in **TypeScript** with **Vite**, **Bootstrap 5** UI, ≥ 80 % Jest coverage and ESLint 9 “flat-config”.  
Add products, update quantities, place an order — everything is local-storage-powered (no backend).

---

## ✨ Features

| Module | What it does |
| ------ | ------------ |
| **Products list** | Responsive card grid, “Add to Basket” button & quick feedback |
| **Basket** | List of chosen items, live quantity change, remove button |
| **Order form** | Name / address / email validation (HTML5) + optional comment |
| **State** | `Cart` class stores quantities in `localStorage` |
| **Tests** | Unit-tests for models + DOM tests for renderers (Jest + jsdom) – coverage ≥ 80 % |
| **Lint** | ESLint 9 flat-config with `@typescript-eslint` rules |
| **Build** | Vite for lightning-fast dev & production bundles |

---

## 📂 Project structure

```

final-project/
├─ index.html            # products page
├─ basket.html           # cart + order form
├─ vite.config.ts
├─ eslint.config.js
├─ jest.config.js
├─ src/
│  ├─ app.ts             # main app logic
│  ├─ types.ts
│  └─ models/
│     ├─ Product.ts
│     ├─ Cart.ts
│     └─ OrderService.ts
└─ **tests**/            # Jest unit tests

````

---

## 🚀 Quick start

```bash
git clone <repo>
cd sarboz-final-project

# 1. install deps
npm install

# 2. run dev server (http://localhost:5173)
npm run dev

# 3. open in the browser —
#    /            → products
#    /basket.html → cart & order form
````

### Production build

```bash
npm run build      # bundles to dist/
npm run preview    # serve dist/ locally
```

### Test & coverage

```bash
npm run test           # Jest + ts-jest, generates coverage/
```

### Lint

```bash
npm run lint       # ESLint 9 flat config (src + tests)
```

---

## 🛠  Main tech stack

* **TypeScript 5** – strict mode, classes & interfaces
* **Vite** – super-fast dev server + Rollup build
* **Bootstrap 5** – responsive layout & components
* **Jest 30 + ts-jest** – unit tests with jsdom environment
* **ESLint 9 (flat)** – modern linting setup
* **localStorage** – simple persistence layer

---

## 📈 Coverage badge (local)

After `npm test`, open **coverage/lcov-report/index.html** to see detailed coverage.
Current master branch: **> 80 % statements / lines / functions / branches**.

---

## 🤝 Contributing

1. Fork & create feature branch
2. Run `npm run lint` and `npm test` (tests must stay green, coverage ≥ 80 %)
3. Submit a pull-request – we’ll review ASAP!

---
