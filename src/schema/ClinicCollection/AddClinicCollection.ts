import * as Yup from "yup";

const AddClinicCollectionSchema = Yup.object().shape({
  name: Yup.string().required("Clinic name is required"),
  overview: Yup.string().required("Overview is required"),
  policies: Yup.string().required("Policies are required"),
  isActive: Yup.boolean().required("Active status is required"),
  yearOfEstablishment: Yup.date().required("Year of establishment is required"),
  address: Yup.string().required("Address is required"),
  logo: Yup.string().url("Must be a valid URL"),
  vision: Yup.string().required("Vision is required"),
  goals: Yup.string().required("Goals are required"),
  contactInfos: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.string()
          .oneOf(["email", "phone"])
          .required("Type is required"),
        isPublic: Yup.boolean().required("Public status is required"),
        value: Yup.string().required("Value is required"),
        subType: Yup.string().optional(),
      })
    )
    .required("Contact information is required"),
  holidays: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Holiday name is required"),
        date: Yup.string().required("Holiday date is required"),
        reason: Yup.string().required("Reason is required"),
      })
    )
    .optional(),
  workingDays: Yup.array()
    .of(
      Yup.object().shape({
        day: Yup.string().required("Day is required"),
        startTime: Yup.string().required("Start time is required"),
        endTime: Yup.string().required("End time is required"),
      })
    )
    .optional(),
  bankAccount: Yup.array()
    .of(
      Yup.object().shape({
        // Define the structure of BankAccountType here
        accountNumber: Yup.string().required("Account number is required"),
        bankName: Yup.string().required("Bank name is required"),
        accountHolder: Yup.string().required("Account holder name is required"),
      })
    )
    .optional(),
  insuranceCompany: Yup.array()
    .of(
      Yup.object().shape({
        companyName: Yup.string().required("Company name is required"),
        coveredServices: Yup.array()
          .of(Yup.string())
          .required("Covered services are required"),
        termsAndConditions: Yup.string().required(
          "Terms and conditions are required"
        ),
        coverageDetails: Yup.array()
          .of(Yup.string())
          .required("Coverage details are required"),
        coveragePercentage: Yup.number()
          .required("Coverage percentage is required")
          .min(0)
          .max(100),
        contractStartDate: Yup.string().required(
          "Contract start date is required"
        ),
        contractEndDate: Yup.string().required("Contract end date is required"),
        contactPerson: Yup.string().required("Contact person is required"),
        companyPhone: Yup.string().required("Company phone is required"),
        companyEmail: Yup.string()
          .email("Must be a valid email")
          .required("Company email is required"),
        address: Yup.string().required("Address is required"),
        isActive: Yup.boolean().required("Active status is required"),
      })
    )
    .optional(),
  commercialRecord: Yup.object().shape({
    recordNumber: Yup.string().required("Record number is required"),
    grantDate: Yup.string().required("Grant date is required"),
    issueDate: Yup.string().required("Issue date is required"),
    expirationDate: Yup.string().required("Expiration date is required"),
    taxNumber: Yup.string().required("Tax number is required"),
  }),
  cashBoxes: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Cash box name is required"),
        isActive: Yup.boolean().required("Active status is required"),
        location: Yup.string().required("Location is required"),
        currency: Yup.string().required("Currency is required"),
        pic: Yup.string().optional(),
        totalBalance: Yup.number().required("Total balance is required"),
        createdBy: Yup.string().required("Created by is required"),
        transactionHistory: Yup.array().optional(),
      })
    )
    .nullable(),
  onlinePaymentMethods: Yup.array()
    .of(
      Yup.object().shape({
        companyName: Yup.string().required("Company name is required"),
        type: Yup.string()
          .oneOf(["credit_card", "bank_transfer", "digital_wallet"])
          .required("Type is required"),
        transactionType: Yup.string()
          .oneOf(["deposit", "withdrawal", "transfer"])
          .required("Transaction type is required"),
        supportedCurrencies: Yup.array()
          .of(Yup.string())
          .required("Supported currencies are required"),
        processingFees: Yup.number().required("Processing fees are required"),
        securityFeatures: Yup.array()
          .of(Yup.string())
          .required("Security features are required"),
        isActive: Yup.boolean().required("Active status is required"),
      })
    )
    .optional(),
  locationGoogl: Yup.object().shape({
    x: Yup.number().required("X coordinate is required"),
    y: Yup.number().required("Y coordinate is required"),
  }),
  companyId: Yup.string().required("Company ID is required"),
  specializations: Yup.array().of(Yup.string()).optional(),
});

export default AddClinicCollectionSchema;
