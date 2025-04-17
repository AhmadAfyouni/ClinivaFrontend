import { useFormik } from "formik";
import AddUserSchema from "../../schema/User/AddUser";
import InputPropsType from "../../types/InputsType";
import InputForm from "../../Components/Inputs/InputForm";
import { Button, ScrollArea } from "@mantine/core";
import useRoles from "../../hooks/Role/useRoles";
import AddUserType from "../../types/user/AddUser";
interface selectRoleType {
  [key: string]: string;
}
function AddUser() {
  const formik = useFormik<AddUserType>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      isActive: false,
      roleIds: "",
      clinicCollectionId: "",
      employeeId: "",
    },
    validationSchema: AddUserSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      //   formik.resetForm();
      console.log("Form Submitted:", values);
    },
  });
  const roleHook = useRoles(0, 0, true);

  if (!roleHook.isFetched || !roleHook.data) return <>No Roles</>;

  const roles: selectRoleType = roleHook.data.reduce<selectRoleType>(
    (acc, item) => {
      acc[item.name] = item._id;
      return acc;
    },
    {}
  );
  console.log(roles);
  // const handleMultiSelectChange = (
  //   fieldName: string,
  //   selectedValues: string[]
  // ) => {
  //   // console.log("@#@#@#@#");
  //   console.log(selectedValues);
  //   formik.setFieldValue(fieldName, selectedValues);
  // };
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
      id: "email",
      label: "Email",
      mandatory: true,
      type: "text",
      description: "",
      error: formik.errors.email,
      placeholder: "John@Doe.com",
      tooltip: "Enter the email",
      value: formik.values.email || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "password",
      label: "Password",
      mandatory: true,
      type: "password",
      description: "",
      error: formik.errors.password,
      placeholder: "",
      tooltip: "Enter the password",
      value: formik.values.password || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "isActive",
      label: "Is Active",
      mandatory: true,
      type: "radio",
      radio: [
        { label: "Yes", value: "true" },
        { label: "No", value: "false" },
      ],
      description: "",
      error: formik.errors.isActive,
      placeholder: "",
      tooltip: "Choose if user will be active",
      value: formik.values.isActive ? "true" : "false",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "roleIds",
      label: "Role",
      mandatory: true,
      type: "select",

      description: "",
      error: formik.errors.roleIds?.toString(),
      placeholder: "",
      tooltip: "Choose roles for user",
      value: formik.values.roleIds,
      onChange: (selectedKeys) => {
        formik.setFieldValue("roleIds", roles[selectedKeys as string]);
      },
      selectValue: Object.keys(roles) || [""],
      onBlur: formik.handleBlur,
    },
    {
      id: "clinicCollectionId",
      label: "Clinic Collection",
      mandatory: true,
      type: "select",

      description: "",
      error: formik.errors.clinicCollectionId,
      placeholder: "",
      tooltip: "Choose Clinic CollectionId for user",
      value: formik.values.clinicCollectionId,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
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
          key={"AddUser"}
          title="Add User"
        />
        <Button type="submit">Submit</Button>
      </form>
    </ScrollArea>
  );
}

export default AddUser;
