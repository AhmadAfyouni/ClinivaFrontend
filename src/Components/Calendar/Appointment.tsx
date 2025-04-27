import { Box, Button, Card, Center, Flex, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import AppointmentType from "../../types/Appointment/AppointmentType";
import AppointmentSchema from "../../schema/AppointmentSchema";
import InputForm from "../Inputs/InputForm";
import AppointmentHeader from "./AppointmentHeader";
import AppointmentCalendar from "./AppointmentCalendar";
import { getNextXDays } from "./utilities/getNext7Days";
import { doctorsSelectType } from "./utilities/fieldsForm";
import { handleMoveWeek } from "./utilities/handleMoveWeek";
import { TIME_SLOTS } from "./utilities/timeSlots";
import { IoMdCloseCircleOutline } from "react-icons/io";
import AppointmentExtraInfo from "./AppointmentMoreInfo";
import useAppointmentsList from "../../hooks/appointment/useAppointmentsList";
import useAddAppointment from "../../hooks/appointment/useAddAppointment";
import AddAppointmentType from "../../types/Appointment/AddAppointment";
import useDoctors from "../../hooks/doctor/useDoctors";
import usePatientsList from "../../hooks/patient/usePatientsList";
import InputPropsType from "../../types/InputsType";
import useServicesList from "../../hooks/serviceH/useServicesList";
import useClinics from "../../hooks/clinic/useClinics";

function Appointment() {
  const [searchQuery, setSearchQuery] = useState("");
  const [daysInCalender, setDaysInCalender] = useState(5);
  const [OpenExtraInfo] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState("All Doctors");
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [OpenForm, setOenForm] = useState<{
    date: string;
    time: string;
  } | null>(null);
  const doctorsHook = useDoctors(0, 0, true);
  const patientsHook = usePatientsList(true);
  const serviceHook = useServicesList(true);
  const hook = useAppointmentsList();
  const clinicsHook = useClinics(0, 0, true);
  const addAppointmentMutation = useAddAppointment();

  const formik = useFormik<AddAppointmentType>({
    initialValues: {
      service: "",
      datetime: "",
      reason: "",
      status: "scheduled",
      cancellationReason: "",
      reminderSent: false,
      patient: "",
      clinic: "",
      doctor: "",
    },
    validationSchema: AppointmentSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log("values", values);
      addAppointmentMutation.mutate(values);

      if (addAppointmentMutation.isSuccess) {
        handleCloseForm();
        formik.resetForm();
        hook.refetch();
      }
    },
  });
  useEffect(() => {
    if (OpenForm) {
      if (OpenForm.time.length === 4) OpenForm.time = "0" + OpenForm.time;
      const Dtime = OpenForm.date + "T" + OpenForm.time + ":00.000Z";
      formik.setValues({
        ...formik.values,
        datetime: Dtime,
      });
    }
  }, [OpenForm]);

  if (
    !hook.data ||
    !doctorsHook.data ||
    !patientsHook.data ||
    !serviceHook.data ||
    !clinicsHook.data
  ) {
    return <div>Loading...</div>;
  }

  // Get appointments for a specific day and time with filtering
  const getAppointments = (day: string, time: string) => {
    return hook.data.filter((app) => {
      const [dateStr, timeRest] = app.datetime.split("T");
      const timeStr = timeRest.slice(0, 5);
      const matchesDateTime = dateStr === day && timeStr === time;
      const matchesSearch = searchQuery
        ? app.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.reason.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchesDoctor =
        selectedDoctor === "All Doctors"
          ? true
          : app.doctor.name === selectedDoctor;

      return matchesDateTime && matchesSearch && matchesDoctor;
    });
  };

  const handleAppointmentClick = (appointment: AppointmentType) => {
    console.log("Appointment clicked:", appointment);
    // Add your appointment click handling logic here
  };

  const handleCellClick = (day: string, time: string) => {
    console.log("handleCellClick");
    setOenForm({ date: day, time });
    setDaysInCalender(4);
  };
  const handleCloseForm = () => {
    setOenForm(null);
    setDaysInCalender(5);
  };

  const days = getNextXDays(startDate, daysInCalender);
  const doctors = doctorsHook.data.reduce<doctorsSelectType>((acc, item) => {
    acc[item.name] = item._id;
    return acc;
  }, {});
  const patients = patientsHook.data.reduce<doctorsSelectType>((acc, item) => {
    acc[item.name] = item._id;
    return acc;
  }, {});
  const services = serviceHook.data.reduce<doctorsSelectType>((acc, item) => {
    acc[item.name] = item._id;
    return acc;
  }, {});
  const clinics = clinicsHook.data.reduce<doctorsSelectType>((acc, item) => {
    acc[item.name] = item._id;
    return acc;
  }, {});
  const addFields: InputPropsType[] = [
    {
      id: "datetime",
      label: "Date & Time",
      mandatory: true,
      type: "text",
      description: "",
      error: undefined,
      placeholder: "",
      tooltip: "Appointment date and time",
      value: new Date(formik.values.datetime).toLocaleString(),
      onChange: () => {},
      onBlur: () => {},
      disabled: true,
    },
    {
      id: "patient",
      label: "Patient",
      mandatory: true,
      type: "select",
      description: "",
      error: formik.errors.patient as string | undefined,
      placeholder: "Select patient",
      tooltip: "Select the patient",
      // value: formik.values.patient,
      onChange: (key) => {
        formik.setFieldValue("patient", patients[key as string]);
      },
      onBlur: formik.handleBlur,
      selectValue: Object.keys(patients),
    },
    {
      id: "reason",
      label: "Reason",
      mandatory: true,
      type: "text",
      description: "",
      error: formik.errors.reason as string | undefined,
      placeholder: "Enter reason",
      tooltip: "Enter appointment reason",
      value: formik.values.reason,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "service",
      label: "Service",
      mandatory: true,
      type: "select",
      description: "",
      error: formik.errors.service as string | undefined,
      placeholder: "Enter service",
      tooltip: "Enter appointment service",
      // value: formik.values.service,
      onChange: (key) => {
        formik.setFieldValue("service", services[key as string]);
      },
      onBlur: formik.handleBlur,
      selectValue: Object.keys(services),
    },
    {
      id: "clinic",
      label: "Clinic",
      mandatory: true,
      type: "select",
      description: "",
      error: formik.errors.clinic as string | undefined,
      placeholder: "Enter clinic",
      tooltip: "Enter appointment clinic",
      // value: formik.values.clinic,
      onChange: (key) => {
        formik.setFieldValue("clinic", clinics[key as string]);
      },
      onBlur: formik.handleBlur,
      selectValue: Object.keys(clinics),
    },
    {
      id: "doctor",
      label: "Doctor",
      mandatory: true,
      type: "select",
      description: "",
      error: formik.errors.doctor as string | undefined,
      placeholder: "Select doctor",
      tooltip: "Select the doctor",
      onChange: (selectedKeys) => {
        formik.setFieldValue("doctor", doctors[selectedKeys as string]);
      },
      onBlur: formik.handleBlur,
      selectValue: Object.keys(doctors),
    },
  ];
  // console.log("@@@@@@values@@@@@@@", formik.values);
  // console.log("@@@@@@errors@@@@@@@", formik.errors);
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
            doctors={doctorsHook.data?.map((doc) => doc.name)}
          />

          <AppointmentCalendar
            days={days}
            timeSlots={TIME_SLOTS(9, 18)}
            appointments={hook.data as AppointmentType[]}
            selectedCell={OpenForm}
            handleCellClick={handleCellClick}
            handleAppointmentClick={handleAppointmentClick}
            getAppointments={getAppointments}
          />
        </Flex>
        {OpenForm && (
          <Card ml={"xs"}>
            <form onSubmit={formik.handleSubmit}>
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
                  base={addFields}
                  with_submit={false}
                  count={0}
                  onSubmit={() => {}}
                />
              </Flex>
              <Button type="submit">Add Appointment</Button>
              <Center>
                {addAppointmentMutation.error && (
                  <Text c={"red"}>
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
        )}
        {OpenExtraInfo && !OpenForm && <AppointmentExtraInfo />}
      </Flex>
    </Box>
  );
}

export default Appointment;
