# Contributing

Thanks for taking a look at Exclusive. The short version:

1. Fork or clone the repo, then `npm install`.
2. Create one branch per change, from `main`: `<type>/<short-kebab-description>`
   where type is `feature`, `fix`, `refactor`, `chore`, `docs` or `test`
   (for example `fix/checkout-cart-integration`).
3. Make small commits that each leave the app building, using
   [Conventional Commits](https://www.conventionalcommits.org):
   `fix(checkout): read cart from AppContext instead of props`.
4. Before pushing, run:
   ```bash
   npm test -- --watchAll=false
   npm run build
   ```
5. Open a pull request into `main`. CI runs the same two commands.

## Code conventions

- Functional components and hooks, styled with CSS Modules (`*.module.css`).
- Shared state (cart, likes, coupon) goes through `useApp()` from
  `src/context/AppContext.jsx`. Use functional updates: `setState(prev => ...)`.
- Every visible string goes through the translation helper in `src/i18n/`, so
  English and Arabic stay in sync.
- Product image field is `img` in the data files.

The full rules live in [`CLAUDE.md`](CLAUDE.md).
