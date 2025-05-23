import { useFormik } from "formik";
import AddUserSchema from "../../schema/User/AddUser";
import InputPropsType from "../../types/InputsType";
import InputForm from "../../Components/Inputs/InputForm";
import { Button, Center, Flex, ScrollArea, Text,Tabs, InputBase } from "@mantine/core";
import useRoles from "../../hooks/Role/useRoles";
import AddUserType from "../../types/users/AddUser";
import useStaffListWithoutUser from "../../hooks/staff/useStaffListWithoutUser";
import { useNavigate } from "react-router";
import useAddEntity from "../../hooks/add/useAddEntity";
import arrow from "../../assets/icons/ArrowLeft.svg";
import arrowLeft from "../../assets/icons/VectorArrow.svg";
import arrowRight from "../../assets/icons/VectorRight.svg";
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
      acc[item.publicId + " - (" + item.employeeType + "): " + item.name] =
        item._id;
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
      label: "User Name",
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
      id: "confirmPassword",
      label: "Confirm Password",
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
        {
      id: "userType",
      label: "User Type",
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
        {
      id: "userType",
      label: "Medical Complex",
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
        {
      id: "userType",
      label: " Clinic",
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

  ];
  return (
    <ScrollArea h="calc(100vh - 80px)" w="100%">
      <form onSubmit={formik.handleSubmit} style={{width:"100%", display: "flex", flexDirection :"column"}}>
        <div style={{display:"flex", alignItems: "center", marginTop: "20px"}}>
        <img src={arrow} alt="arrow-left" />
        <Text fz={12} style={{fontWeight :"400", lineHeight :"130%", color: "#717680", marginLeft:"5px"}}>Back to Users</Text>
        </div>
        <Text fz={22} style={{fontWeight :"600", lineHeight :"115.99999999999999%", marginTop:"10px"}}>Add New User</Text>
        <Flex w={"98%"} h={"78px"}>
            {/* <Button bg={"#fff"} c={"#333"}>Account information</Button>
            <Button bg={"#fff"} c={"#333"}>Personal information</Button>
            <Button bg={"#fff"} c={"#333"}>Employment information</Button>
            <Button bg={"#fff"} c={"#333"}>Documents</Button> */}
<Tabs
  defaultValue="account"
  unstyled
  w={"100%"}
  mt={"30px"}
  classNames={{
    list: 'custom-tabs-list',
    tab: 'custom-tab',
    panel: 'custom-tab-panel',
  }}
>
  <Tabs.List>
    <Tabs.Tab value="account">Account Information</Tabs.Tab>
    <Tabs.Tab value="personal">Personal Information</Tabs.Tab>
    <Tabs.Tab value="employment">Employment Information</Tabs.Tab>
    <Tabs.Tab value="documents">Documents</Tabs.Tab>
  </Tabs.List>

  <Tabs.Panel value="account">
           <InputForm
          base={primaryFields}
          count={0}
          onSubmit={() => {}}
          with_submit={false}
          key={"AddUser"}
          // title="Add User"
        />
        <Flex justify={"flex-end"} mr={"40px"} gap={"15px"} mb={"20px"}>
          <Button w="225.5px" h="44px" type="submit"style={{
                padding: "10px 18px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #D5D7DA",
                borderRadius: "50px",
                boxShadow: "0px 2px 4px #0A0D120D",
                textAlign: "center",
                color: "#333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}>Cancel</Button>
            <Button
              type="submit"
              w="225.5px"
              h="44px"
              style={{
                padding: "10px 18px",
                backgroundColor: "#00B48D",
                border: "1px solid #00B48D",
                borderRadius: "50px",
                boxShadow: "0px 2px 4px rgba(10, 13, 18, 0.05)",
                textAlign: "center",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              Next
              <img src={arrowLeft} alt="arrow-left" style={{marginLeft: "10px"}}/>
            </Button>
        </Flex>
  </Tabs.Panel>

  <Tabs.Panel value="personal">
               <InputForm
          base={primaryFields}
          count={0}
          onSubmit={() => {}}
          with_submit={false}
          key={"AddUser"}
          // title="Add User"
        />
           <Flex justify={"flex-end"} mr={"40px"} gap={"15px"} mb={"20px"}>
          <Button w="160.5px" h="44px" type="submit"style={{
                padding: "10px 18px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #D5D7DA",
                borderRadius: "50px",
                boxShadow: "0px 2px 4px #0A0D120D",
                textAlign: "center",
                color: "#333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}>Cancel</Button>
            <Button
              type="submit"
              w="160.5px"
              h="44px"
style={{
                padding: "10px 18px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #D5D7DA",
                borderRadius: "50px",
                boxShadow: "0px 2px 4px #0A0D120D",
                textAlign: "center",
                color: "#333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <img src={arrowRight} alt="arrow-left" style={{marginRight: "10px"}}/>
              Previous
            </Button>
            <Button
              type="submit"
              w="160.5px"
              h="44px"
              style={{
                padding: "10px 18px",
                backgroundColor: "#00B48D",
                border: "1px solid #00B48D",
                borderRadius: "50px",
                boxShadow: "0px 2px 4px rgba(10, 13, 18, 0.05)",
                textAlign: "center",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              Next
              <img src={arrowLeft} alt="arrow-left" style={{marginLeft: "10px"}}/>
            </Button>
        </Flex>
  </Tabs.Panel>

  <Tabs.Panel value="employment">
    <Flex w={"100%"} h={"100%"} justify={"space-between"} mt={"20px"} mb={"50px"}>
      <Flex w={"100%"} justify={"space-around"} align={"center"}>
        <text>Job Title*</text>
        <InputBase  w={"30%"} placeholder="Enter Job Title"/>
        <text>Job Title*</text>
        <InputBase w={"252px"} placeholder="Select date"/>
      </Flex>
    </Flex>
               <Flex justify={"flex-end"} mr={"40px"} gap={"15px"} mb={"20px"}>
          <Button w="160.5px" h="44px" type="submit"style={{
                padding: "10px 18px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #D5D7DA",
                borderRadius: "50px",
                boxShadow: "0px 2px 4px #0A0D120D",
                textAlign: "center",
                color: "#333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}>Cancel</Button>
            <Button
              type="submit"
              w="160.5px"
              h="44px"
style={{
                padding: "10px 18px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #D5D7DA",
                borderRadius: "50px",
                boxShadow: "0px 2px 4px #0A0D120D",
                textAlign: "center",
                color: "#333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <img src={arrowRight} alt="arrow-left" style={{marginRight: "10px"}}/>
              Previous
            </Button>
            <Button
              type="submit"
              w="160.5px"
              h="44px"
              style={{
                padding: "10px 18px",
                backgroundColor: "#00B48D",
                border: "1px solid #00B48D",
                borderRadius: "50px",
                boxShadow: "0px 2px 4px rgba(10, 13, 18, 0.05)",
                textAlign: "center",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              Next
              <img src={arrowLeft} alt="arrow-left" style={{marginLeft: "10px"}}/>
            </Button>
        </Flex>
  </Tabs.Panel>

  <Tabs.Panel value="documents">
               <Flex justify={"flex-end"} mr={"40px"} gap={"15px"} mb={"20px"}>
          <Button w="225.5px" h="44px" type="submit"style={{
                padding: "10px 18px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #D5D7DA",
                borderRadius: "50px",
                boxShadow: "0px 2px 4px #0A0D120D",
                textAlign: "center",
                color: "#333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}>Cancel</Button>
            <Button
              type="submit"
              w="225.5px"
              h="44px"
              style={{
                padding: "10px 18px",
                backgroundColor: "#00B48D",
                border: "1px solid #00B48D",
                borderRadius: "50px",
                boxShadow: "0px 2px 4px rgba(10, 13, 18, 0.05)",
                textAlign: "center",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              Save
            </Button>
        </Flex>
  </Tabs.Panel>
</Tabs>
        </Flex>

        <Center>

          <Text c={"red"}> {addHook.error?.message}</Text>
        </Center>
      </form>
    </ScrollArea>
  );
}

export default AddUser;
