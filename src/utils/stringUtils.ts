export const convertToTitleCase = (str: string) => {
  if (!str) {
      return ""
  }
  return str.toLowerCase().replace(/\b\w/g, (s: string) => s.toUpperCase());
}