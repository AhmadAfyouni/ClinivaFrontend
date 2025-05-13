import InputPropsType from "../../../types/InputsType";
import { useFormik } from "formik";
import { LoginSchema } from "../../../schema/LoginSchema";
import useLogin from "../../../hooks/auth/login";
import InputBaseCustom from "../../../Components/Inputs/InputBase";
import { Box, Button, Card, Flex, useMantineTheme } from "@mantine/core";
import { LoginType } from "../../../types/Login/LoginType";
interface Props {
  nextStep: () => void;
}
export default function LoginToRegister({ nextStep }: Props) {
  const loginMutation = useLogin(false, true);
  const theme = useMantineTheme();
  if (loginMutation.isSuccess) {
    console.log("first22222");
    nextStep();
  }
  const formik = useFormik<LoginType>({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: LoginSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log("Form Submitted:", values);

      loginMutation.mutate(values);
    },
  });
  const formFields: InputPropsType[] = [
    {
      id: "email",
      label: "Email",
      mandatory: true,
      type: "text",
      description: "",
      error: formik.errors.email,
      placeholder: "your@email.com",
      tooltip: "Enter your email",
      value: formik.values.email,
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
      placeholder: "Your password",
      tooltip: "Enter your password",
      value: formik.values.password,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
  ];

  return (
    <Card
      bg={theme.other.bgSubtle}
      radius="xl"
      w={{ base: "95%", sm: "60%", md: "35%", lg: "25%" }}
      shadow="md"
    >
      <form
        onSubmit={(e) => {
          console.log("loginsubmit");
          formik.handleSubmit(e);
        }}
      >
        <Flex direction={"column"} gap={"xl"}>
          <Box>
            <InputBaseCustom base={formFields[0]} />
            <br />
            <InputBaseCustom base={formFields[1]} />
          </Box>
          <Button type="submit">Login</Button>
        </Flex>
      </form>
    </Card>
  );
}
