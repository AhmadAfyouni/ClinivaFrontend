import AddMedicalComplexType from "../types/medicalComplex/MedicalComplexAdd";

export const ClinicCollection: AddMedicalComplexType = {
  name: "Saudi Clinics Group",
  overview: "A leading healthcare provider in Saudi Arabia.",
  policies:
    "The clinic follows strict hygiene standards and ensures the safety of patients.",
  isActive: true,
  yearOfEstablishment: "2010-05-20",
  address: "456 Health Street, Jeddah, Saudi Arabia",
  logo: "https://clinic.com/logo.png",
  vision: "Providing the best medical care in the region.",
  goals: "We have over 50 branches across the country.",
  contactInfos: [
    {
      type: "phone",
      value: "+966501234567",
      isPublic: true,
      subType: "work",
    },
  ],
  holidays: [
    {
      name: "Eid Al-Fitr",
      date: "2023-04-21T00:00:00Z",
      reason: "Islamic religious holiday marking the end of Ramadan",
    },
  ],
  workingDays: [
    {
      day: "Monday",
      startTime: "08:00 AM",
      endTime: "05:00 PM",
    },
  ],
  bankAccount: [
    {
      accountName: "Al-Noor Medical Center",
      swiftCode: "ALBISARI",
      bankName: "Al Rajhi Bank",
      bankAddress: "King Abdullah Road, Riyadh",
      accountNumber: "SA0380000000608010167519",
      accountType: "business",
      isActive: true,
    },
  ],
  insuranceCompany: [
    {
      companyName: "National Health Insurance",
      coveredServices: ["Dental", "Surgery", "Lab Tests"],
      termsAndConditions: "Coverage limited to network providers only",
      coverageDetails: [
        "Annual limit: $10,000",
        "Pre-existing conditions excluded",
      ],
      coveragePercentage: 80,
      contractStartDate: "2023-01-01T00:00:00Z",
      contractEndDate: "2023-12-31T23:59:59Z",
      contactPerson: "Mr. Ahmed Al-Ghamdi",
      companyPhone: "+966112345678",
      companyEmail: "info@nationalhealth.com",
      address: "123 King Fahd Road, Riyadh",
      isActive: true,
    },
  ],
  commercialRecord: {
    recordNumber: "CR-12345678",
    grantDate: "2020-01-15T00:00:00Z",
    issueDate: "2020-01-20T00:00:00Z",
    expirationDate: "2030-01-20T00:00:00Z",
    taxNumber: "310123456700003",
  },
  cashBoxes: [
    {
      name: "Main Cash Box",
      isActive: true,
      location: "Reception Area",
      currency: "SAR",
      pic: "Mohammed Ali",
      totalBalance: 15000.5,
      createdBy: "admin@clinic.com",
      transactionHistory: [],
    },
  ],
  onlinePaymentMethods: [
    {
      companyName: "Stripe Payments",
      transactionType: "deposit",
      type: "credit_card",
      supportedCurrencies: ["SAR", "USD", "EUR"],
      processingFees: 2.5,
      securityFeatures: ["3D Secure", "Tokenization", "Fraud Detection"],
      isActive: true,
    },
  ],
  locationGoogl: {
    x: 24.7136,
    y: 46.6753,
  },
  companyId: "60f7c7b84f1a2c001c8b4567",
  specializations: ["60f7c7b84f1a2c001c8b4567", "60f7c7b84f1a2c001c8b4568"],
  phone: "",
  PIC: "",
};
