import { useFormik } from "formik";
import { useEffect } from "react";
import useAddAppointment from "../../hooks/appointment/useAddAppointment";
import AddAppointmentType from "../../types/Appointment/AddAppointment";
import AppointmentSchema from "../../schema/AppointmentSchema";
import InputPropsType from "../../types/InputsType";
import { SelectItemType } from "./utilities/fieldsForm";

interface UseAppointmentFormProps {
  doctors: SelectItemType;
  patients: SelectItemType;
  services: SelectItemType;
  clinics: SelectItemType;
  openForm: { date: string; time: string } | null;
  onSuccess: () => void;
  setSelectedServiceId: (id: string) => void;
}

const useAppointmentForm = ({
  doctors,
  patients,
  services,
  clinics,
  openForm,
  onSuccess,
  setSelectedServiceId,
}: UseAppointmentFormProps) => {
    
    
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
    },
  });

  useEffect(() => {
    if (addAppointmentMutation.isSuccess) {
      formik.resetForm();
      onSuccess();
    }
  }, [addAppointmentMutation.isSuccess]);

  useEffect(() => {
    if (openForm) {
      let time = openForm.time;
      if (time.length === 4) time = "0" + time;
      const datetime = openForm.date + "T" + time + ":00.000Z";
      formik.setValues({
        ...formik.values,
        datetime,
      });
    }
  }, [openForm]);

  const getFormFields = (): InputPropsType[] => {
    const day = new Date(formik.values.datetime).getUTCDate();
    const month = new Date(formik.values.datetime).getUTCMonth() + 1;
    const year = new Date(formik.values.datetime).getUTCFullYear();
    const hours = String(new Date(formik.values.datetime).getUTCHours()).padStart(2, "0");
    const minutes = String(new Date(formik.values.datetime).getUTCMinutes()).padStart(2, "0");

    return [
      {
        id: "datetime",
        label: "Date & Time",
        mandatory: true,
        type: "text",
        description: "",
        error: undefined,
        placeholder: "",
        tooltip: "Appointment date and time",
        value: day + "/" + month + "/" + year + " " + hours + ":" + minutes,
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
        onChange: (key) => {
          formik.setFieldValue("patient", patients[key as string]);
        },
        onBlur: formik.handleBlur,
        selectValue: Object.keys(patients),
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
        onChange: (key) => {
          formik.setFieldValue("doctor", doctors[key as string]);
        },
        onBlur: formik.handleBlur,
        selectValue: Object.keys(doctors),
      },
      {
        id: "service",
        label: "Service",
        mandatory: true,
        type: "select",
        description: "",
        error: formik.errors.service as string | undefined,
        placeholder: "Select service",
        tooltip: "Select the service",
        onChange: (key) => {
          formik.setFieldValue("service", services[key as string]);
          setSelectedServiceId(services[key as string]);

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
        placeholder: "Select clinic",
        tooltip: "Select the clinic",
        onChange: (key) => {
          formik.setFieldValue("clinic", clinics[key as string]);
        },
        onBlur: formik.handleBlur,
        selectValue: Object.keys(clinics),
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
    ];
  };

  return {
    formik,
    addAppointmentMutation,
    getFormFields,
  };
};

export default useAppointmentForm;
