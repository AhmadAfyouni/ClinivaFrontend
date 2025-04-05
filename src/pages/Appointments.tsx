import { ScrollArea } from "@mantine/core";
import Appointment from "../Components/Calendar/Appointment";

const Appointments = () => {
  return (
    <ScrollArea h="calc(100vh - 80px)" w="100%">
      <Appointment />
    </ScrollArea>
  );
};

export default Appointments;
