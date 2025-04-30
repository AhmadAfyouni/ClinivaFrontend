import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { Button, ScrollArea } from "@mantine/core";

import InputPropsType from "../../types/InputsType";
import InputForm from "../../Components/Inputs/InputForm";
import AddServiceSchema from "../../schema/service/AddServiceSchema";
import useClinics from "../../hooks/clinic/useClinics";
import useDoctors from "../../hooks/doctor/useDoctors";
import useServiceDetails from "../../hooks/serviceH/useServiceDetails";
import useUpdateService from "../../hooks/serviceH/useUpdateService";

function UpdateService() {
  const { id: serviceId } = useParams<{ id: string }>();
  const updateHook = useUpdateService();
  // const { data: serviceData, isLoading: loadingService } = useServiceDetails(serviceId!);
  const { data: serviceData } = useServiceDetails(serviceId!);
  const clinicsHook = useClinics(0, 0, true);
  const doctorsHook = useDoctors(0, 0, true);

  const Clinics: Record<string, string> =
    clinicsHook.data?.reduce((acc, item) => {
      acc[item.name] = item._id;
      return acc;
    }, {} as Record<string, string>) || {};

  const Doctors: Record<string, string> =
    doctorsHook.data?.reduce((acc, item) => {
      acc[item.name] = item._id;
      return acc;
    }, {} as Record<string, string>) || {};

  const getNamesByIds = (map: Record<string, string>, ids?: string[]) =>
    ids?.length
      ? Object.entries(map)
          .filter(([, id]) => ids.includes(id))
          .map(([name]) => name)
      : [];

  const isDataReady = !!(serviceData && clinicsHook.data && doctorsHook.data);

  const formik = useFormik({
    initialValues: isDataReady
      ? {
          name: serviceData.name,
          description: serviceData.description,
          price: serviceData.price,
          isActive: serviceData.isActive,
          clinic: serviceData.clinic?._id || "",
          doctors: serviceData.doctors?.map((doc) => doc._id) || [],
        }
      : {
          name: "",
          description: "",
          price: null,
          isActive: true,
          clinic: "",
          doctors: [],
        },
    enableReinitialize: true,
    validationSchema: AddServiceSchema,
    onSubmit: (values) => {
      if (!serviceId) {
        console.error("Service ID is undefined");
        return;
      }
      updateHook.mutate({
        id: serviceId,
        name: values.name,
        description: values.description,
        price: values.price,
        isActive: values.isActive,
        clinic: values.clinic,
        doctors: values.doctors,
      });
    },
  });

  if (!isDataReady) {
    return <div>Loading...</div>;
  }

  const handleMultiSelectChange = (fieldName: string, selected: string[]) => {
    formik.setFieldValue(fieldName, selected);
  };

  const primaryFields: InputPropsType[] = [
    {
      id: "name",
      label: "Name",
      mandatory: true,
      type: "text",
      error: formik.errors.name,
      value: formik.values.name,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "price",
      label: "Price",
      mandatory: true,
      type: "number",
      error: formik.errors.price,
      value: formik.values.price?.toString() || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "clinicId",
      label: "Clinic",
      mandatory: true,
      type: "select",
      description: "",
      error: formik.errors.clinic?.toString(),
      placeholder: "",
      tooltip: "Choose Clinic",
      value:
        Object.keys(Clinics).find(
          (key) => Clinics[key] === formik.values.clinic
        ) || "",
      onChange: (selectedKey) => {
        if (typeof selectedKey === "string") {
          const selectedValue = Clinics[selectedKey];
          formik.setFieldValue("clinic", selectedValue);
        } else {
          console.error("selectedKey is not a valid string");
        }
      },
      onBlur: formik.handleBlur,
      selectValue: Object.keys(Clinics) || [],
    },
    {
      id: "doctorsId",
      label: "Doctors",
      mandatory: true,
      type: "multiSelect",
      error: formik.errors.doctors?.toString(),
      value: getNamesByIds(Doctors, formik.values.doctors),
      onChange: (selected) => {
        if (
          Array.isArray(selected) &&
          selected.every((s) => typeof s === "string")
        ) {
          handleMultiSelectChange(
            "doctors",
            selected.map((name) => Doctors[name])
          );
        }
      },
      onBlur: formik.handleBlur,
      selectValue: Object.keys(Doctors),
    },
    {
      id: "description",
      label: "Description",
      mandatory: true,
      type: "areaText",
      error: formik.errors.description,
      value: formik.values.description,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
  ];

  return (
    <ScrollArea h="calc(100vh - 80px)" w="100%">
      <form onSubmit={formik.handleSubmit}>
        <InputForm
          base={primaryFields}
          count={0}
          onSubmit={() => {}}
          with_submit={false}
          key="EditService"
          title="Edit Service"
        />
        <Button type="submit" mt="md">
          Edit Service
        </Button>
      </form>
    </ScrollArea>
  );
}

export default UpdateService;
