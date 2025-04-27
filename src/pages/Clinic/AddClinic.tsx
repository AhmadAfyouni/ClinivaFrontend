import { useFormik } from "formik";
import InputForm from "../../Components/Inputs/InputForm";
import InputPropsType from "../../types/InputsType";
import { Box, Button, ScrollArea } from "@mantine/core";
import TableSelection from "../../Components/Inputs/table/TableSelection";
import {
  ContactInfoType,
  Holiday,
  BankAccountType,
} from "../../types/GeneralAdd";
import AddClinicType from "../../types/clinic/AddClinic";
import AddClinicSchema from "../../schema/clinic/AddClinic";
import LocationPicker from "../../Components/Map/LocationPicker";

function AddClinic() {
  const formik = useFormik<AddClinicType>({
    initialValues: {
      isActive: true,
      AverageDurationOfVisit: 30,
      overview: "",
      yearOfEstablishment: "",
      address: "",
      logo: "",
      vision: "",
      goals: "",
      contactInfos: [],
      holidays: [],
      name: "",
      WorkingHours: [],
      bankAccount: [],
      insuranceCompany: [],
      cashBoxes: [],
      onlinePaymentMethods: [],
      commercialRecord: {
        recordNumber: "",
        grantDate: "",
        issueDate: "",
        expirationDate: "",
        taxNumber: "",
      },
      locationGoogl: {
        x: 0,
        y: 0,
      },
      departmentId: "67e50d71191e5b9428a74747",
      specializations: [],
    },
    validationSchema: AddClinicSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log("Clinic Submitted:", values);
      // Add your API call here
    },
  });

  const handleLocationChange = (location: { x: number; y: number }) => {
    formik.setFieldValue("locationGoogl", location);
  };

  const primaryFields: InputPropsType[] = [
    {
      id: "name",
      label: "Clinic Name",
      mandatory: true,
      type: "text",
      error: formik.errors.name,
      placeholder: "Enter clinic name",
      tooltip: "Enter the name of the clinic",
      value: formik.values.name || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "isActive",
      label: "Status",
      mandatory: true,
      type: "radio",
      error: formik.errors.isActive,
      radio: [
        { label: "Active", value: "true" },
        { label: "Inactive", value: "false" },
      ],
      value: formik.values.isActive.toString(),
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "AverageDurationOfVisit",
      label: "Average Visit Duration (minutes)",
      mandatory: true,
      type: "number",
      error: formik.errors.AverageDurationOfVisit,
      placeholder: "Enter average visit duration",
      tooltip: "Enter the average duration of a visit in minutes",
      value: formik.values.AverageDurationOfVisit.toString(),
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "overview",
      label: "Overview",
      mandatory: true,
      type: "text",
      error: formik.errors.overview,
      placeholder: "Enter overview",
      tooltip: "Enter a brief overview of the clinic",
      value: formik.values.overview || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "yearOfEstablishment",
      label: "Year of Establishment",
      mandatory: true,
      type: "date",
      error: formik.errors.yearOfEstablishment,
      placeholder: "Select establishment date",
      tooltip: "Select the date when the clinic was established",
      value: formik.values.yearOfEstablishment || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "address",
      label: "Address",
      mandatory: true,
      type: "text",
      error: formik.errors.address,
      placeholder: "Enter address",
      tooltip: "Enter the clinic's address",
      value: formik.values.address || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "logo",
      label: "Logo URL",
      mandatory: true,
      type: "text",
      error: formik.errors.logo,
      placeholder: "Enter logo URL",
      tooltip: "Enter the URL for the clinic's logo",
      value: formik.values.logo || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "vision",
      label: "Vision",
      mandatory: true,
      type: "text",
      error: formik.errors.vision,
      placeholder: "Enter vision",
      tooltip: "Enter the clinic's vision",
      value: formik.values.vision || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "goals",
      label: "Goals",
      mandatory: true,
      type: "text",
      error: formik.errors.goals,
      placeholder: "Enter goals",
      tooltip: "Enter the clinic's goals",
      value: formik.values.goals || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
  ];

  const commercialRecordFields: InputPropsType[] = [
    {
      id: "commercialRecord.recordNumber",
      label: "Record Number",
      mandatory: true,
      type: "text",
      error: formik.errors.commercialRecord?.recordNumber,
      placeholder: "Enter record number",
      value: formik.values.commercialRecord.recordNumber || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "commercialRecord.grantDate",
      label: "Grant Date",
      mandatory: true,
      type: "date",
      error: formik.errors.commercialRecord?.grantDate,
      placeholder: "Select grant date",
      value: formik.values.commercialRecord.grantDate || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "commercialRecord.issueDate",
      label: "Issue Date",
      mandatory: true,
      type: "date",
      error: formik.errors.commercialRecord?.issueDate,
      placeholder: "Select issue date",
      value: formik.values.commercialRecord.issueDate || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "commercialRecord.expirationDate",
      label: "Expiration Date",
      mandatory: true,
      type: "date",
      error: formik.errors.commercialRecord?.expirationDate,
      placeholder: "Select expiration date",
      value: formik.values.commercialRecord.expirationDate || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "commercialRecord.taxNumber",
      label: "Tax Number",
      mandatory: true,
      type: "text",
      error: formik.errors.commercialRecord?.taxNumber,
      placeholder: "Enter tax number",
      value: formik.values.commercialRecord.taxNumber || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
  ];

  return (
    <ScrollArea h="100vh">
      <form onSubmit={formik.handleSubmit}>
        <InputForm
          base={primaryFields}
          count={0}
          onSubmit={() => {}}
          with_submit={false}
          key={"primaryFields"}
        />

        <Box m={"xs"} p={"xs"}>
          <InputForm
            base={commercialRecordFields}
            count={0}
            onSubmit={() => {}}
            with_submit={false}
            title="Commercial Record"
            key={"commercialRecord"}
          />
        </Box>

        <Box m={"xs"} p={"xs"}>
          <TableSelection<ContactInfoType>
            title="Contact Information"
            fieldName="contactInfos"
            columns={[
              {
                key: "type",
                label: "Type",
                type: "select",
                options: ["email", "phone"],
              },
              {
                key: "isPublic",
                label: "Is Public",
                type: "boolean",
                options: ["yes", "no"],
              },
              {
                key: "value",
                label: "Value",
                type: "text",
              },
              {
                key: "subType",
                label: "Sub Type",
                type: "text",
              },
            ]}
            key={"contactInfos"}
            onFieldChange={formik.setFieldValue}
            data={formik.values.contactInfos}
            error={formik.errors.contactInfos?.toString() || ""}
          />
        </Box>

        <Box m={"xs"} p={"xs"}>
          <TableSelection<Holiday>
            title="Holidays"
            columns={[
              { key: "name", label: "Name", type: "text" },
              {
                key: "date",
                label: "Date",
                type: "date",
              },
              {
                key: "reason",
                label: "Reason",
                type: "text",
              },
            ]}
            fieldName="holidays"
            onFieldChange={formik.setFieldValue}
            key={"holidays"}
            data={formik.values.holidays}
            error={formik.errors.holidays?.toString() || ""}
          />
        </Box>

        <Box m={"xs"} p={"xs"}>
          <TableSelection<BankAccountType>
            title="Bank Accounts"
            columns={[
              { key: "accountName", label: "Account Name", type: "text" },
              { key: "swiftCode", label: "Swift Code", type: "text" },
              { key: "bankName", label: "Bank Name", type: "text" },
              { key: "bankAddress", label: "Bank Address", type: "text" },
              { key: "accountNumber", label: "Account Number", type: "text" },
              { key: "accountType", label: "Account Type", type: "text" },
              {
                key: "isActive",
                label: "Is Active",
                type: "boolean",
                options: ["yes", "no"],
              },
            ]}
            fieldName="bankAccount"
            onFieldChange={formik.setFieldValue}
            key={"bankAccount"}
            data={formik.values.bankAccount}
            error={formik.errors.bankAccount?.toString() || ""}
          />
        </Box>

        <Box m={"xs"} p={"xs"}>
          <h3>Location</h3>
          <LocationPicker
            onChange={handleLocationChange}
            initialPosition={formik.values.locationGoogl}
          />
          {formik.errors.locationGoogl && (
            <div style={{ color: "red" }}>
              {formik.errors.locationGoogl.toString()}
            </div>
          )}
        </Box>

        <Button type="submit" mt="md" w="30%" mb="110px">
          Submit
        </Button>
      </form>
    </ScrollArea>
  );
}

export default AddClinic;
