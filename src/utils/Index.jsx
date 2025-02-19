import Icons from "../constants/Icons";
import Images from "../constants/Images";
import { CarRentalIcon } from "../svgs/CarRentalIcon";
import { RealEstateIcon } from "../svgs/RealEstateIcon";
import { ShopsIcon } from "../svgs/ShopsIcon";

export const banks = [
  {
    id: "1",
    name: "Bank of America",
    image: Images.bank1,
  },
  { id: "2", name: "Scotiabank", image: Images.bank1 },
  { id: "3", name: "RBC", image: Images.bank1 },
  {
    id: "4",
    name: "ATB Financials",
    image: Images.bank1,
  },
  { id: "5", name: "CIBC", image: Images.bank1 },
  { id: "6", name: "CIBC", image: Images.bank1 },
  { id: "7", name: "CIBC", image: Images.bank1 },
  { id: "8", name: "CIBC", image: Images.bank1 },
  { id: "9", name: "CIBC", image: Images.bank1 },
  { id: "10", name: "CIBC", image: Images.bank1 },
];

export const idTypes = [
  {
    label: "Driver’s License",
    recommendation: "Recommended",
    value: "DRIVING_LICENSE",
  },
  { label: "Passport", recommendation: "", value: "PASSPORT" },
  { label: "National ID Card", recommendation: "", value: "ID_CARD" },
];

export const investments = [
  {
    title: "Car Rentals",
    amount: "L50.00HNL",
    date: "11 Jun 2024",
    maturity: "11 Aug 2024",
    progress: 75,
    icon: <CarRentalIcon />,
    backgroundColor: "#34D1A5",
  },
  {
    title: "Real Estate",
    amount: "L120.00HNL",
    date: "20 Jun 2024",
    maturity: "15 Sep 2024",
    progress: 40,
    icon: <ShopsIcon />,
    backgroundColor: "#FF9F2F",
  },
  {
    title: "Real Estate",
    amount: "L120.00HNL",
    date: "20 Jun 2024",
    maturity: "15 Sep 2024",
    progress: 40,
    icon: <RealEstateIcon />,
    backgroundColor: "#9C6FF8",
  },
];

export const notificationsData = [
  {
    id: 1,
    title: "Jon Portfolio Created",
    description:
      "You’ve successfully created your first portfolio! Investment will be matured in 2 months time",
    date: "27 Aug",
    icon: Icons.transfer,
  },
  {
    id: 2,
    title: "Jon Portfolio Created",
    description:
      "You’ve successfully created your first portfolio! Investment will be matured in 2 months time",
    date: "27 Aug",
    icon: Icons.deposit,
  },
  {
    id: 3,
    title: "Jon Portfolio Created",
    description:
      "You’ve successfully created your first portfolio! Investment will be matured in 2 months time",
    date: "27 Aug",
    icon: Icons.payAdded,
  },
  {
    id: 4,
    title: "Jon Portfolio Created",
    description:
      "You’ve successfully created your first portfolio! Investment will be matured in 2 months time",
    date: "27 Aug",
    icon: Icons.dollarJar,
  },
];

export const investmentData = [
  {
    id: 1,
    title: "Car Rentals",
    returns: "10-15% returns",
    risk: "Low Risk",
    investedAmount: "L65.46",
    icon: Icons.CarRental,
    tintColor: "#34D1A5",
  },
  {
    id: 2,
    title: "Real Estate",
    returns: "8-12% returns",
    risk: "Moderate Risk",
    investedAmount: "L150.75",
    icon: Icons.realEstate,
    tintColor: "#9C6FF8",
  },
  {
    id: 3,
    title: "Shops",
    returns: "20-30% returns",
    risk: "High Risk",
    investedAmount: "L200.00",
    icon: Icons.shops,
    tintColor: "#FF9F2F",
  },
];

export const funds = [
  {
    id: 1,
    name: "Jonathon",
    desc: "BoA Ends with 4372",
    icon: Icons.payAdded,
  },
  {
    id: 2,
    name: "John Credit",
    desc: "Debit Ends with 6289",
    icon: Icons.CreditCard,
  },
  {
    id: 3,
    name: "Jon Personal",
    desc: "Credit Ends with 7150",
    icon: Icons.CreditCard,
  },
  {
    id: 4,
    name: "EDUFE Wallet",
    desc: "Currently has L200 HNL",
    icon: Icons.tab2,
  },
  {
    id: 5,
    name: "EDUFE Wallet",
    desc: "Currently has L200 HNL",
    icon: Icons.tab2,
  },
];

// Sample transaction data

export const investmentDropdowns = [
  {
    name: "All Investments",
    icon: Icons.money,
    iconStyles: { backgroundColor: "#31C440" },
  },
  {
    name: "Car Rental",
    icon: Icons.CarRental,
    iconStyles: { backgroundColor: "#34D1A5" },
  },
  {
    name: "Real Estate",
    icon: Icons.realEstate,
    iconStyles: { backgroundColor: "#FF9F2F" },
  },
  {
    name: "Shops",
    icon: Icons.shops,
    iconStyles: { backgroundColor: "#9C6FF8" },
  },
];

