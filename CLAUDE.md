# CLAUDE.md

React (Create React App) e-commerce front-end, "Exclusive" template. No backend; product data lives in `src/components/data/`.

## Commands
- `npm start` – dev server
- `npm run build` – production build (must pass before pushing)
- `npm test -- --watchAll=false` – tests

## Structure
- `src/App.js` – router + Home composition
- `src/context/AppContext.jsx` – global state (cart, likes) via `useApp()`; avoid prop drilling
- `src/components/<Name>/` – component `.jsx` + its own CSS Module (`*.module.css`)
- `src/components/data/` – static product/category data

## Git workflow (mandatory)
1. **One feature / fix = one branch**, created from `main` (or from the branch it depends on, stated in the PR).
2. Branch names: `<type>/<short-kebab-description>`
   - types: `feature/`, `fix/`, `refactor/`, `chore/`, `docs/`, `test/`
   - e.g. `fix/checkout-cart-integration`, `feature/cart-remove-item`
3. **Small, focused commits**, each one leaves the app building. Use Conventional Commits:
   `<type>(<scope>): <imperative summary>` (≤ 72 chars), e.g.
   `fix(checkout): read cart from AppContext instead of props`
   Add a body explaining *why* when it is not obvious.
4. Never mix unrelated changes in one branch/commit.
5. All commits are authored by the repo owner (Ayaalmadhon2004 / aya.alaasel123@gmail.com). Do not change `git config user.*`.
6. Push each branch with `git push -u origin <branch>`. Never push directly to `main`; open a PR per branch only when asked.
7. Run `npm run build` (and tests if touched) before every push.

## Code conventions
- Functional components, hooks, CSS Modules, `className` (never `class`).
- Shared state goes through `useApp()`; use functional `setState(prev => …)` updates.
- Product image field is `img` in data files; handle legacy `image` defensively.
- Icons: Font Awesome via CDN in `public/index.html`; keep `className` on `<i>` tags.
