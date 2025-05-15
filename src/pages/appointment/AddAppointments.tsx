import { ScrollArea } from "@mantine/core";
import AppointmentComponents from "../../Components/Calendar/AppointmentRefactored";

const Appointments = () => {

  return (
    <ScrollArea h="calc(100vh - 80px)" w="100%">
      <AppointmentComponents/>
      {/* <ScheduleAppointment /> */}
    </ScrollArea>
  );
};

export default Appointments;
