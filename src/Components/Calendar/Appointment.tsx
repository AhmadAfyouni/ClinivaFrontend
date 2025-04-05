import { Box, Button, Card, Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import AppointmentType from "../../types/AppointmentType";
import AppointmentSchema from "../../schema/AppointmentSchema";
import InputForm from "../Inputs/InputForm";
import AppointmentHeader from "./AppointmentHeader";
import AppointmentCalendar from "./AppointmentCalendar";
import { getNextXDays } from "./utilities/getNext7Days";
import { fieldsForm } from "./utilities/fieldsForm";
import { handleMoveWeek } from "./utilities/handleMoveWeek";
import { TIME_SLOTS } from "./utilities/timeSlots";
import { IoMdCloseCircleOutline } from "react-icons/io";
import AppointmentExtraInfo from "./AppointmentMoreInfo";

const sampleAppointments: AppointmentType[] = [
  {
    patientName: "Sarah Miller",
    treatment: "Facial Rejuvenation",
    time: "12:00",
    date: new Date("2025-03-31"),
    doctor: "Dr. Emily Ross",
  },
  {
    patientName: "Grace Parker",
    treatment: "Scar Removal Surgery",
    time: "10:30",
    date: new Date("2025-03-25"),
    doctor: "Dr. James Wilson",
  },
  {
    patientName: "Grace Parker",
    treatment: "Scar Removal Surgery",
    time: "10:00",
    date: new Date("2025-03-27"),
    doctor: "Dr. James Wilson",
  },
  {
    patientName: "Grace Parker",
    treatment: "Scar Removal Surgery",
    time: "10:00",
    date: new Date("2025-03-28"),
    doctor: "Dr. James Wilson",
  },
  {
    patientName: "Grace Parker",
    treatment: "Scar Removal Surgery",
    time: "15:00",
    date: new Date("2025-03-22"),
    doctor: "Dr. James Wilson",
  },
  {
    patientName: "Grace Parker",
    treatment: "Scar Removal Surgery",
    time: "12:00",
    date: new Date("2025-03-22"),
    doctor: "Dr. James Wilson",
  },
  {
    patientName: "Grace Parker",
    treatment: "Scar Removal Surgery",
    time: "9:00",
    date: new Date("2025-03-23"),
    doctor: "Dr. James Wilson",
  },
  {
    patientName: "Grace Parker",
    treatment: "Scar Removal Surgery",
    time: "9:00",
    date: new Date("2025-03-30"),
    doctor: "Dr. James Wilson",
  },
  {
    patientName: "Grace Parker",
    treatment: "Scar Removal Surgery",
    time: "9:00",
    date: new Date("2025-03-28"),
    doctor: "Dr. James Wilson",
  },
  {
    patientName: "Grace Parker",
    treatment: "Scar Removal Surgery",
    time: "11:00",
    date: new Date("2025-03-30"),
    doctor: "Dr. James Wilson",
  },
  {
    patientName: "Grace Parker",
    treatment: "Scar Removal Surgery",
    time: "12:00",
    date: new Date("2025-03-28"),
    doctor: "Dr. James Wilson",
  },
  {
    patientName: "Grace Parker",
    treatment: "Scar Removal Surgery",
    time: "15:00",
    date: new Date("2025-03-27"),
    doctor: "Dr. James Wilson",
  },
  {
    patientName: "Grace Parker",
    treatment: "Scar Removal Surgery",
    time: "9:00",
    date: new Date("2025-03-29"),
    doctor: "Dr. James Wilson",
  },
  {
    patientName: "Grace Parker",
    treatment: "Scar Removal Surgery",
    time: "11:00",
    date: new Date("2025-03-31"),
    doctor: "Dr. James Wilson",
  },
  {
    patientName: "Grace Parker",
    treatment: "Scar Removal Surgery",
    time: "12:00",
    date: new Date("2025-03-29"),
    doctor: "Dr. James Wilson",
  },
];

const doctors = ["All Doctors", "Dr. Emily Ross", "Dr. James Wilson"];

function Appointment() {
  const [searchQuery, setSearchQuery] = useState("");
  const [daysInCalender, setDaysInCalender] = useState(5);
  const [OpenExtraInfo, setOpenExtraInfo] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState("All Doctors");
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [OpenForm, setOenForm] = useState<{
    date: string;
    time: string;
  } | null>(null);
  const [appointments, setAppointments] =
    useState<AppointmentType[]>(sampleAppointments);

  const formik = useFormik<AppointmentType>({
    initialValues: {
      patientName: "",
      treatment: "",
      time: OpenForm?.time || "",
      date: OpenForm ? new Date(OpenForm.date) : new Date(),
      doctor: "",
      notes: "",
      status: "scheduled",
    },
    validationSchema: AppointmentSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      // Add the new appointment to the list

      console.log("values");

      setAppointments([...appointments, values]);
      // Reset the selected cell
      setOenForm(null);
    },
  });
  // Update formik values when selectedCell changes
  useEffect(() => {
    if (OpenForm) {
      formik.setValues({
        ...formik.values,
        time: OpenForm.time,
        date: new Date(OpenForm.date),
      });
    }
  }, [OpenForm]);
  // Get appointments for a specific day and time with filtering
  const getAppointments = (day: string, time: string) => {
    return appointments.filter((app) => {
      const matchesDateTime =
        app.date.toISOString().split("T")[0] === day && app.time === time;
      const matchesSearch = searchQuery
        ? app.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.treatment.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchesDoctor =
        selectedDoctor === "All Doctors" ? true : app.doctor === selectedDoctor;

      return matchesDateTime && matchesSearch && matchesDoctor;
    });
  };

  const handleAppointmentClick = (appointment: AppointmentType) => {
    console.log("Appointment clicked:", appointment);
    // Add your appointment click handling logic here
  };

  const handleCellClick = (day: string, time: string) => {
    setOenForm({ date: day, time });
    setDaysInCalender(4);
  };
  const handleCloseForm = () => {
    setOenForm(null);
    setDaysInCalender(5);
  };

  const days = getNextXDays(startDate, daysInCalender);

  return (
    <Box py="md">
      <Flex gap={0} justify={"start"}>
        <Flex w={"100%"} direction={"column"} gap={"md"}>
          <AppointmentHeader
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedDoctor={selectedDoctor}
            setSelectedDoctor={setSelectedDoctor}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setStartDate={setStartDate}
            handlePreviousWeek={() =>
              handleMoveWeek(
                daysInCalender,
                startDate,
                setStartDate,
                "previous"
              )
            }
            handleNextWeek={() =>
              handleMoveWeek(daysInCalender, startDate, setStartDate, "next")
            }
            doctors={doctors}
          />

          <AppointmentCalendar
            days={days}
            timeSlots={TIME_SLOTS(9, 18)}
            appointments={appointments}
            selectedCell={OpenForm}
            handleCellClick={handleCellClick}
            handleAppointmentClick={handleAppointmentClick}
            getAppointments={getAppointments}
          />
        </Flex>
        {OpenForm && (
          <Card ml={"xs"}>
            <Flex
              direction={"column"}
              justify={"center"}
              w={"100%"}
              align={"center"}
            >
              <Button variant="subtle" onClick={handleCloseForm}>
                <IoMdCloseCircleOutline size={"xl"} />
              </Button>
              <InputForm
                base={fieldsForm(formik, doctors)}
                with_submit={true}
                count={0}
                onSubmit={formik.handleSubmit}
              />
            </Flex>
          </Card>
        )}
        {OpenExtraInfo && !OpenForm && <AppointmentExtraInfo />}
      </Flex>
    </Box>
  );
}

export default Appointment;
