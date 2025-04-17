import { Box, Button, Flex } from "@mantine/core";
import CustomStepper from "../../../Components/Stepper/CustomStepper";
import AddCompany from "../../Company/AddCompany";
import { useEffect, useState } from "react";
import LoginToRegister from "./LoginToRegister";
import AddClinicCollection from "../../ClinicCollection/AddClinicCollection";
import AddDepartment from "../../Department/AddDepartment";
import AddClinic from "../../Clinic/AddClinic";

function Register() {
  const plan = localStorage.getItem("plan");
  const selectedPlan = plan ? Number(plan) : 1;

  const [step, setStep] = useState(1);

  useEffect(() => {}, [step]);
  const steps = [
    {
      step: 1,
      label: "initialization",
      description: "Login as Admin",
      skip: false,
      skipDescription: "Skipping Create Company",
    },
    {
      step: 2,
      label: "Step1",
      description: "Create Company",
      skip: !(selectedPlan <= 2),
      skipDescription: "Skipping Create Company",
    },
    {
      step: 3,
      label: "Step2",
      description: "Create Medical Complex",
      skip: !(selectedPlan <= 3),
      skipDescription: "Skipping Create Medical Complex",
    },
    {
      step: 4,
      label: "Step3",
      description: "Create Department",
      skip: !(selectedPlan <= 4),
      skipDescription: "Skipping Create Department",
    },
    {
      step: 5,
      label: "Step4",
      description: "Create Clinic",
      skip: false,
      skipDescription: "Skipping Create Clinic",
    },
  ];
  const handleNextStep = () => {
    setStep(step + 1);
  };
  const handlePrevStep = () => {
    setStep(step - 1);
  };
  return (
    <Box w={"100%"} h={"90%"}>
      <Flex
        align={"center"}
        direction={"column"}
        w={"100%"}
        pt={"xl"}
        px={"xl"}
        justify={"flex-start"}
        gap={"xl"}
        h={"100%"}
      >
        <Box w={"100%"}>
          <CustomStepper steps={steps} step_active={step} />
        </Box>

        {step === 1 ? (
          <LoginToRegister
            nextStep={() => {
              setStep(selectedPlan);
            }}
          />
        ) : step === 2 ? (
          <AddCompany />
        ) : step === 3 ? (
          <AddClinicCollection />
        ) : step === 4 ? (
          <AddDepartment />
        ) : (
          <AddClinic />
        )}
      </Flex>
      <Flex justify={"flex-end"} gap={"lg"} px={"lg"} pt={"lg"}>
        <Button
          disabled={step === 2 || step - 1 < selectedPlan}
          onClick={handlePrevStep}
        >
          Prev
        </Button>

        <Button
          disabled={step <= 2 || step === steps.length}
          onClick={handleNextStep}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
}

export default Register;
