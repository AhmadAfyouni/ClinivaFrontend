import { Stepper } from "@mantine/core";
import { IconCircleX } from "@tabler/icons-react";
import "@mantine/core/styles.css";

interface Step {
  step: number;
  label: string;
  description: string;
  skip: boolean;
  skipDescription: string;
}

interface Props {
  step_active: number;
  steps: Step[];
}

export default function CustomStepper({ step_active, steps }: Props) {
  return (
    <Stepper active={step_active}>
      {steps.map((step) => (
        <Stepper.Step
          key={step.step}
          label={step.label}
          description={step.skip ? step.skipDescription : step.description}
          completedIcon={step.skip && <IconCircleX size={20} />}
          color={step.skip ? "red" : ""}
        />
      ))}
    </Stepper>
  );
}
