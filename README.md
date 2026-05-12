# Sailwind Eval References

Handcrafted reference pages used as ground truth for evaluating AI-generated Sailwind prototypes in [pglevy/sailwind-eval](https://github.com/pglevy/sailwind-eval).

Each page is a carefully built example of a real-world UI pattern using the [Sailwind component library](https://www.npmjs.com/package/@pglevy/sailwind). Screenshots are captured at a fixed size so evals have a consistent visual baseline to measure against.

## Reference Pages

| Page | Route | Screenshot |
|------|-------|------------|
| My Account | `/#/my-account` | `screenshots/my-account.png` |

## Capturing Screenshots

Screenshots are saved in `/screenshots`. Use [shot-scraper](https://shot-scraper.datasette.io/) with the dev server running:

```bash
uvx shot-scraper http://localhost:5173/#/my-account -o "screenshots/my-account.png" --width 1600 --height 1000 --retina
```

## Dev Setup

```bash
pnpm install
pnpm run dev
```

## Adding a Reference Page

1. Build the page in `src/pages/` using Sailwind components
2. Add the route to `src/App.tsx` and a link in `src/pages/home.tsx`
3. Capture a screenshot with the command above
4. Add a row to the table in this README
