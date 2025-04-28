import { useFormik } from "formik";
import InputPropsType from "../../types/InputsType";
import InputForm from "../../Components/Inputs/InputForm";
import { Button, ScrollArea } from "@mantine/core";
import AddSpecialityType from "../../types/Specialization/AddSpecialityType";
import useStaff from "../../hooks/staff/useStaff";
import useAddSpeciality from "../../hooks/Specialization/useAddSpeciality";
import AddSpecialitySchema from "../../schema/speciality/AddSpecialitySchema";
function AddSpeciality() {
  interface selectStaffType {
    [key: string]: string;
  }
  const hook = useAddSpeciality();
  const formik = useFormik<AddSpecialityType>({
    initialValues: {
      name: "",
      description: "",
      certificationRequirements: "",
      medicalProcedures: "",
      requiredEquipment: "",
      requiredStaff: [],
      isActive: true,
    },
    validationSchema: AddSpecialitySchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log("values " + values);
      hook.mutate(values);
      formik.resetForm();
      console.log("Form Submitted:", values);
    },
  });

  const staffHook = useStaff(0, 0, true);

  if (!staffHook.isFetched || !staffHook.data) return <>No Staff</>;

  const Staff: selectStaffType = staffHook.data.reduce<selectStaffType>(
    (acc, item) => {
      acc[item.name] = item._id;
      return acc;
    },
    {}
  );
  const handleMultiSelectChange = (
    fieldName: string,
    selectedValues: string[]
  ) => {
    console.log(selectedValues);
    formik.setFieldValue(fieldName, selectedValues);
  };
  function getNamesByIds(
    Staf: Record<string, string>,
    selectedIds: string[] | undefined
  ): string[] {
    if (!selectedIds) return [];
    const keys = Object.entries(Staf)
      .filter(([, id]) => selectedIds.includes(id))
      .map(([name]) => name);
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
      placeholder: "",
      tooltip: "Enter the name",
      value: formik.values.name || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "description",
      label: "Description",
      mandatory: true,
      type: "areaText",
      description: "",
      error: formik.errors.description,
      placeholder: "",
      tooltip: "Enter the description",
      value: formik.values.description || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "requiredEquipment",
      label: "Equipment",
      mandatory: true,
      type: "text",
      description: "",
      error: formik.errors.requiredEquipment,
      placeholder: "",
      tooltip: "Enter the Equipment",
      value: formik.values.requiredEquipment || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },

    {
      id: "requiredStaffId",
      label: "Staff",
      mandatory: true,
      type: "multiSelect",
      description: "",
      error: formik.errors.requiredStaff?.toString(),
      placeholder: "",
      tooltip: "Choose staff",
      value: getNamesByIds(Staff, formik.values.requiredStaff),

      onChange: (selectedKeys) => {
        if (
          Array.isArray(selectedKeys) &&
          selectedKeys.every((item) => typeof item === "string")
        ) {
          const selectedValues = selectedKeys.map((key) => Staff[key]);
          console.log(selectedValues);
          handleMultiSelectChange("requiredStaff", selectedValues);
        } else {
          console.error("selectedKeys is not a valid array of strings");
        }
      },
      onBlur: formik.handleBlur,
      selectValue: Object.keys(Staff) || [],
    },
    {
      id: "medicalProcedures",
      label: "Medical procedures",
      mandatory: true,
      type: "areaText",
      description: "",
      error: formik.errors.medicalProcedures,
      placeholder: "",
      tooltip: "Enter the Medical procedures",
      value: formik.values.medicalProcedures || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "certificationRequirements",
      label: "Certification",
      mandatory: true,
      type: "areaText",
      description: "",
      error: formik.errors.certificationRequirements,
      placeholder: "",
      tooltip: "Enter the Certification",
      value: formik.values.certificationRequirements || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
  ];
  console.log(formik.errors);
  return (
    <ScrollArea h="calc(100vh - 80px)" w="100%">
      <form onSubmit={formik.handleSubmit}>
        <InputForm
          base={primaryFields}
          count={0}
          onSubmit={() => {}}
          with_submit={false}
          key={"addSpeciality"}
          title="Add Speciality"
        />
        <Button type="submit">Add Speciality</Button>
      </form>
    </ScrollArea>
  );
}

export default AddSpeciality;
