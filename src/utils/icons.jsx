const getCategoryIcon = (category) => {
  switch (category) {
    case "Car Rentals":
      return require("../assets/icons/CarRental.png");
    case "Shops":
      return require("../assets/icons/shops.png");
    case "Real Estate":
      return require("../assets/icons/realEstate.png");
    default:
      return require("../assets/icons/extra.png");
  }
};

export default getCategoryIcon;

export const backgroundColor = ["#31C440", "#FF9F2F", "#9C6FF8"];
