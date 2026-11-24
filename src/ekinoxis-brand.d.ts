// @ekinoxis/brand ships no types yet; its default export is the flat token map (dist/tokens.mjs).
declare module '@ekinoxis/brand' {
  const tokens: Readonly<Record<`color-${string}`, string>> & Readonly<Record<string, unknown>>;
  export default tokens;
}