export const portfolioDetails = [
  { label: "Current Portfolio Value", value: "L1000.00HNL" },
  { label: "Tenure Date", value: "12 Sep 2019 - 12 Oct 2024" },
  { label: "Total Tenure", value: "5 Years" },
  { label: "Portfolio Completed", value: "10%" },
  { label: "Total Average Return", value: "15.00%" },
  { label: "Initial Investment", value: "L1000.00HNL" },
  { label: "Current Portfolio Value", value: "L1150.00HNL" },
];

export const assetAllocationData = [
  {
    title: "Car Rentals",
    amount: "L363.60HNL",
    percentage: "36.36%",
    icon: Icons.CarRental,
    iconStyles: { backgroundColor: "#31C440" },
  },
  {
    title: "Real Estate",
    amount: "L363.60HNL",
    percentage: "36.36%",
    icon: Icons.realEstate, // Replace with appropriate icon
    iconStyles: { backgroundColor: "#9C6FF8" },
  },
  {
    title: "Shops",
    amount: "L363.60HNL",
    percentage: "36.36%",
    icon: Icons.shops, // Replace with appropriate icon
    iconStyles: { backgroundColor: "#FF9F2F" },
  },
];
export const futureProjectionData = [
  {
    title: "Car Rentals",
    amount: "L363.60HNL",
    percentage: "36.36%",
    icon: Icons.CarRental,
    iconStyles: { backgroundColor: "#31C440" },
  },
  {
    title: "Real Estate",
    amount: "L363.60HNL",
    percentage: "36.36%",
    icon: Icons.realEstate, // Replace with appropriate icon
    iconStyles: { backgroundColor: "#FF9F2F" },
  },
  {
    title: "Shops",
    amount: "L363.60HNL",
    percentage: "36.36%",
    icon: Icons.shops, // Replace with appropriate icon
    iconStyles: { backgroundColor: "#9C6FF8" },
  },
  {
    title: "Total Projected Value",
    amount: "L363.60HNL",
    percentage: "36.36%",
    icon: Icons.shops, // Replace with appropriate icon
    iconStyles: { backgroundColor: "#9C6FF8" },
  },
];
export const performanceSummaryData = [
  {
    title: "Overall Performance",
    description: "Portfolio has grown by ",
    percentage: "15.00%",
  },
  {
    title: "Top Performing Investment",
    description: "Shops, with an ",
    percentage: "18%",
  },
  {
    title: "Lowest Performing Investment",
    description: "Real Estate, with a ",
    percentage: "12%",
  },
];
export const riskLevelData = [
  {
    title: "Car Rentals",
    risk: "Low Risk",
    icon: Icons.CarRental,
    iconStyles: { backgroundColor: "#31C440" },
  },
  {
    title: "Real Estate",
    risk: "Medium Risk",
    icon: Icons.realEstate, // Replace with appropriate icon
    iconStyles: { backgroundColor: "#FF9F2F" },
  },
  {
    title: "Shops",
    risk: "High Risk",
    icon: Icons.shops, // Replace with appropriate icon
    iconStyles: { backgroundColor: "#9C6FF8" },
  },
];

export const sellingPortfolioDetails = [
  { label: "Current Portfolio Value", value: "L1000.00HNL" },
  { label: "Total Tenure", value: "5 Years" },
  { label: "Average Return", value: "15.00%" },
  { label: "Initial Investment", value: "L1000.00HNL" },
  { label: "Total Returns", value: "L1150.00HNL" },
  { label: "Price to Sell ", value: "L900.00HNL" },
];

export const payouts = [
  {
    title: "Car Rentals",
    amount: "L50.00HNL",
    availability: "Funds Available",
    progress: 75, // Example percentage for loading bar
    backgroundColor: "#34D1A5",
    icon: Icons.CarRental,
  },
  {
    title: "Real Estate",
    amount: "L120.00HNL",
    availability: "15 Sep 2024",
    progress: 40,
    backgroundColor: "#9C6FF8",
    icon: Icons.realEstate,
  },
];
export const withdraws = [
  {
    title: "Car Rentals",
    amount: "L50.00HNL",
    date: "11 Jun 2024",
    icon: Icons.refresh,
  },
  {
    title: "Real Estate",
    amount: "L120.00HNL",
    date: "20 Jun 2024",
    icon: Icons.Check,
  },
];
export const dividendDetails = [
  { label: "Initial Investment", value: "L1000.00HNL" },
  { label: "You’ve Received", value: "L50.00HNL" },
  { label: "Received on", value: "Wednesday, 12 July 2024" },
];

