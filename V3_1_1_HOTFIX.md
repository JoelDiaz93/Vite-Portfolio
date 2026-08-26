# Portfolio v3.1.1 hotfix

- Fixed React `useEffect` cleanup crash on the Eventra case-study route.
- `window.scrollTo` is now called inside a block effect so its return value is never treated as an effect cleanup callback.
- Hardened the Skills synchronization effect using the same explicit no-return pattern.
- No visual, content, routing, or form-behavior changes.
