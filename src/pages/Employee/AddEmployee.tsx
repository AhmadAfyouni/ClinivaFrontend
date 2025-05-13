import { useFormik } from "formik";
import AddEmployeeType, {
  VacationRecordsType,
} from "../../types/Employee/AddEmployeeType";
import AddEmployeeSchema from "../../schema/Employee/AddEmployeeSchema";
import InputForm from "../../Components/Inputs/InputForm";
import InputPropsType from "../../types/InputsType";
import { Button, Center, ScrollArea, Text } from "@mantine/core";
import { country } from "../../data/country";
import TableSelection from "../../Components/Inputs/table/TableSelection";
import useSpecialization from "../../hooks/Specialization/useSpecializations";
import useAddEmployee from "../../hooks/employee/useAddEmployee";
import {
  WorkingHoursType,
  ContactInfoType,
  BreakTimesType,
} from "../../types/GeneralAdd";
import useClinicsList from "../../hooks/clinic/useClinicsList";
import useDepartementsList from "../../hooks/departement/useDepartementsList";
import useMedicalComplexList from "../../hooks/medicalcomplex/useMedicalComplexList";
import { language } from "../../data/Language";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface selectSpecializationType {
  [key: string]: string;
}
interface Props {
  employeeType:
    | "Doctor"
    | "Nurse"
    | "Technician"
    | "Administrative"
    | "Employee"
    | "PIC"
    | "Other";
}
function AddEmployee({ employeeType }: Props) {
  const handleImageChange = (file: File | null) => {
    formik.setFieldValue("image", file);
  };

  const navigate = useNavigate();
  const hook = useAddEmployee();
  const querySpecialization = useSpecialization();
  const queryClinic = useClinicsList();
  const queryDepartment = useDepartementsList();
  const queryMedicalComplex = useMedicalComplexList();
  const departmentName = [
    ...new Set(queryDepartment.data?.map((obj) => obj.name)),
  ];

  const formik = useFormik<AddEmployeeType>({
    initialValues: {
      // clinicCollectionId: "",
      // companyId: "",
      // departmentId: "",
      name: "",
      dateOfBirth: "",
      gender: "",
      identity: "",
      nationality: "",
      image: "",
      marital_status: "Single",
      number_children: 0,
      notes: "",
      address: "",
      professional_experience: "",
      Languages: [],
      workingHours: [],
      employeeType: employeeType === "Doctor" ? employeeType : "",
      contactInfos: [],
      vacationRecords: [],
      hireDate: "",
      medicalLicenseNumber: "",
      certifications: "",
      jobType: "FULL_TIME",
      breakTimes: [],
      isActive: true,
      // clinics: [],
      specializations: [],
    },
    validationSchema: AddEmployeeSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      // values.image = "";
      hook.mutate(values);

      console.log("Form Submitted:", values);
    },
  });
  useEffect(() => {
    if (hook.isSuccess) {
      formik.resetForm();
      formik.values = {} as AddEmployeeType;
      navigate("/users/add");
    }
  }, [hook.isSuccess]);
  if (
    !querySpecialization.isFetched ||
    !querySpecialization.data ||
    !queryClinic.data ||
    !queryMedicalComplex.data ||
    !queryDepartment.data
  )
    return (
      <Center>
        <Text>No Specialization Found</Text>
      </Center>
    );
  const clinicName = [...new Set(queryClinic.data?.map((obj) => obj.name))];
  const medicalComplexName = [
    ...new Set(queryMedicalComplex.data?.map((obj) => obj.name)),
  ];
  const nameIdMapMedicalComplex = queryMedicalComplex.data?.reduce<
    Record<string, string>
  >((acc, medicalComplex) => {
    acc[medicalComplex.name] = medicalComplex._id;
    return acc;
  }, {});
  const nameIdMapDepartment = queryDepartment.data?.reduce<
    Record<string, string>
  >((acc, department) => {
    acc[department.name] = department._id;
    return acc;
  }, {});

  const Specializations: selectSpecializationType =
    querySpecialization.data.reduce<selectSpecializationType>((acc, item) => {
      acc[item.name] = item._id;
      return acc;
    }, {});
  const Clinics: selectSpecializationType =
    queryClinic.data.reduce<selectSpecializationType>((acc, item) => {
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
      value: formik.values.dateOfBirth?.toString() || "",
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
      tooltip: "Enter  identity",
      value: formik.values.identity || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "employeeType",
      label: "Employee Type",
      mandatory: true,
      type: "select",
      disabled: employeeType === "Doctor",
      description: "",
      error: formik.errors.employeeType,
      placeholder: "",
      tooltip: "select the Employee Type",
      value: formik.values.employeeType || "",
      // onChange: formik.handleChange,
      onChange: (value) => formik.setFieldValue("employeeType", value),

      onBlur: formik.handleBlur,
      selectValue: [
        "Doctor",
        "Nurse",
        "Technician",
        "Administrative",
        "Employee",
        "PIC",
        "Other",
      ],
    },
    {
      id: "departmentId",
      label: "Department",
      mandatory: false,
      type: "select",
      description: "",
      error: formik.errors.departmentId,
      placeholder: "Select department",
      tooltip: "Enter the department",
      // value: formik.values.departmentId || "",
      onChange: (selectedValue) => {
        if (typeof selectedValue === "string") {
          formik.setFieldValue(
            "departmentId",
            nameIdMapDepartment[selectedValue]
          );
        }
      },
      onBlur: formik.handleBlur,
      selectValue: departmentName,
    },
    {
      id: "medicalComplexId",
      label: "Medical Complex",
      mandatory: false,
      type: "select",
      description: "",
      error: formik.errors.clinicCollectionId,
      placeholder: "Select medical complex",
      tooltip: "Enter the medical complex",
      // value: formik.values.clinicCollectionId || "",
      onChange: (selectedValue) => {
        if (typeof selectedValue === "string") {
          formik.setFieldValue(
            "clinicCollectionId",
            nameIdMapMedicalComplex[selectedValue]
          );
        }
      },
      onBlur: formik.handleBlur,
      selectValue: medicalComplexName,
    },
    {
      id: "clinics",
      label: "Clinic",
      mandatory: false,
      type: "multiSelect",
      description: "",
      error: formik.errors.clinics,
      placeholder: "Select clinic",
      tooltip: "Enter the clinic",

      onChange: (selectedKeys) => {
        if (
          Array.isArray(selectedKeys) &&
          selectedKeys.every((item) => typeof item === "string")
        ) {
          const selectedValues = selectedKeys.map((key) => Clinics[key]);
          handleMultiSelectChange("clinics", selectedValues);
        } else {
          console.error("selectedKeys is not a valid array of strings");
        }
      },
      onBlur: formik.handleBlur,
      selectValue: clinicName,
    },
    {
      id: "nationality",
      label: "Nationality",
      mandatory: true,
      type: "select",
      description: "",
      error: formik.errors.nationality,
      placeholder: "Select nationality",
      tooltip: "Enter  nationality",
      value: formik.values.nationality || "",
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
      value: formik.values.hireDate?.toString(),
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
      tooltip: "Enter  address",
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
      tooltip: "Enter  Medical License Number",
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
      tooltip: "Enter  professional experience",
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
      tooltip: "Enter  Languages",
      value: formik.values.Languages || [],
      // onChange: formik.handleChange,
      onChange: (selectedValues) =>
        handleMultiSelectChange("Languages", selectedValues as string[]),

      onBlur: formik.handleBlur,
      selectValue: language,
    },
    {
      id: "specialties",
      label: "Specialties",
      mandatory: true,
      type: "multiSelect",
      description: "",
      error: formik.errors.specializations?.toString(),
      placeholder: "Select Specialties",
      tooltip: "Enter  Specialties",
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
      id: "certifications",
      label: "certifications",
      mandatory: true,
      type: "text",
      description: "",
      error: formik.errors.certifications?.toString(),
      placeholder: "Select certifications",
      tooltip: "Enter  certifications",
      value: formik.values.certifications || [],
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },

    {
      id: "image",
      label: "Profile Image",
      mandatory: false,
      type: "image",
      description: "",
      error: formik.errors.image,
      placeholder: "",
      value: formik.values.image || "",
      onChangeFile: handleImageChange,
      onChange: () => {},
    },
  ];
  return (
    <ScrollArea h="calc(100vh - 80px)" w="100%">
      <form onSubmit={formik.handleSubmit}>
        <InputForm
          base={primaryFields}
          count={0}
          onSubmit={() => {}}
          with_submit={false}
        />

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
            {
              key: "subType",
              label: "Sub Type",
              type: "text",
            },
          ]}
          onFieldChange={formik.setFieldValue}
          error={formik.errors.contactInfos?.toString() || ""}
        />
        <TableSelection<WorkingHoursType>
          title="Working Hours"
          fieldName="workingHours"
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
          onFieldChange={formik.setFieldValue}
          key={"workingHours"}
          data={formik.values.workingHours}
          error={formik.errors.workingHours?.toString() || ""}
          />
        <TableSelection<VacationRecordsType>
          title="Vacation Records"
          fieldName="vacationRecords"
          columns={[
            { key: "leaveStartDate", label: "Leave Start Date", type: "date" },
            { key: "leaveEndDate", label: "Leave End Date", type: "date" },
            {
              key: "leaveType",
              label: "Leave Type",
              type: "select",
              options: ["Vacation", "Sick Leave", "Emergency"],
            },
            {
              key: "status",
              label: "Status",
              type: "select",
              options: ["Approved", "Sick Pending "],
            },
          ]}
          onFieldChange={formik.setFieldValue}
          key={"vacationRecords"}
          data={formik.values.vacationRecords}
          error={formik.errors.vacationRecords?.toString() || ""}
        />
        <TableSelection<BreakTimesType>
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

export default AddEmployee;
