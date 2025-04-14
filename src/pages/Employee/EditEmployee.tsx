import { useFormik } from "formik";
import { WorkingHoursType } from "../../types/Employee/AddEmployeeType";
import AddEmployeeSchema from "../../schema/Employee/AddEmployeeSchema";
import InputForm from "../../Components/Inputs/InputForm";
import InputPropsType from "../../types/InputsType";
import { Button, Center, ScrollArea, Text } from "@mantine/core";
import { country } from "../../data/country";
import TableSelection from "../../Components/Inputs/table/TableSelection";
import useSpecialization from "../../hooks/Specialization/useSpecializations";
import GetEmployeeType, {
  BreakTime,
  ContactInfo,
  VacationRecord,
} from "../../types/Employee/GetEmployee";
import useEditEmployee from "../../hooks/employee/useEditEmployee";
import EditEmployeeSchema from "../../schema/Employee/EditEmployeeSchema";

interface selectSpecializationType {
  [key: string]: string;
}
interface Props {
  data: GetEmployeeType;
}
function EditEmployee({ data }: Props) {
  const handleImageChange = (file: File | null) => {
    formik.setFieldValue("image", file);
  };
  const querySpecialization = useSpecialization();
  const hook = useEditEmployee("67e50dea191e5b9428a7474f");
  // if (employee.data) return <></>

  const formik = useFormik<GetEmployeeType>({
    initialValues: {
      createdAt: data.createdAt,
      _id: data._id,
      __v: data.__v,
      specialties: data.specialties,
      updatedAt: data.updatedAt,
      clinicCollectionId: "",
      companyId: data.companyId || "",
      departmentId: data.departmentId || "",
      name: data.name,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender || "female",
      identity: data.identity,
      nationality: data.nationality,
      image: data.image,
      marital_status: data.marital_status,
      number_children: data.number_children,
      notes: data.notes,
      address: data.address,
      professional_experience: data.professional_experience,
      Languages: data.Languages,
      workingHours: data.workingHours,
      employeeType: data.employeeType,
      contactInfos: data.contactInfos,
      vacationRecords: data.vacationRecords,
      hireDate: data.hireDate,
      medicalLicenseNumber: data.medicalLicenseNumber,
      certifications: data.certifications,
      jobType: data.jobType,
      breakTimes: data.breakTimes,
      isActive: data.isActive,
      clinics: null,
      specializations: data.specializations,
    },
    validationSchema: EditEmployeeSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      values.image = "";
      hook.mutate(values);
      formik.resetForm();
      console.log("Form Submitted:", values);
    },
  });

  if (!querySpecialization.isFetched || !querySpecialization.data)
    return (
      <Center>
        <Text>No Specialization Found</Text>
      </Center>
    );
  console.log("first@@@@@@@@@");
  console.log(formik.errors);
  const Specializations: selectSpecializationType =
    querySpecialization.data.reduce<selectSpecializationType>((acc, item) => {
      acc[item.name] = item._id;
      return acc;
    }, {});

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
      label: "Name",
      mandatory: true,
      type: "text",
      description: "",
      error: formik.errors.name,
      placeholder: "John Doe",
      tooltip: "Enter the name",
      value: formik.values.name || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },

    {
      id: "dateOfBirth",
      label: "Date Of Birth",
      mandatory: true,
      type: "date",
      description: "",
      error: formik.errors.dateOfBirth,
      placeholder: "",
      value: formik.values.dateOfBirth || data.dateOfBirth,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "gender",
      label: "Gender",
      mandatory: true,
      type: "radio",
      description: "",
      error: formik.errors.gender,
      placeholder: "",
      value: formik.values.gender || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      radio: [
        { label: "Female", value: "female" },
        { label: "Male", value: "male" },
      ],
    },
    {
      id: "identity",
      label: "Identity",
      mandatory: true,
      type: "text",
      description: "",
      error: formik.errors.identity,
      placeholder: "123456517890",
      tooltip: "Enter your identity",
      value: formik.values.identity || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "employeeType",
      label: "Employee Type",
      mandatory: true,
      type: "select",
      description: "",
      error: formik.errors.employeeType,
      placeholder: "",
      tooltip: "select the Employee Type",
      value: formik.values.employeeType || data.employeeType,
      // onChange: formik.handleChange,
      onChange: (value) => formik.setFieldValue("employeeType", value),

      onBlur: formik.handleBlur,
      selectValue: [
        "Doctor",
        "Nurse",
        "Technician",
        "Administrative",
        "Employee",
        "Other",
      ],
    },
    {
      id: "nationality",
      label: "Nationality",
      mandatory: true,
      type: "select",
      description: "",
      error: formik.errors.nationality,
      placeholder: "Select nationality",
      tooltip: "Enter your nationality",
      value: formik.values.nationality || data.nationality,
      onChange: (value) => formik.setFieldValue("nationality", value),
      onBlur: formik.handleBlur,
      selectValue: country,
    },
    {
      id: "hireDate",
      label: "Hire Date",
      mandatory: true,
      type: "date",
      description: "",
      error: formik.errors.hireDate,
      placeholder: "",
      value: formik.values.hireDate || data.hireDate,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "marital_status",
      label: "Marital Status",
      mandatory: false,
      type: "radio",
      description: "",
      error: formik.errors.marital_status,
      placeholder: "",
      value: formik.values.marital_status || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      radio: [
        { label: "Single", value: "Single" },
        { label: "Married", value: "Married" },
        { label: "Divorced", value: "Divorced" },
        { label: "Widowed", value: "Widowed" },
      ],
    },
    {
      id: "number_children",
      label: "Number of Children",
      mandatory: true,
      type: "number",
      description: "",
      error: formik.errors.number_children,
      placeholder: "0",
      tooltip: "Enter number of children",
      value: formik.values.number_children?.toString() || "0",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "address",
      label: "Address",
      mandatory: true,
      type: "text",
      description: "",
      error: formik.errors.address,
      placeholder: "Enter address",
      tooltip: "Enter your address",
      value: formik.values.address || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "medicalLicenseNumber",
      label: "Medical License Number",
      mandatory: true,
      type: "text",
      description: "",
      error: formik.errors.medicalLicenseNumber,
      placeholder: "Medical License Number",
      tooltip: "Enter your Medical License Number",
      value: formik.values.medicalLicenseNumber || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "professional_experience",
      label: "Professional Experience",
      mandatory: true,
      type: "areaText",
      description: "",
      error: formik.errors.professional_experience,
      placeholder: "Enter professional experience",
      tooltip: "Enter your professional experience",
      value: formik.values.professional_experience || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },

    {
      id: "notes",
      label: "Notes",
      mandatory: false,
      type: "areaText",
      description: "",
      error: formik.errors.notes,
      placeholder: "Enter notes",
      tooltip: "Enter additional notes",
      value: formik.values.notes || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "languages",
      label: "Languages",
      mandatory: true,
      type: "multiSelect",
      description: "",
      error: formik.errors.Languages?.toString(),
      placeholder: "Select Languages",
      tooltip: "Enter your Languages",
      value: formik.values.Languages || [],
      // onChange: formik.handleChange,
      onChange: (selectedValues) =>
        handleMultiSelectChange("Languages", selectedValues as string[]),

      onBlur: formik.handleBlur,
      selectValue: ["English", "French", "Spanish", "German", "Italian"],
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
      value: formik.values.specialties || [""],
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
      id: "certifications",
      label: "certifications",
      mandatory: true,
      type: "multiSelect",
      description: "",
      error: formik.errors.certifications?.toString(),
      placeholder: "Select certifications",
      tooltip: "Enter your certifications",
      // value: formik.values.certifications.join(" "),
      onChange: (selectedValues) =>
        handleMultiSelectChange("certifications", selectedValues as string[]),

      onBlur: formik.handleBlur,
      selectValue: ["cert1", "cert2"],
    },

    {
      id: "image",
      label: "Profile Image",
      mandatory: false,
      type: "image",
      description: "",
      error: formik.errors.image,
      placeholder: "",
      value: formik.values.image,
      onChangeFile: handleImageChange,
      onChange: () => {},
    },
  ];
  console.log(formik.values);
  return (
    <ScrollArea h="calc(100vh - 80px)" w="100%">
      <form onSubmit={formik.handleSubmit}>
        <InputForm
          base={primaryFields}
          count={0}
          onSubmit={() => {}}
          with_submit={false}
        />

        <TableSelection<ContactInfo>
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
          ]}
          data={formik.values.contactInfos}
          onFieldChange={formik.setFieldValue}
          error={formik.errors.contactInfos?.toString() || ""}
        />
        <TableSelection<WorkingHoursType>
          title="Working Hours"
          columns={[
            { key: "day", label: "Day", type: "date" },
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
          fieldName="workingHours"
          onFieldChange={formik.setFieldValue}
          key={"workingHours"}
          data={formik.values.workingHours}
          error={formik.errors.workingHours?.toString() || ""}
        />
        <TableSelection<VacationRecord>
          title="Vacation Records"
          columns={[
            { key: "startDate", label: "Leave Start Date", type: "date" },
            { key: "endDate", label: "Leave End Date", type: "date" },
            {
              key: "reason",
              label: "Reason",
              type: "text",
            },
          ]}
          fieldName="vacationRecords"
          onFieldChange={formik.setFieldValue}
          key={"vacationRecords"}
          data={formik.values.vacationRecords}
          error={formik.errors.vacationRecords?.toString() || ""}
        />
        <TableSelection<BreakTime>
          columns={[
            { key: "startTime", label: "Start Time", type: "time" },
            { key: "endTime", label: "End Time", type: "time" },
          ]}
          fieldName="breakTimes"
          title="Break Times"
          key={"breakTimes"}
          onFieldChange={formik.setFieldValue}
          error={formik.errors.breakTimes?.toString() || ""}
          data={formik.values.breakTimes}
        />
        <Button type="submit">Submit</Button>
      </form>
    </ScrollArea>
  );
}

export default EditEmployee;
