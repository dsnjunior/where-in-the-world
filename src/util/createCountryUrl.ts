export function createCountryUrl(path: string) {
  const url = new URL(`/country/${path.toLowerCase()}`, import.meta.url)
  return url.pathname
}