export const transactions = [
  {
    id: 1,
    name: "Jon Personal",
    amount: "L50.00 HNL",
    type: "Sent",
    method: "Bank transfer",
    date: "17 Jun",
    icon: Icons.transfer,
    status: "Completed",
    details: {
      status: "Completed",
      referenceId: "437892528",
      from: "John Doe",
      bankFee: "$1.50",
      time: "14:30",
      to: "Jane Smith",
      email: "janesmith@example.com",
      accountSent: "1234-5678-9012-3456",
    },
  },
  {
    id: 2,
    name: "Wallet Funded",
    amount: "L100.00 HNL",
    type: "Added",
    method: "Bank transfer",
    date: "15 Jun",
    icon: Icons.deposit,
    status: "Pending",
    details: {
      status: "Pending",
      referenceId: "437892528",
      from: "Alice Brown",
      bankFee: "$2.00",
      time: "11:15",
      to: "Bob White",
      email: "bobwhite@example.com",
      accountSent: "9876-5432-1098-7654",
    },
  },
  {
    id: 3,
    name: "Jon Personal",
    amount: "L200.00 HNL",
    type: "Sent",
    method: "Debit Card",
    date: "12 Jun",
    icon: Icons.transfer,
    status: "Completed",
    details: {
      status: "Completed",
      referenceId: "437892528",
      from: "John Doe",
      bankFee: "$1.50",
      time: "14:30",
      to: "Jane Smith",
      email: "janesmith@example.com",
      accountSent: "1234-5678-9012-3456",
    },
  },
  {
    id: 4,
    name: "Jon Personal",
    amount: "L200.00 HNL",
    type: "Sent",
    method: "Debit Card",
    date: "12 Jun",
    icon: Icons.transfer,
    status: "Pending",
    details: {
      status: "Pending",
      referenceId: "437892528",
      from: "Alice Brown",
      bankFee: "$2.00",
      time: "11:15",
      to: "Bob White",
      email: "bobwhite@example.com",
      accountSent: "9876-5432-1098-7654",
    },
  },
  {
    id: 5,
    name: "Jon Personal",
    amount: "L200.00 HNL",
    type: "Sent",
    method: "Debit Card",
    date: "12 Jun",
    icon: Icons.transfer,
    status: "Completed",

    details: {
      status: "Completed",
      referenceId: "437892528",
      from: "John Doe",
      bankFee: "$1.50",
      time: "14:30",
      to: "Jane Smith",
      email: "janesmith@example.com",
      accountSent: "1234-5678-9012-3456",
    },
  },
];

export const marketplacePortfolios = [
  {
    id: 1,
    title: "Jon Portfolio",
    amount: "L50.00HNL",
    date: "11 Jun 2024",
    duration: "5 years",
    bonus: "10% Bonus",
    time: "1 day ago",
    progress: 75, // Example percentage for loading bar
    icons: [
      {
        icon: Icons.CarRental,
        backgroundColor: "#34D1A5",
      },
      {
        icon: Icons.realEstate,
        backgroundColor: "#9C6FF8",
      },
      {
        icon: Icons.shops,
        backgroundColor: "#FF9F2F",
      },
    ],
    avgReturn: "15%",
  },
  {
    id: 1,
    title: "Alex Car Rentals",
    amount: "L50.00HNL",
    date: "11 Jun 2024",
    duration: "5 years",
    bonus: "10% Bonus",
    time: "1 day ago",
    progress: 75, // Example percentage for loading bar
    icons: [
      {
        icon: Icons.CarRental,
        backgroundColor: "#34D1A5",
      },
    ],
    avgReturn: "15%",
  },
  {
    id: 3,
    title: "Bill Williams",
    amount: "L50.00HNL",
    date: "11 Jun 2024",
    duration: "5 years",
    bonus: "10% Bonus",
    time: "1 day ago",
    progress: 75, // Example percentage for loading bar
    icons: [
      {
        icon: Icons.CarRental,
        backgroundColor: "#34D1A5",
      },
      {
        icon: Icons.realEstate,
        backgroundColor: "#9C6FF8",
      },
    ],
    avgReturn: "15%",
  },
];

export const payoutDetail = [
  {
    title: "Car Rentals",
    amount: "L50.00HNL",
    maturity: "11 Aug 2024",
    progress: 75,
    icon: <CarRentalIcon />,
    backgroundColor: "#34D1A5",
  },
  {
    title: "Real Estate",
    amount: "L120.00HNL",
    maturity: "15 Sep 2024",
    progress: 40,
    icon: <ShopsIcon />,
    backgroundColor: "#FF9F2F",
  },
  {
    title: "Real Estate",
    amount: "L120.00HNL",
    maturity: "15 Sep 2024",
    progress: 40,
    icon: <RealEstateIcon />,
    backgroundColor: "#9C6FF8",
  },
];
export const withdrawnAmounts = [
  {
    title: "Car Rentals",
    amount: "L50.00HNL",
    date: "11 Aug 2024",
  },
  {
    title: "Real Estate",
    amount: "L120.00HNL",
    date: "15 Sep 2024",
  },
  {
    title: "Real Estate",
    amount: "L120.00HNL",
    date: "15 Sep 2024",
  },
];
