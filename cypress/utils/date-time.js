export function formatDate(customDate) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(customDate).toLocaleDateString("en-US", options);
}
