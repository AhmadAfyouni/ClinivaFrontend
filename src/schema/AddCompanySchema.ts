import * as Yup from "yup";

const AddCompanySchema = Yup.object().shape({
  name: Yup.string().required("Company name is required"),
  address: Yup.string().required("Address is required"),
  intro: Yup.string().required("Introduction is required"),
  yearOfEstablishment: Yup.string()
    .required("Year of establishment is required")
    .test("valid-date", "Please enter a valid date", (value) => {
      if (!value) return false;
      const date = new Date(value);
      return date.toString() !== "Invalid Date" && date <= new Date();
    }),
  logo: Yup.mixed()
    .nullable()
    .test("fileSize", "File size is too large (max 5MB)", (value) => {
      if (!value) return true;
      return (value as File).size <= 5 * 1024 * 1024;
    })
    .test("fileType", "Invalid file format (Only images allowed)", (value) => {
      if (!value) return true;
      return ["image/jpeg", "image/png", "image/jpg"].includes(
        (value as File).type
      );
    }),
  vision: Yup.string().required("Vision is required"),
  details: Yup.string().required("Details are required"),
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
  holidays: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required(),
      date: Yup.string().required(),
      reason: Yup.string().required(),
    })
  ),
  specializations: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
    })
  ),
  // workingDays: Yup.array().of(
  //   Yup.object().shape({
  //     day: Yup.string()
  //       .oneOf([
  //         "Monday",
  //         "Tuesday",
  //         "Wednesday",
  //         "Thursday",
  //         "Friday",
  //         "Saturday",
  //         "Sunday",
  //       ])
  //       .required(),
  //     timeSlots: Yup.array().of(
  //       Yup.object().shape({
  //         startTime: Yup.string().required(),
  //         endTime: Yup.string().required(),
  //       })
  //     ),
  //   })
  // ),
  bankAccount: Yup.array().of(
    Yup.object().shape({
      accountName: Yup.string().required(),
      swiftCode: Yup.string().required(),
      bankName: Yup.string().required(),
      accountNumber: Yup.string().required(),
    })
  ),
  insuranceCompany: Yup.array().of(
    Yup.object().shape({
      companyName: Yup.string().required(),
      companyPhone: Yup.string().matches(
        /^[0-9]{10,15}$/,
        "Invalid phone number"
      ),
      companyEmail: Yup.string().email("Invalid email format"),
    })
  ),
  commercialRecord: Yup.object().shape({
    recordNumber: Yup.string().required(),
    grantDate: Yup.string().required(),
    issueDate: Yup.string().required(),
    expirationDate: Yup.string().required(),
    taxNumber: Yup.string().required(),
  }),
  locationGoogle: Yup.object().shape({
    x: Yup.number().required("Latitude is required"),
    y: Yup.number().required("Longitude is required"),
  }),
});

export default AddCompanySchema;
