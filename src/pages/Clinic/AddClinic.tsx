import { useFormik } from "formik";
import InputForm from "../../Components/Inputs/InputForm";
import InputPropsType from "../../types/InputsType";
import { Box, Button, Center, ScrollArea } from "@mantine/core";
import TableSelection from "../../Components/Inputs/table/TableSelection";
import {
  ContactInfoType,
  Holiday,
  BankAccountType,
} from "../../types/GeneralAdd";
import AddClinicType, {
  WorkingHourAddClinic,
} from "../../types/clinic/AddClinic";
import AddClinicSchema from "../../schema/clinic/AddClinic";
import LocationPicker from "../../Components/Map/LocationPicker";
import useAddClinic from "../../hooks/clinic/useAddClinic";
import useDepatementsList from "../../hooks/departement/useDepartementsList";
import useStaffList from "../../hooks/staff/useStaffList";
import useSpecialization from "../../hooks/Specialization/useSpecializations";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface selectSpecializationType {
  [key: string]: string;
}
interface selectRoleType {
  [key: string]: string;
}
function AddClinic() {
  const hook = useAddClinic();
  const navigate = useNavigate();
  const departments = useDepatementsList();
  const querySpecialization = useSpecialization();

  const employeeHook = useStaffList(true, "PIC", "_id", "PIC");
  const formik = useFormik<AddClinicType>({
    initialValues: {
      isActive: true,
      PIC: "",
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
      // departmentId: "",
      specializations: [],
    },
    validationSchema: AddClinicSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log("Clinic Submitted:", values);
      hook.mutate(values);
     
    },
  });
  useEffect(() => {
    if(hook.isSuccess){
      const login = localStorage.getItem("loginToRegister");
      if (!login ) {
        navigate("/clinics");
      }
      formik.resetForm();
      formik.setValues({} as AddClinicType);
    }
  }, [hook.isSuccess]);


  const handleLocationChange = (location: { x: number; y: number }) => {
    formik.setFieldValue("locationGoogl", location);
  };

  if (!departments.isSuccess || !querySpecialization.data)
    return <Center>Loading...</Center>;
  const departmentName = [...new Set(departments.data.map((obj) => obj.name))];
  const nameIdMap: selectRoleType = departments.data.reduce<selectRoleType>(
    (acc, item) => {
      acc[item.name] = item._id;
      return acc;
    },
    {}
  );
  if (!employeeHook.data) return <Center>Loading . . . </Center>;
  const employees: selectRoleType = employeeHook.data.reduce<selectRoleType>(
    (acc, item) => {
      // pagination.setGeneralFilter("&employeeType=PIC");

      acc[item.name] = item._id;
      return acc;
    },
    {}
  );
  const Specializations: selectSpecializationType =
    querySpecialization.data.reduce<selectSpecializationType>((acc, item) => {
      acc[item.name] = item._id;
      return acc;
    }, {});
  function getKeysByValue<T>(obj: Record<string, T>, value: T[]): string[] {
    const keys = Object.entries(obj)
      .filter(([, val]) => value.includes(val)) // Check if the value is in the array of values
      .map(([key]) => key);
    console.log(formik.values.specializations);
    return keys;
  }
  const handleMultiSelectChange = (
    fieldName: string,
    selectedValues: string[]
  ) => {
    // console.log("@#@#@#@#");
    console.log(selectedValues);
    formik.setFieldValue(fieldName, selectedValues);
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
      id: "AverageDurationOfVisit",
      label: "Average Visit Duration (minutes)",
      mandatory: false,
      type: "number",
      error: formik.errors.AverageDurationOfVisit,
      placeholder: "Enter average visit duration",
      tooltip: "Enter the average duration of a visit in minutes",
      value: formik.values.AverageDurationOfVisit.toString(),
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "departmentId",
      label: "Department",
      mandatory: false,
      type: "select",
      error: formik.errors.departmentId,
      placeholder: "Select department",
      selectValue: departmentName,
      onChange: (selectedValue) => {
        if (typeof selectedValue === "string") {
          formik.setFieldValue("departmentId", nameIdMap[selectedValue]);
        }
      },
      onBlur: formik.handleBlur,
    },
    {
      id: "PIC",
      label: "PIC",
      mandatory: true,
      type: "select",
      description: "",
      error: formik.errors.PIC,
      placeholder: "",
      tooltip: "select the PIC",
      selectValue: Object.keys(employees),
      onChange: (selectedKeys) => {
        formik.setFieldValue("PIC", employees[selectedKeys as string]);
      },
      onBlur: formik.handleBlur,
    },
    {
      id: "specialties",
      label: "Specialties",
      mandatory: true,
      type: "multiSelect",
      description: "",
      error: formik.errors.specializations?.toString(),
      placeholder: "Select Specialties",
      tooltip: "Enter Specialties",
      value: getKeysByValue(Specializations, formik.values.specializations),

      onChange: (selectedKeys) => {
        if (
          Array.isArray(selectedKeys) &&
          selectedKeys.every((item) => typeof item === "string")
        ) {
          const selectedValues = selectedKeys.map(
            (key) => Specializations[key]
          );
          console.log("first");
          console.log(selectedValues);
          handleMultiSelectChange("specializations", selectedValues);
        } else {
          console.error("selectedKeys is not a valid array of strings");
        }
      },
      onBlur: formik.handleBlur,
      selectValue: Object.keys(Specializations) || [],
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
    // {
    //   id: "logo",
    //   label: "Logo URL",
    //   mandatory: true,
    //   type: "image",
    //   error: formik.errors.logo,
    //   placeholder: "Enter logo URL",
    //   tooltip: "Enter the URL for the clinic's logo",
    //   value: formik.values.logo || "",
    //   onChange :()=> (file: File | null) => {
    //     formik.setFieldValue("logo", file);
    //   },
    //   onBlur: formik.handleBlur,
    // },
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
  console.log("error", formik.errors);
  console.log("value", formik.values);
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
          <TableSelection<WorkingHourAddClinic>
            title="Working Hours"
            columns={[
              {
                key: "day",
                label: "Day",
                type: "select",
                options: [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
              },
              {
                key: "startTime",
                label: "Start Time",
                type: "time",
              },
              {
                key: "endTime",
                label: "End Time",
                type: "time",
              },
            ]}
            fieldName="WorkingHours"
            // onFieldChange={formik.setFieldValue}
            onFieldChange={(field, value) => formik.setFieldValue(field, value)}
            key={"WorkingHours"}
            data={formik.values.WorkingHours}
            error={formik.errors.WorkingHours?.toString() || ""}
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
