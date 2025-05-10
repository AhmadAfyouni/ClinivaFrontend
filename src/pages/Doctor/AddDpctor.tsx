import { useFormik } from "formik";
import AddEmployeeType, {
  VacationRecordsType,
} from "../../types/Employee/AddEmployeeType";
import AddEmployeeSchema from "../../schema/Employee/AddEmployeeSchema";
import InputForm from "../../Components/Inputs/InputForm";
import InputPropsType from "../../types/InputsType";
import { Button, ScrollArea } from "@mantine/core";
import { country } from "../../data/country";
import TableSelection from "../../Components/Inputs/table/TableSelection";
import useAddUser from "../../hooks/users/useAddUser";
import { WorkingHoursType } from "../../types/GeneralAdd";

function AddDoctor() {
  const handleImageChange = (file: File | null) => {
    formik.setFieldValue("image", file);
  };
  const hook = useAddUser();

  const formik = useFormik<AddEmployeeType>({
    initialValues: {
      name: "",
      dateOfBirth: "",
      gender: "",
      identity: "",
      nationality: "",
      image: "",
      marital_status: "",
      number_children: 0,
      notes: "",
      address: "",
      professional_experience: "",
      Languages: [],
      workingHours: [],
      employeeType: "Doctor",
      contactInfos: [],
      vacationRecords: [],
      hireDate: "",
      medicalLicenseNumber: "",
      certifications: [],
      jobType: "FULL_TIME",
      breakTimes: [],
      isActive: false,
      clinics: [],
      specializations: [],
      companyId: "",
      clinicCollectionId: "",
      departmentId: "",
    },
    validationSchema: AddEmployeeSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      hook.mutate(values);
      // formik.resetForm();
      console.log("Form Submitted:", values);
    },
  });

  console.log(formik.errors);
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
      tooltip: "Enter your identity",
      value: formik.values.identity || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
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
      // value: formik.values.nationality || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      selectValue: country,
    },

    {
      id: "marital_status",
      label: "Marital Status",
      mandatory: true,
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
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      selectValue: ["English", "French", "Spanish", "German", "Italian"],
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

        <TableSelection<{ name: string }>
          title="Specialties"
          fieldName="specialties"
          columns={[{ key: "name", label: "Specialty", type: "text" }]}
          data={formik.values.specializations?.map((s) => ({ name: s })) || []}
          onFieldChange={(field, value) => {
            formik.setFieldValue(
              field,
              value.map((v) => v.name)
            );
          }}
          error={""}
        />

        <TableSelection<WorkingHoursType>
          title="Working Hours"
          fieldName="workingHours"
          columns={[
            {
              key: "day",
              label: "Day",
              type: "select",
              options: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
            },
            { key: "timeSlots.0.startTime", label: "Start Time", type: "time" },
            { key: "timeSlots.0.endTime", label: "End Time", type: "time" },
          ]}
          data={formik.values.workingHours}
          onFieldChange={formik.setFieldValue}
          error={""}
        />

        <TableSelection<VacationRecordsType>
          title="Vacation Records"
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
          fieldName="vacationRecords"
          onFieldChange={formik.setFieldValue}
          key={"vacationRecords"}
          data={formik.values.vacationRecords}
          error={formik.errors.vacationRecords?.toString() || ""}
        />

        <Button type="submit">Submit</Button>
      </form>
    </ScrollArea>
  );
}

export default AddDoctor;
