import { useFormik } from "formik";
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
import { WorkingHoursType } from "../../types/GeneralAdd";
import useStaffDetails from "../../hooks/staff/useStaffDetails";
import { useParams } from "react-router";

interface selectSpecializationType {
  [key: string]: string;
}

function EditEmployee() {
  const querySpecialization = useSpecialization();
  const { id: employeeId } = useParams();
  const { data } = useStaffDetails(employeeId!);
  const hook = useEditEmployee(employeeId!);
  const handleMultiSelectChange = (
    fieldName: string,
    selectedValues: string[]
  ) => {
    formik.setFieldValue(fieldName, selectedValues);
  };

  const formik = useFormik<GetEmployeeType>({
    initialValues: {
      _id: data?._id || "",
      name: data?.name || "",
      contactInfos: data?.contactInfos || [],
      dateOfBirth: data?.dateOfBirth || "",
      gender:
        data?.gender === "male" || data?.gender === "female"
          ? data?.gender
          : "female",
      identity: data?.identity || "",
      nationality: data?.nationality || "",
      image: data?.image || "",
      marital_status:
        (data?.marital_status as "" | "Single" | "Married" | "Divorced") || "",
      number_children: data?.number_children || 0,
      address: data?.address || "",
      professional_experience: data?.professional_experience || "",
      notes: data?.notes || "",
      Languages: data?.Languages || [],
      specialties: data?.specialties || [],
      certifications: data?.certifications || [],
      vacationRecords: (data?.vacationRecords || []).map((record) => ({
        startDate: record.leaveStartDate,
        endDate: record.leaveEndDate,
        reason: record.leaveType,
        status: record.status === "Approved" ? true : false,
      })),
      workingHours: data?.workingHours || [],
      breakTimes: data?.breakTimes || [],
      jobType:
        data?.jobType === "FULL_TIME" || data?.jobType === "PART_TIME"
          ? data?.jobType
          : "FULL_TIME",

      isActive: data?.isActive ?? true,
      companyId: data?.companyId || "",
      clinicCollectionId: data?.clinicCollectionId?._id || null,
      departmentId: data?.departmentId?._id || null,
      clinics:
        data?.clinics?.map((clinic) => ({
          ...clinic,
          commercialRecord: {
            ...clinic.commercialRecord,
            taxNumber: clinic.commercialRecord.taxNumber === "true",
          },
        })) || null,
      specializations: data?.specializations || [],
      createdAt: data?.createdAt || "",
      updatedAt: data?.updatedAt || "",
      __v: data?.__v || 0,
      employeeType:
        data?.employeeType === "" ||
        data?.employeeType === "Doctor" ||
        data?.employeeType === "Nurse" ||
        data?.employeeType === "Technician" ||
        data?.employeeType === "Administrative" ||
        data?.employeeType === "Employee" ||
        data?.employeeType === "Other"
          ? data?.employeeType
          : "",
      hireDate: data?.hireDate || "",
      medicalLicenseNumber: data?.medicalLicenseNumber || "",
    },
    validationSchema: EditEmployeeSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      if (values.image && typeof values.image !== "string") {
        values.image = data?.image || ""; // You can set the image URL or process it as required
      }

      // Now proceed with submitting the form data
      hook.mutate(values);
    },
  });

  // Check if specialization data is loaded
  if (!querySpecialization.isFetched || !querySpecialization.data)
    return (
      <Center>
        <Text>No Specialization Found</Text>
      </Center>
    );

  // Process specializations
  const Specializations: selectSpecializationType =
    querySpecialization.data.reduce<selectSpecializationType>((acc, item) => {
      acc[item.name] = item._id;
      return acc;
    }, {});

  // Place handleImageChange after formik initialization
  const handleImageChange = (file: File | null) => {
    formik.setFieldValue("image", file);
  };

  const primaryFields: InputPropsType[] = [
    {
      id: "name",
      label: "Name",
      mandatory: true,
      type: "text",
      description: "",
      error: formik.errors.name?.toString(),
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
      error: formik.errors.dateOfBirth?.toString(),
      placeholder: "",
      value: formik.values.dateOfBirth || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "gender",
      label: "Gender",
      mandatory: true,
      type: "radio",
      description: "",
      error: formik.errors.gender?.toString(),
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
      error: formik.errors.identity?.toString(),
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
      error: formik.errors.employeeType?.toString(),
      placeholder: "",
      tooltip: "select the Employee Type",
      value: formik.values.employeeType || "",
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
      error: formik.errors.nationality?.toString(),
      placeholder: "Select nationality",
      tooltip: "Enter your nationality",
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
      error: formik.errors.hireDate?.toString(),
      placeholder: "",
      value: formik.values.hireDate || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "marital_status",
      label: "Marital Status",
      mandatory: false,
      type: "radio",
      description: "",
      error: formik.errors.marital_status?.toString(),
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
      error: formik.errors.number_children?.toString(),
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
      error: formik.errors.address?.toString(),
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
      error: formik.errors.medicalLicenseNumber?.toString(),
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
      error: formik.errors.professional_experience?.toString(),
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
      error: formik.errors.notes?.toString(),
      placeholder: "Enter notes",
      tooltip: "Enter additional notes",
      value: formik.values.notes || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "Languages",
      label: "Languages",
      mandatory: true,
      type: "multiSelect",
      description: "",
      error: formik.errors.Languages?.toString(),
      placeholder: "Select Languages",
      tooltip: "Enter your Languages",
      value: formik.values.Languages || [],
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
      value: formik.values.specialties || [],
      onChange: (selectedKeys) => {
        if (
          Array.isArray(selectedKeys) &&
          selectedKeys.every((item) => typeof item === "string")
        ) {
          const selectedValues = selectedKeys.map(
            (key) => Specializations[key]
          );
          handleMultiSelectChange("specializations", selectedValues);
          formik.setFieldValue("specialties", selectedKeys); // Keep track of display names
        }
      },
      onBlur: formik.handleBlur,
      selectValue: Object.keys(Specializations) || [],
    },
    {
      id: "certifications",
      label: "Certifications",
      mandatory: true,
      type: "multiSelect",
      description: "",
      error: formik.errors.certifications?.toString(),
      placeholder: "Select certifications",
      tooltip: "Enter your certifications",
      value: formik.values.certifications || [],
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
      error: formik.errors.image?.toString(),
      placeholder: "",
      value: formik.values.image,
      onChangeFile: handleImageChange,
      onChange: () => {}, // Empty onChange to satisfy props
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
          fieldName="workingHours"
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
          data={formik.values.workingHours}
          onFieldChange={formik.setFieldValue}
          error={formik.errors.workingHours?.toString() || ""}
        />

        <TableSelection<VacationRecord>
          title="Vacation Records"
          fieldName="vacationRecords"
          columns={[
            { key: "startDate", label: "Leave Start Date", type: "date" },
            { key: "endDate", label: "Leave End Date", type: "date" },
            {
              key: "reason",
              label: "Reason",
              type: "text",
            },
          ]}
          data={formik.values.vacationRecords}
          onFieldChange={formik.setFieldValue}
          error={formik.errors.vacationRecords?.toString() || ""}
        />

        <TableSelection<BreakTime>
          title="Break Times"
          fieldName="breakTimes"
          columns={[
            { key: "startTime", label: "Start Time", type: "time" },
            { key: "endTime", label: "End Time", type: "time" },
          ]}
          data={formik.values.breakTimes}
          onFieldChange={formik.setFieldValue}
          error={formik.errors.breakTimes?.toString() || ""}
        />

        <Button type="submit">Submit</Button>
      </form>
    </ScrollArea>
  );
}

export default EditEmployee;
