import { Button, Checkbox, Flex, Title, Box } from "@mantine/core";
import classes from "./AuthenticationImage.module.css";
import InputPropsType from "../../../types/InputsType";
import { LoginType } from "../../../types/Login/LoginType";
import { useFormik } from "formik";
import { LoginSchema } from "../../../schema/LoginSchema";
import InputBaseCustom from "../../../Components/Inputs/InputBase";
import useLogin from "../../../hooks/auth/login";
import MainShape from "../../../assets/icons/mainShap.svg";
import loginIcon1 from "../../../assets/icons/loginIcon1.svg";
import loginIcon2 from "../../../assets/icons/loginIcon2.svg";
import loginIcon3 from "../../../assets/icons/loginIcon3.svg";
import { useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { IconLock, IconUser } from "@tabler/icons-react";

export function Login() {
  const [saveToken, setSaveToken] = useState(false);
  const loginMutation = useLogin(saveToken, false);
  const inputRef = useRef<HTMLInputElement>(null);

  const formik = useFormik<LoginType>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      loginMutation.mutate(values);
    },
  });

  // const formFields: InputPropsType[] = [
  //   {
  //     id: "email",
  //     label: "Email",
  //     mandatory: true,
  //     type: "text",
  //     description: "",
  //     error: formik.errors.email,
  //     placeholder: "your@email.com",
  //     tooltip: "Enter your email",
  //     value: formik.values.email,
  //     //@ts-expect-error-type
  //     onChange: handleEmailChange,
  //     onBlur: formik.handleBlur,
  //     autoComplete: "off",
  //   },
  //   {
  //     id: "password",
  //     label: "Password",
  //     mandatory: true,
  //     type: "password",
  //     description: "",
  //     error: formik.errors.password,
  //     placeholder: "Your password",
  //     tooltip: "Enter your password",
  //     value: formik.values.password,
  //     onChange: formik.handleChange,
  //     onBlur: formik.handleBlur,
  //     autoComplete: "current-password",
  //   },
  // ];

  const formFields: InputPropsType[] = [
    {
      id: "email",
      label: "Username",
      mandatory: true,
      type: "text",
      description: "",
      error: formik.errors.email,
      placeholder: "Enter username",
      tooltip: "Enter your username",
      value: formik.values.email,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      autoComplete: "off",
      leftIcon: <IconUser size={18} />,
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
      autoComplete: "current-password",
      leftIcon: <IconLock size={18} />,
    },
  ];

  const handleSetSaveToken = () => {
    setSaveToken((prev) => !prev);
  };

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
    <div className={classes.wrapper}>
      <Box w={"50%"} className={`${classes.centering} ${classes.leftLogin}`}>
        <img
          style={{ position: "absolute", top: "0", right: "0" }}
          src={loginIcon1}
          alt="Cliniva Logo"
          width={96}
        />
        <img
          style={{ position: "absolute", bottom: "0", right: "0" }}
          src={loginIcon2}
          alt="Cliniva Logo"
          width={96}
        />
        <img
          style={{ position: "absolute", bottom: "0", left: "0" }}
          src={loginIcon3}
          alt="Cliniva Logo"
          width={96}
        />
        <Flex gap={32} className={classes.leftLoginBox}>
          <Flex direction={"column"} align={"center"}>
            {/* <Avatar w={96} src={MainShape} /> */}
            <img src={MainShape} alt="Cliniva Logo" width={96} />

            <p className={classes.clinivaTitle}>Cliniva SYS</p>
          </Flex>
          <p
            style={{ color: "#fff", textAlign: "center" }}
            className={classes.welcomingTitle}
          >
            Welcome to Cliniva System <br /> The future of medical center <br />
            management starts here..
          </p>
        </Flex>
      </Box>
      <Box w={"50%"} className={classes.columnCentering}>
        <Flex style={{ gap: "32px", flexDirection: "column" }}>
          <Title order={2} className={classes.title}>
            Log in to Cliniva SYS
          </Title>
          <Flex
            style={{ flexDirection: "column", gap: "24px", width: "422px" }}
          >
            <div style={{ position: "relative" }} ref={inputRef}>
              <InputBaseCustom base={formFields[0]} notRight={false} />
            </div>

            <InputBaseCustom base={formFields[1]} notRight={false} />
            <Checkbox
              checked={saveToken}
              onChange={handleSetSaveToken}
              label="Remember Me"
              size="md"
              styles={{
                input: {
                  borderColor: "#69A3E9",
                  "&:checked": {
                    backgroundColor: "#69A3E9",
                    borderColor: "#69A3E9",
                  },
                },
                icon: {
                  color: "white",
                },
                label: {
                  color: "#69A3E9",
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              size="md"
              bg="#00B48D"
              c="white"
              onClick={() => {
                formik.handleSubmit();
              }}
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
          </Flex>
        </Flex>
      </Box>
    </div>
  );
}
