import { Button, Card, Center, Flex, Text } from "@mantine/core";
import { IoMdCloseCircleOutline } from "react-icons/io";
import InputForm from "../Inputs/InputForm";
import { SelectItemType } from "./utilities/fieldsForm";
import useAppointmentForm from "./useAppointmentForm";

interface AppointmentFormProps {
  doctors: SelectItemType;
  patients: SelectItemType;
  services: SelectItemType;
  clinics: SelectItemType;
  openForm: { date: string; time: string } | null;
  onClose: () => void;
  onSuccess: () => void;
  setSelectedServiceId: (id: string) => void;
}

const AppointmentForm = ({
  doctors,
  patients,
  services,
  clinics,
  openForm,
  onClose,
  onSuccess,
  setSelectedServiceId,
}: AppointmentFormProps) => {
  const { formik, addAppointmentMutation, getFormFields } = useAppointmentForm({
    setSelectedServiceId,
    doctors,
    patients,
    services,
    clinics,
    openForm,
    onSuccess,
  });

  return (
    <Card ml="xs">
      <form onSubmit={formik.handleSubmit}>
        <Flex
          direction="column"
          justify="center"
          w="100%"
          align="center"
        >
          <Button variant="subtle" onClick={onClose}>
            <IoMdCloseCircleOutline size="xl" />
          </Button>
          <InputForm
            base={getFormFields()}
            with_submit={false}
            count={0}
            onSubmit={() => {}}
          />
        </Flex>
        <Button type="submit">Add Appointment</Button>
        <Center>
          {addAppointmentMutation.error && (
            <Text c="red">
              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                addAppointmentMutation.error?.response?.data?.message
                  ?.message
              }
            </Text>
          )}
        </Center>
      </form>
    </Card>
  );
};

export default AppointmentForm;
