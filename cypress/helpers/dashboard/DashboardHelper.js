const DashboardHelper = {
  extractPriceAsNumber(priceString) {
    return parseFloat(priceString.replace(/[^0-9.-]+/g, ''));
  },
};

export default DashboardHelper;
