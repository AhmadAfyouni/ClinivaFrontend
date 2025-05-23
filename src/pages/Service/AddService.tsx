import { useFormik } from "formik";
import InputPropsType from "../../types/InputsType";
import InputForm from "../../Components/Inputs/InputForm";
import { Button, ScrollArea } from "@mantine/core";
import AddServiceType from "../../types/serviceT/AddServiceType";
import AddServiceSchema from "../../schema/service/AddServiceSchema";
import useAddService from "../../hooks/serviceH/useAddService";
import useClinics from "../../hooks/clinic/useClinics";
import useDoctors from "../../hooks/doctor/useDoctors";
function AddService() {
  interface selectClinicsType {
    [key: string]: string;
  }
  interface selectDoctorsType {
    [key: string]: string;
  }
  const hook = useAddService();
  const formik = useFormik<AddServiceType>({
    initialValues: {
      name: "",
      description: "",
      price: null,
      isActive: true,
      clinic: "",
      doctors: [],
    },
    validationSchema: AddServiceSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log("values " + values);
      hook.mutate(values);
      formik.resetForm();
      console.log("Form Submitted:", values);
    },
  });
  const clinicsHook = useClinics(0, 0, true);

  const doctorsHook = useDoctors(0, 0, true);

  if (!clinicsHook.isFetched || !clinicsHook.data) return <>No Clinics</>;

  const Clinics: selectClinicsType = clinicsHook.data.reduce<selectClinicsType>(
    (acc, item) => {
      acc[item.name] = item._id;
      return acc;
    },
    {}
  );

  if (!doctorsHook.isFetched || !doctorsHook.data) return <>No Doctors</>;

  const Doctors: selectDoctorsType = doctorsHook.data.reduce<selectDoctorsType>(
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
    Clinics: Record<string, string>,
    selectedIds: string[] | undefined
  ): string[] {
    if (!selectedIds) return [];
    const keys = Object.entries(Clinics)
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
      id: "price",
      label: "Price",
      mandatory: true,
      type: "number",
      description: "",
      error: formik.errors.price,
      placeholder: "",
      tooltip: "Enter the Price",
      value: formik.values.price || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "clinicId",
      label: "Clinic",
      mandatory: true,
      type: "select",
      description: "",
      error: formik.errors.clinic?.toString(),
      placeholder: "",
      tooltip: "Choose Clinic",
      value:
        Object.keys(Clinics).find(
          (key) => Clinics[key] === formik.values.clinic
        ) || "",
      onChange: (selectedKey) => {
        if (typeof selectedKey === "string") {
          const selectedValue = Clinics[selectedKey];
          formik.setFieldValue("clinic", selectedValue);
        } else {
          console.error("selectedKey is not a valid string");
        }
      },
      onBlur: formik.handleBlur,
      selectValue: Object.keys(Clinics) || [],
    },
    // {
    //   id: "clinicsId",
    //   label: "Clinics ",
    //   mandatory: true,
    //   type: "multiSelect",
    //   description: "",
    //   error: formik.errors.clinics?.toString(),
    //   placeholder: "",
    //   tooltip: "Choose Clinics",
    //   value: getNamesByIds(Clinics, formik.values.clinics),
    //   onChange: (selectedKeys) => {
    //     if (
    //       Array.isArray(selectedKeys) &&
    //       selectedKeys.every((item) => typeof item === "string")
    //     ) {
    //       const selectedValues = selectedKeys.map((key) => Clinics[key]);
    //       console.log(selectedValues);
    //       handleMultiSelectChange("clinics", selectedValues);
    //     } else {
    //       console.error("selectedKeys is not a valid array of strings");
    //     }
    //   },
    //   onBlur: formik.handleBlur,
    //   selectValue: Object.keys(Clinics) || [],
    // },

    {
      id: "doctorsId",
      label: "Doctors ",
      mandatory: true,
      type: "multiSelect",
      description: "",
      error: formik.errors.doctors?.toString(),
      placeholder: "",
      tooltip: "Choose Doctors",
      value: getNamesByIds(Doctors, formik.values.doctors),

      onChange: (selectedKeys) => {
        if (
          Array.isArray(selectedKeys) &&
          selectedKeys.every((item) => typeof item === "string")
        ) {
          const selectedValues = selectedKeys.map((key) => Doctors[key]);
          console.log(selectedValues);
          handleMultiSelectChange("doctors", selectedValues);
        } else {
          console.error("selectedKeys is not a valid array of strings");
        }
      },
      onBlur: formik.handleBlur,
      selectValue: Object.keys(Doctors) || [],
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
          key={"AddService"}
          title="Add Service"
        />
        <Button type="submit">Add Service</Button>
      </form>
    </ScrollArea>
  );
}

export default AddService;
