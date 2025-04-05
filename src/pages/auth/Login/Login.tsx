import { Anchor, Button, Checkbox, Paper, Text, Title } from "@mantine/core";
import classes from "./AuthenticationImage.module.css";
import InputPropsType from "../../../types/InputsType";
import { LoginType } from "../../../types/LoginType";
import { useFormik } from "formik";
import { LoginSchema } from "../../../schema/LoginSchema";
import InputBaseCustom from "../../../Components/Inputs/InputBase";
import useLogin from "../../../hooks/auth/login";
import LoaderCustom from "../../../Components/Loader";
export function Login() {
  const loginMutation = useLogin();

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
      type: "text",
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
    <form
      onSubmit={(e) => {
        console.log("loginsubmit");
        formik.handleSubmit(e);
      }}
      className={classes.wrapper}
    >
      {loginMutation.isPending && <LoaderCustom />}
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to Clivien !|
        </Title>

        <InputBaseCustom base={formFields[0]} />
        <br />
        <InputBaseCustom base={formFields[1]} />

        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button
          type="submit"
          fullWidth
          mt="xl"
          size="md"
          bg="#9BDABB"
          c="white"
          styles={{
            root: {
              "&:hover": {
                backgroundColor: "#7BC8A3",
              },
            },
          }}
        >
          Login
        </Button>

        <Text ta="center" mt="md">
          forget your password?{" "}
          <Anchor<"a">
            href="#"
            fw={700}
            c="#9BDABB"
            onClick={(event) => event.preventDefault()}
          >
            Reset Password
          </Anchor>
        </Text>
      </Paper>
    </form>
  );
}
