import {
  // Anchor,
  Button,
  Checkbox,
  Flex,
  Paper,
  Title,
} from "@mantine/core";
import classes from "./AuthenticationImage.module.css";
import InputPropsType from "../../../types/InputsType";
import { LoginType } from "../../../types/Login/LoginType";
import { useFormik } from "formik";
import { LoginSchema } from "../../../schema/LoginSchema";
import InputBaseCustom from "../../../Components/Inputs/InputBase";
import useLogin from "../../../hooks/auth/login";
import { IconArrowRight } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export function Login() {
  const navigate = useNavigate();
  const [saveToken, setSaveToken] = useState(false);
  const loginMutation = useLogin(saveToken, false);
  console.log("permission " + loginMutation.data?.data.user.permissions);
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

  console.log("email " + formik.values.email);
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
      autoComplete: "off",
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
      autoComplete: "new-password",
    },
  ];
  const handleSetSaveToken = () => {
    setSaveToken((prev) => !prev);
  };

  // Inside your component
  useEffect(() => {
    if (loginMutation.isError) {
      const errorMessage =
        (
          loginMutation.error as AxiosError<{
            message: { message: string };
          }>
        )?.response?.data?.message?.message ||
        "Login failed. Please try again.";

      toast.error(errorMessage, {
        duration: 2000,
        position: "bottom-center",
      });
    }
  }, [loginMutation.isError, loginMutation.error]);

  return (
    <form
      onSubmit={(e) => {
        console.log("loginsubmit");
        formik.handleSubmit(e);
      }}
      className={classes.wrapper}
    >
      <Paper className={classes.form} radius={0} p={30} h={"100%"}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to Cliniva !
        </Title>
        <InputBaseCustom base={formFields[0]} />
        <br />
        <InputBaseCustom base={formFields[1]} />
        <Checkbox
          checked={saveToken}
          onChange={handleSetSaveToken}
          label="Keep me logged in"
          mt="xl"
          size="md"
        />
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
        {/* {loginMutation.isError && (
          <Text c="red" mt="md" ta="center">
            {(
              loginMutation.error as AxiosError<{
                message: { message: string };
              }>
            )?.response?.data?.message?.message ||
              "Login failed. Please try again."}
          </Text>
        )} */}
        {/* <Text ta="center" mt="md">
          forget your password?{" "}
          <Anchor<"a">
            href="#"
            fw={700}
            c="#9BDABB"
            onClick={(event) => event.preventDefault()}
          >
            Reset Password
          </Anchor>
        </Text> */}
        <Flex justify={"center"} w="100%" h={"100%"} mt={"xl"}>
          <Button
            variant="filled"
            h={"3rem"}
            size="1.5rem"
            style={{ borderRadius: "0 1rem 0 1rem" }}
            rightSection={<IconArrowRight size={"40"} />}
            onClick={() => {
              navigate("/SelectPlan");
            }}
          >
            Get Started
          </Button>
        </Flex>
      </Paper>
    </form>
  );
}
