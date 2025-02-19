function formatCurrency(amount) {
  return Number(amount).toLocaleString("en-HN", {
    style: "currency",
    currency: "HNL",
  });
}

export default formatCurrency;
