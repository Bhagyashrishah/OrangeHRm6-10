export function extractPriceAsNumber(priceString) {
  return parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
}
