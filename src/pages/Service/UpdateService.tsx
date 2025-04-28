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
  const { data: serviceData, isLoading: loadingService } = useServiceDetails(
    serviceId!
  );
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

  const handleMultiSelectChange = (fieldName: string, selected: string[]) => {
    formik.setFieldValue(fieldName, selected);
  };

  const formik = useFormik({
    initialValues: {
      name: serviceData?.name || "",
      description: serviceData?.description || "",
      price: serviceData?.price || null,
      isActive: serviceData?.isActive ?? true,
      // clinics: serviceData?.clinic.name || [],
      // doctors: serviceData?.doctors.map((item) => item.name) || [],
      clinics: serviceData?.clinic?._id ? [serviceData.clinic._id] : [],
      doctors: serviceData?.doctors?.map((item) => item._id) || [],
    },
    enableReinitialize: true,
    validationSchema: AddServiceSchema,
    onSubmit: (values) => {
      if (!serviceId) return;
      updateHook.mutate({
        id: serviceId,
        name: values.name,
        description: values.description,
        price: values.price,
        isActive: values.isActive,
        clinic: values.clinics[0],
        doctors: values.doctors,
      });
    },
  });

  if (
    loadingService ||
    !serviceData ||
    !clinicsHook.data ||
    !doctorsHook.data
  ) {
    return <div>Loading...</div>;
  }

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
      id: "clinicsId",
      label: "Clinics",
      mandatory: true,
      type: "multiSelect",
      error: formik.errors.clinics?.toString(),
      value: getNamesByIds(Clinics, formik.values.clinics),
      onChange: (selected) => {
        if (
          Array.isArray(selected) &&
          selected.every((s) => typeof s === "string")
        ) {
          handleMultiSelectChange(
            "clinics",
            selected.map((name) => Clinics[name])
          );
        }
      },
      onBlur: formik.handleBlur,
      selectValue: Object.keys(Clinics),
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
          Update Service
        </Button>
      </form>
    </ScrollArea>
  );
}

export default UpdateService;
