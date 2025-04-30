import { ScrollArea } from "@mantine/core";
import AppointmentComponents from "../../Components/Calendar/Appointment";

const Appointments = () => {

  return (
    <ScrollArea h="calc(100vh - 80px)" w="100%">
      <AppointmentComponents />
    </ScrollArea>
  );
};

export default Appointments;
