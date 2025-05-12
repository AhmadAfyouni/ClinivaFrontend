import { useFormik } from "formik";
import AddMedicalComplexType from "../../types/medicalComplex/MedicalComplexAdd"; // Import the type
import InputForm from "../../Components/Inputs/InputForm";
import InputPropsType from "../../types/InputsType";
import { Box, Button, Center, Flex, ScrollArea, Text } from "@mantine/core";
import useSpecialization from "../../hooks/Specialization/useSpecializations";
import AddMedicalComplexSchema from "../../schema/MedicalComplex/AddMedicalComplex";
import TableSelection from "../../Components/Inputs/table/TableSelection";
import {
  ContactInfoType,
  Holiday,
  WorkingHoursType,
} from "../../types/GeneralAdd";
import LocationPicker from "../../Components/Map/LocationPicker";
import useAddMedicalComplex from "../../hooks/medicalcomplex/useAddMedicalComplex";
import useStaffList from "../../hooks/staff/useStaffList";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
interface selectRoleType {
  [key: string]: string;
}
interface selectSpecializationType {
  [key: string]: string;
}
function AddMedicalComplex() {
  const hook = useAddMedicalComplex();
  const querySpecialization = useSpecialization();
  const company = localStorage.getItem("companyId");
  const employeeHook = useStaffList(true, "PIC", "_id", "PIC");
  const location = useLocation();
  const navigate = useNavigate();

  const formik = useFormik<AddMedicalComplexType>({
    initialValues: {
      name: "",
      phone: "",
      overview: "",
      PIC: "",
      policies: "",
      yearOfEstablishment: "",
      address: "",
      logo: "",
      vision: "",
      goals: "",
      contactInfos: [],
      holidays: [],
      workingDays: [],
      bankAccount: [],
      insuranceCompany: [],
      commercialRecord: {
        recordNumber: "",
        grantDate: "",
        issueDate: "",
        expirationDate: "",
        taxNumber: "",
      },
      cashBoxes: null,
      onlinePaymentMethods: [],
      locationGoogl: {
        x: 0,
        y: 0,
      },
      companyId: company || "",
      specializations: [],
      isActive: true,
    },
    validationSchema: AddMedicalComplexSchema,
    validateOnBlur: false,
    isInitialValid: true,
    validateOnChange: true,
    onSubmit: (values) => {
      const { companyId, ...rest } = values;
      const payload = companyId === "" ? rest : values;
      hook.mutate(payload);
    },
  });

  useEffect(() => {
    if (hook.isSuccess) {
      formik.resetForm();
      formik.values = {} as AddMedicalComplexType;
      if (location.pathname === "/medicalComplexes/add") {
        navigate("/medicalComplexes");
      }
    }
  }, [hook.isSuccess]);

  if (
    !querySpecialization.isFetched ||
    !querySpecialization.data ||
    !employeeHook.isSuccess
  )
    return (
      <Center>
        <Text>Loading . .. </Text>
      </Center>
    );

  const employees: selectRoleType = employeeHook.data.reduce<selectRoleType>(
    (acc, item) => {
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

  const primaryFields: InputPropsType[] = [
    {
      id: "name",
      label: "Complex Name",
      mandatory: true,
      type: "text",
      error: formik.errors.name,
      placeholder: "Enter complex name",
      tooltip: "Enter the name of the complex",
      value: formik.values.name || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "phone",
      label: "Phone Number",
      mandatory: true,
      type: "text",
      error: formik.errors.phone,
      placeholder: "Enter Phone Number Complex ",
      tooltip: "Enter the Phone Number of the complex",
      value: Number(formik.values.phone) || 963,
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
      tooltip: "Enter a brief overview of the complex",
      value: formik.values.overview || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "policies",
      label: "Policies",
      mandatory: true,
      type: "text",
      error: formik.errors.policies,
      placeholder: "Enter policies",
      tooltip: "Enter the complex's policies",
      value: formik.values.policies || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },

    {
      id: "yearOfEstablishment",
      label: "Year of Establishment",
      mandatory: true,
      type: "date",
      error: formik.errors.yearOfEstablishment,
      placeholder: "Enter year of establishment",
      tooltip: "Enter the year the complex was established",
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
      tooltip: "Enter the Medical Complex's address",
      value: formik.values.address || "",
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
      tooltip: "Enter the Medical Complex's vision",
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
      tooltip: "Enter the Medical Complex's goals",
      value: formik.values.goals || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "PIC",
      label: "PIC",
      mandatory: true,
      type: "select",
      description: "",
      error: formik.errors.PIC,
      placeholder: "Select PIC",
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
      tooltip: "Enter your Specialties",
      value: getKeysByValue(Specializations, formik.values.specializations),
      onChange: (selectedKeys) => {
        if (
          Array.isArray(selectedKeys) &&
          selectedKeys.every((item) => typeof item === "string")
        ) {
          const selectedValues = selectedKeys.map(
            (key) => Specializations[key]
          );
          handleMultiSelectChange("specializations", selectedValues);
        } else {
          console.error("selectedKeys is not a valid array of strings");
        }
      },
      onBlur: formik.handleBlur,
      selectValue: Object.keys(Specializations),
    },
  ];

  const CommercialRecordFields: InputPropsType[] = [
    {
      id: "commercialRecord.recordNumber",
      label: "Record Number",
      mandatory: true,
      type: "text",
      error: formik.errors.commercialRecord?.recordNumber,
      placeholder: "Enter recordNumber",
      tooltip: "Enter the recordNumber",
      value: formik.values.commercialRecord.recordNumber,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "commercialRecord.grantDate",
      label: "Grant Date",
      mandatory: true,
      type: "date",
      error: formik.errors.commercialRecord?.grantDate,
      placeholder: "Enter Grant Date",
      tooltip: "Enter the Grant Date",
      value: formik.values.commercialRecord.grantDate,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "commercialRecord.expirationDate",
      label: "Expiration Date",
      mandatory: true,
      type: "date",
      error: formik.errors.commercialRecord?.expirationDate,
      placeholder: "Enter Expiration Date",
      tooltip: "Enter the Expiration Date",
      value: formik.values.commercialRecord.expirationDate,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "commercialRecord.issueDate",
      label: "Issue Date",
      mandatory: true,
      type: "date",
      error: formik.errors.commercialRecord?.issueDate,
      placeholder: "Enter Issue Date",
      tooltip: "Enter the Issue Date",
      value: formik.values.commercialRecord.issueDate,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "commercialRecord.taxNumber",
      label: "Tax Number",
      mandatory: true,
      type: "number",
      error: formik.errors.commercialRecord?.taxNumber,
      placeholder: "Enter Tax Number",
      tooltip: "Enter the Tax Number",
      value: formik.values.commercialRecord.taxNumber,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
  ];
  const handleLocationChange = (location: { x: number; y: number }) => {
    console.log(location, "5555555555");
    formik.setFieldValue("locationGoogl", location);
    console.log("first", formik.values.locationGoogl);
  };
  const handleMultiSelectChange = (
    fieldName: string,
    selectedValues: string[]
  ) => {
    formik.setFieldValue(fieldName, selectedValues);
  };
  console.log("formik.values@@@@@@ ", formik.values);
  console.log("formik.error######## ", formik.errors);

  return (
    <ScrollArea h="calc(100vh - 80px)" w="100%">
      <form onSubmit={formik.handleSubmit}>
        <InputForm
          base={primaryFields}
          count={0}
          onSubmit={() => {}}
          with_submit={false}
          key={"primaryFields"}
        />
        <Box m={"xs"} p={"xs"} style={{ border: "1px 0 0 0 solid " }}>
          <InputForm
            base={CommercialRecordFields}
            count={0}
            onSubmit={() => {}}
            with_submit={false}
            title="Commercial Record Fields"
            key={""}
          />
        </Box>

        <TableSelection<ContactInfoType>
          title="Contact Infos"
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
            // {
            //   key: "subType",
            //   label: "Sub Type",
            //   type: "text",
            // },
          ]}
          key={"contactInfos"}
          onFieldChange={formik.setFieldValue}
          data={formik.values.contactInfos}
          error={formik.errors.contactInfos?.toString() || ""}
        />

        <TableSelection<WorkingHoursType>
          title="Working Days"
          columns={[
            {
              key: "day",
              label: "Day",
              type: "select",
              options: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
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
          fieldName="workingDays"
          onFieldChange={formik.setFieldValue}
          key={"workingDays"}
          data={formik.values.workingDays}
          error={formik.errors.workingDays?.toString() || ""}
        />
        <TableSelection<Holiday>
          title="Holiday"
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
        {/* <TableSelection<BankAccountType>
          title="bankAccount"
          columns={[
            { key: "accountNumber", label: "Account Number", type: "text" },
            {
              key: "bankName",
              label: "Bank Name",
              type: "text",
            },

            {
              key: "accountHolder",
              label: "Account Holder",
              type: "text",
            },
          ]}
          fieldName="bankAccount"
          onFieldChange={formik.setFieldValue}
          key={"bankAccount"}
          data={formik.values.bankAccount}
          error={formik.errors.holidays?.toString() || ""}
        /> */}

        <Box mt="md" mb="xl">
          <Flex gap={"xl"}>
            <h3>Location</h3>
            <h5>x: {formik.values.locationGoogl.x}</h5>
            <h5>x: {formik.values.locationGoogl.y}</h5>
          </Flex>
          <LocationPicker
            onChange={handleLocationChange}
            initialPosition={formik.values.locationGoogl}
          />
          {formik.errors.locationGoogl && (
            <div style={{ color: "red" }}>
              {formik.errors.locationGoogl as string}
            </div>
          )}
        </Box>
        <Button type="submit">Submit</Button>
      </form>
    </ScrollArea>
  );
}

export default AddMedicalComplex;
