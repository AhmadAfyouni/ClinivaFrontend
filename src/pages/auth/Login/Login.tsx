import {
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
import { useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export function Login() {
  const navigate = useNavigate();
  const [saveToken, setSaveToken] = useState(false);
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
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
      loginMutation.mutate(values, {
        onSuccess: () => {
          const storedEmails = JSON.parse(localStorage.getItem("usedEmails") || "[]");
          if (!storedEmails.includes(values.email)) {
            storedEmails.push(values.email);
            localStorage.setItem("usedEmails", JSON.stringify(storedEmails));
          }
        },
      });
    },
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    const typedEmail = e.target.value;
    const storedEmails: string[] = JSON.parse(localStorage.getItem("usedEmails") || "[]");
    const filtered = storedEmails.filter((email) =>
      email.toLowerCase().startsWith(typedEmail.toLowerCase())
    );
    setEmailSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleEmailSelect = (email: string) => {
    formik.setFieldValue("email", email);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      //@ts-expect-error-type
      onChange: handleEmailChange,
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
      autoComplete:"current-password"
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
    <form
      onSubmit={(e) => {
        formik.handleSubmit(e);
      }}
      className={classes.wrapper}
    >
      <Paper className={classes.form} radius={0} p={30} h={"100%"}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to Cliniva !
        </Title>

        {/* Email input with dropdown */}
        <div style={{ position: "relative" }} ref={inputRef}>
          <InputBaseCustom base={formFields[0]} />
          {showSuggestions && emailSuggestions.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "white",
                border: "1px solid #ccc",
                borderRadius: 4,
                zIndex: 10,
                maxHeight: "150px",
                overflowY: "auto",
              }}
            >
              {emailSuggestions.map((email, index) => (
                <div
                  key={index}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                  onClick={() => handleEmailSelect(email)}
                >
                  {email}
                </div>
              ))}
            </div>
          )}
        </div>

        <br />
        <InputBaseCustom base={formFields[1]} />
        <Checkbox
          checked={saveToken}
          onChange={handleSetSaveToken}
          label="Remember Me"
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
