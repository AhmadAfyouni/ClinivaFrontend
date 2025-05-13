import * as Yup from "yup";

const AddClinicSchema = Yup.object().shape({
  isActive: Yup.boolean().required("Status is required"),
  AverageDurationOfVisit: Yup.number().required("Average duration is required"),
  overview: Yup.string().required("Overview is required"),
  yearOfEstablishment: Yup.string().required(
    "Year of establishment is required"
  ),
  address: Yup.string().required("Address is required"),
  logo: Yup.string(),
  vision: Yup.string().required("Vision is required"),
  goals: Yup.string().required("Goals are required"),
  name: Yup.string().required("Name is required"),
  contactInfos: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required("Type is required"),
      value: Yup.string().required("Value is required"),
      subType: Yup.string().required("Sub type is required"),
    })
  ),
  holidays: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Holiday name is required"),
      date: Yup.string().required("Date is required"),
      reason: Yup.string().required("Reason is required"),
    })
  ),
  WorkingHours: Yup.array().of(
    Yup.object().shape({
      day: Yup.string().required("Day is required"),
      timeSlots: Yup.array().of(
        Yup.object().shape({
          startTime: Yup.string().required("Start time is required"),
          endTime: Yup.string().required("End time is required"),
        })
      ),
    })
  ),
  bankAccount: Yup.array().of(
    Yup.object().shape({
      accountName: Yup.string().required("Account name is required"),
      swiftCode: Yup.string().required("Swift code is required"),
      bankName: Yup.string().required("Bank name is required"),
      bankAddress: Yup.string().required("Bank address is required"),
      accountNumber: Yup.string().required("Account number is required"),
      accountType: Yup.string().required("Account type is required"),
      isActive: Yup.boolean().required("Status is required"),
    })
  ),
  insuranceCompany: Yup.array().of(
    Yup.object().shape({
      companyName: Yup.string().required("Company name is required"),
      coveredServices: Yup.array().of(Yup.string()),
      termsAndConditions: Yup.string().required(
        "Terms and conditions are required"
      ),
      coverageDetails: Yup.array().of(Yup.string()),
      coveragePercentage: Yup.number().required(
        "Coverage percentage is required"
      ),
      contractStartDate: Yup.string().required(
        "Contract start date is required"
      ),
      contractEndDate: Yup.string().required("Contract end date is required"),
      contactPerson: Yup.string().required("Contact person is required"),
      companyPhone: Yup.string().required("Company phone is required"),
      companyEmail: Yup.string().email().required("Company email is required"),
      address: Yup.string().required("Address is required"),
      isActive: Yup.boolean().required("Status is required"),
    })
  ),
  cashBoxes: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Name is required"),
      isActive: Yup.boolean().required("Status is required"),
      location: Yup.string().required("Location is required"),
      currency: Yup.string().required("Currency is required"),
      pic: Yup.string().required("PIC is required"),
      totalBalance: Yup.number().required("Total balance is required"),
      createdBy: Yup.string().required("Creator is required"),
      transactionHistory: Yup.array().of(
        Yup.object().shape({
          date: Yup.string().required("Date is required"),
          amount: Yup.number().required("Amount is required"),
          description: Yup.string().required("Description is required"),
        })
      ),
    })
  ),
  onlinePaymentMethods: Yup.array().of(
    Yup.object().shape({
      companyName: Yup.string().required("Company name is required"),
      transactionType: Yup.string().required("Transaction type is required"),
      type: Yup.string().required("Type is required"),
      supportedCurrencies: Yup.array().of(Yup.string()),
      processingFees: Yup.number().required("Processing fees are required"),
      securityFeatures: Yup.array().of(Yup.string()),
      isActive: Yup.boolean().required("Status is required"),
    })
  ),
  commercialRecord: Yup.object().shape({
    recordNumber: Yup.string().required("Record number is required"),
    grantDate: Yup.string().required("Grant date is required"),
    issueDate: Yup.string().required("Issue date is required"),
    expirationDate: Yup.string().required("Expiration date is required"),
    taxNumber: Yup.string().required("Tax number is required"),
  }),
  locationGoogl: Yup.object().shape({
    x: Yup.number().required("Latitude is required"),
    y: Yup.number().required("Longitude is required"),
  }),
  departmentId: Yup.string(),
  specializations: Yup.array()
    .of(Yup.string())
    .required("Specializations are required"),
  PIC: Yup.string().required("PIC is required"),
});

export default AddClinicSchema;
