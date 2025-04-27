import { useFormik } from "formik";
import InputForm from "../../Components/Inputs/InputForm";
import InputPropsType from "../../types/InputsType";
import { Box, Button, ScrollArea } from "@mantine/core";
import TableSelection from "../../Components/Inputs/table/TableSelection";
import { ContactInfoType } from "../../types/GeneralAdd";
import AddDepartmentType from "../../types/department/AddDepartment";
import AddDepartmentSchema from "../../schema/department/AddDepartment";
import useAddDepartment from "../../hooks/departement/useDepartement";

function AddDepartment() {
  const hook = useAddDepartment();

  const formik = useFormik<AddDepartmentType>({
    initialValues: {
      name: "",
      introduction: "",
      yearOfEstablishment: "",
      address: "",
      logo: "",
      vision: "",
      details: "",
      contactInfos: [],
      clinicCollectionId: "67e50d4e191e5b9428a74741",
    },
    validationSchema: AddDepartmentSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      hook.mutate(values);
      console.log("Department Submitted:", values);
      // Add your API call here
    },
  });

  const primaryFields: InputPropsType[] = [
    {
      id: "name",
      label: "Department Name",
      mandatory: true,
      type: "text",
      error: formik.errors.name,
      placeholder: "Enter department name",
      tooltip: "Enter the name of the department",
      value: formik.values.name || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "introduction",
      label: "Introduction",
      mandatory: true,
      type: "text",
      error: formik.errors.introduction,
      placeholder: "Enter introduction",
      tooltip: "Enter a brief introduction of the department",
      value: formik.values.introduction || "",
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
      tooltip: "Select the date when the department was established",
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
      tooltip: "Enter the department's address",
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
      tooltip: "Enter the department's vision",
      value: formik.values.vision || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },

    {
      id: "details",
      label: "Details",
      mandatory: true,
      type: "text",
      error: formik.errors.details,
      placeholder: "Enter details",
      tooltip: "Enter detailed information about the department",
      value: formik.values.details || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "logo",
      label: "",
      mandatory: true,
      type: "image",
      error: formik.errors.logo,
      placeholder: "Enter logo URL",
      tooltip: "Enter the URL for the department's logo",
      value: formik.values.logo || "",
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

        <Button type="submit" mt="md" w="30%" mb="110px">
          Submit
        </Button>
      </form>
    </ScrollArea>
  );
}

export default AddDepartment;
