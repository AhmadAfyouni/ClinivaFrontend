import { useState } from "react";
import useAppointmentsList from "../../hooks/appointment/useAppointmentsList";
import useDoctors from "../../hooks/doctor/useDoctors";
import usePatientsList from "../../hooks/patient/usePatientsList";
import useServicesList from "../../hooks/serviceH/useServicesList";
import useClinics from "../../hooks/clinic/useClinics";
import usePageinationtStore from "../../store/Pagination/usePaginationtStore";
import { SelectItemType } from "./utilities/fieldsForm";
import AppointmentType from "../../types/Appointment/AppointmentType";

const useAppointmentsData = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [daysInCalender, setDaysInCalender] = useState(5);
  const [selectedDoctor, setSelectedDoctor] = useState("All Doctors");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedClinic, setSelectedClinic] = useState("Select Clinic");
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openForm, setOpenForm] = useState<{
    date: string;
    time: string;
  } | null>(null);

  const doctorsHook = useDoctors(0, 0, true);
  const patientsHook = usePatientsList(true);
  const serviceHook = useServicesList(true);
  const clinicsHook = useClinics(0, 0, true);
  const appointmentsHook = useAppointmentsList(true);
  const pagination = usePageinationtStore();

  const isLoading = 
    !appointmentsHook.data ||
    !doctorsHook.data ||
    !patientsHook.data ||
    !serviceHook.data ||
    !clinicsHook.data;

  // Initialize selected clinic if not set
  if (!isLoading && selectedClinic === "Select Clinic" && clinicsHook.data.length > 0) {
    pagination.setGeneralFilter("&clinic=" + clinicsHook.data[0]._id);
    setSelectedClinic(clinicsHook.data[0].name);
  }

  const getAppointments = (day: string, time: string) => {
    
    if (!appointmentsHook.data) return [];
    
    return appointmentsHook.data.filter((app) => {
      
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

  const handleCellClick = (day: string, time: string) => {
    setOpenForm({ date: day, time });
    setDaysInCalender(4);
  };

  const handleCloseForm = () => {
    setOpenForm(null);
    setDaysInCalender(5);
  };

  const handleAppointmentClick = (appointment: AppointmentType) => {
    console.log("Appointment clicked:", appointment);
    // Add your appointment click handling logic here
  };

  // Create lookup objects for form fields
  const createLookup = () => {
    if (isLoading) return { doctors: {}, patients: {}, services: {}, clinics: {} };

    // Original approach - all doctors
    let doctors: SelectItemType = {};
    
    // If a service is selected, filter doctors by that service
    if (selectedServiceId) {
      const filteredServices = serviceHook.data.filter((service) => service._id === selectedServiceId);
      
      if (filteredServices.length > 0) {
        // Combine all doctors from matching services into a single SelectItemType object
        doctors = filteredServices.reduce((acc, service) => {
          service.doctors.forEach(item => {
            acc[item.name] = item._id;
          });
          return acc;
        }, {} as SelectItemType);
      }
    } else {
      // Fallback to all doctors if no service is selected
      doctors = doctorsHook.data.reduce<SelectItemType>((acc, item) => {
        acc[item.publicId + "-" + item.name] = item._id;
        return acc;
      }, {});
    }
  
    
    const patients = patientsHook.data.reduce<SelectItemType>((acc, item) => {
      acc[item.publicId + "-" + item.name] = item._id;
      return acc;
    }, {});

    const services = serviceHook.data.reduce<SelectItemType>((acc, item) => {
      acc[item.publicId + "-" + item.name] = item._id;
      return acc;
    }, {});

    const clinics = clinicsHook.data.reduce<SelectItemType>((acc, item) => {
      acc[item.name] = item._id;
      return acc;
    }, {});

    return { doctors, patients, services, clinics };
  };

  return {
    // State
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
    selectedServiceId,
    setSelectedServiceId,
    openForm,
    
    // Data
    isLoading,
    appointmentsData: appointmentsHook.data,
    // doctorsData:doctorService,
    doctorsData: doctorsHook.data,
    clinicsData: clinicsHook.data,
    lookupData: createLookup(),
    
    // Actions
    getAppointments,
    handleCellClick,
    handleCloseForm,
    handleAppointmentClick,
    refetchAppointments: appointmentsHook.refetch,
  };
};

export default useAppointmentsData;
