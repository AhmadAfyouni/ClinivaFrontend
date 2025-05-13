import { useFormik } from "formik";
import AddUserSchema from "../../schema/User/AddUser";
import InputPropsType from "../../types/InputsType";
import InputForm from "../../Components/Inputs/InputForm";
import { Button, Center, ScrollArea, Text } from "@mantine/core";
import useRoles from "../../hooks/Role/useRoles";
import AddUserType from "../../types/users/AddUser";
import useStaffListWithoutUser from "../../hooks/staff/useStaffListWithoutUser";
import { useNavigate } from "react-router";
import useAddEntity from "../../hooks/add/useAddEntity";
interface selectRoleType {
  [key: string]: string;
}
function AddUser() {
  const employeeHook = useStaffListWithoutUser(true);
  // const addHook = useAddUser();
  const addHook = useAddEntity({
    mutationKey: "AddUser",
    navigationUrl: "users",
    postUrl: "users",
  });
  const navigate = useNavigate();
  const formik = useFormik<AddUserType>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      isActive: true,
      roleIds: "",
      employeeId: "",
    },
    validationSchema: AddUserSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
      addHook.mutate(values);
      if (addHook.isSuccess) {
        formik.resetForm();
        navigate(`/users`);
      }
    },
  });
  const roleHook = useRoles(0, 0, true);

  if (!roleHook.data || !employeeHook.data) return <>No Roles</>;

  const roles: selectRoleType = roleHook.data.reduce<selectRoleType>(
    (acc, item) => {
      acc[item.name] = item._id;
      return acc;
    },
    {}
  );

  const employees: selectRoleType = employeeHook.data.reduce<selectRoleType>(
    (acc, item) => {
      acc[item.publicId] = item._id;
      return acc;
    },
    {}
  );
  console.log("employee " + employeeHook.data);
  console.log(formik.errors);
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
    // {
    //   id: "employeeId",
    //   label: "Employee ID",
    //   mandatory: true,
    //   type: "select",
    //   description: "",
    //   error: formik.errors.employeeId,
    //   placeholder: "",
    //   tooltip: "Enter the employee ID",
    //   selectValue: Object.keys(employees),
    //   onChange: (selectedKeys) => {
    //     formik.setFieldValue("employeeId", employees[selectedKeys as string]);
    //   },
    //   onBlur: formik.handleBlur,
    // },
    {
      id: "employeeId",
      label: "Employee ID",
      mandatory: true,
      type: "select",
      description: "",
      error: formik.errors.employeeId,
      placeholder: "",
      tooltip: "Enter the employee ID",
      value:
        Object.keys(employees).find(
          (key) => employees[key] === formik.values.employeeId
        ) || "",
      onChange: (selectedKey) => {
        formik.setFieldValue("employeeId", employees[selectedKey as string]);
      },
      selectValue: Object.keys(employees),
      onBlur: formik.handleBlur,
    },
    // {
    //   id: "isActive",
    //   label: "Is Active",
    //   mandatory: true,
    //   type: "radio",
    //   radio: [
    //     { label: "Yes", value: "true" },
    //     { label: "No", value: "false" },
    //   ],
    //   description: "",
    //   error: formik.errors.isActive,
    //   placeholder: "",
    //   tooltip: "Choose if user will be active",
    //   value: formik.values.isActive ? "true" : "false",
    //   onChange: formik.handleChange,
    //   onBlur: formik.handleBlur,
    // },
    {
      id: "roleIds",
      label: "Role",
      mandatory: true,
      type: "select",
      description: "",
      error: formik.errors.roleIds?.toString(),
      placeholder: "",
      tooltip: "Choose roles for user",
      value:
        Object.keys(roles).find(
          (key) => roles[key] === formik.values.roleIds
        ) || "",
      onChange: (selectedKey) => {
        formik.setFieldValue("roleIds", roles[selectedKey as string]);
      },
      selectValue: Object.keys(roles) || [""],
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
          // title="Add User"
        />
        <Button type="submit">Submit</Button>
        <Center>
          {" "}
          <Text c={"red"}> {addHook.error?.message}</Text>
        </Center>
      </form>
    </ScrollArea>
  );
}

export default AddUser;
