import { Box, Center, Flex } from "@mantine/core";
import AppointmentHeader from "./AppointmentHeader";
import AppointmentCalendar from "./AppointmentCalendar";
import AppointmentExtraInfo from "./AppointmentMoreInfo";
import { getNextXDays } from "./utilities/getNext7Days";
import { handleMoveWeek } from "./utilities/handleMoveWeek";
import { TIME_SLOTS } from "./utilities/timeSlots";
import useAppointmentsData from "./useAppointmentsData";
import AppointmentForm from "./AppointmentForm";
import { getClinicInterval, getClinicTime } from "./utilities/timeUtils";

function AppointmentComponents() {
  const {
    searchQuery,
    setSearchQuery,
    daysInCalender,
    selectedDoctor,
    setSelectedDoctor,
    selectedClinic,
    setSelectedClinic,
    startDate,
    setStartDate,
    selectedDate,
    setSelectedDate,
    openForm,
    isLoading,
    appointmentsData,
    doctorsData,
    clinicsData,
    lookupData,
    getAppointments,
    handleCellClick,
    handleCloseForm,
    handleAppointmentClick,
    refetchAppointments,
    setSelectedServiceId,
  } = useAppointmentsData();
  
  if (isLoading || doctorsData === undefined || clinicsData === undefined||appointmentsData === undefined) {
    return <Center>Loading...</Center>;
  }

  const days = getNextXDays(startDate, daysInCalender);
  
  // Get clinic start and end times
  const startTime = getClinicTime(clinicsData, selectedClinic, "start");
  const endTime = getClinicTime(clinicsData, selectedClinic, "end");
  
  // Get appointment interval
  const interval = getClinicInterval(clinicsData, selectedClinic);

  return (
    <Box py="md">
      <Flex gap={0} justify="start">
        <Flex w="100%" direction="column" gap="md">
          <AppointmentHeader
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedDoctor={selectedDoctor}
            setSelectedDoctor={setSelectedDoctor}
            selectedClinic={selectedClinic}
            setSelectedClinic={setSelectedClinic}
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
            doctors={doctorsData.map((doc) => doc.name)}
            clinics={lookupData.clinics}
          />

          <AppointmentCalendar
            days={days}
            timeSlots={TIME_SLOTS(startTime, endTime, interval)}
            appointments={appointmentsData}
            selectedCell={openForm}
            handleCellClick={handleCellClick}
            handleAppointmentClick={handleAppointmentClick}
            getAppointments={getAppointments}
            clinicData={clinicsData}
            selectedClinic={selectedClinic}
          />
        </Flex>
        
        {openForm && (
          <AppointmentForm
          setSelectedServiceId={setSelectedServiceId}
            doctors={lookupData.doctors}
            patients={lookupData.patients}
            services={lookupData.services}
            clinics={lookupData.clinics}
            openForm={openForm}
            onClose={handleCloseForm}
            onSuccess={() => {
              handleCloseForm();
              refetchAppointments();
            }}
          />
        )}
        
        {!openForm && <AppointmentExtraInfo />}
      </Flex>
    </Box>
  );
}

export default AppointmentComponents;
