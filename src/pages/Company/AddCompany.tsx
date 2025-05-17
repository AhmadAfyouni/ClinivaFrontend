import { useFormik } from "formik";
import AddCompanyType, {
  InsuranceCompany,
} from "../../types/company/AddCompanyType";
import AddCompanySchema from "../../schema/AddCompanySchema";
import InputForm from "../../Components/Inputs/InputForm";
import InputPropsType from "../../types/InputsType";
import LocationPicker from "../../Components/Map/LocationPicker";
import { Box, Button, Container, Flex, ScrollArea, Text } from "@mantine/core";
import TableSelection from "../../Components/Inputs/table/TableSelection";
import { useMantineTheme } from "@mantine/core";
import {
  BankAccountType,
  ContactInfoType,
  Holiday,
} from "../../types/GeneralAdd";
import useAddCompany from "../../hooks/company/useAddCompany";
interface Props {
  nextStep: (x: number) => void;
}
function AddCompany({ nextStep }: Props) {
  const handleImageChange = (file: File | null) => {
    formik.setFieldValue("logo", file);
  };
  const hook = useAddCompany();
  const formik = useFormik<AddCompanyType>({
    initialValues: {
      name: "",
      address: "",
      goals: "",
      overview: "",
      yearOfEstablishment: new Date().toISOString().split("T")[0],
      logo: "",
      vision: "",
      contactInfos: [],
      holidays: [],
      specializations: [],
      bankAccount: [],
      insuranceCompany: [],
      commercialRecord: {
        recordNumber: "",
        grantDate: "",
        issueDate: "",
        expirationDate: "",
        taxNumber: "",
      },
      locationGoogle: {
        x: 0,
        y: 0,
      },
      Key_member: "",
      Founder: "",
      Executives: "",
    },
    validationSchema: AddCompanySchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      hook.mutate(values);
      if (hook.data?.success)
        localStorage.setItem("companyId", hook.data?.data._id);
      nextStep(3);
      console.log("Form Submitted::::", values);
    },
  });

  const handleLocationChange = (location: { x: number; y: number }) => {
    console.log(location, "55555555555");
    formik.setFieldValue("locationGoogl", location);
  };

  const attrb: InputPropsType[] = [
    {
      id: "name",
      label: "Company Name",
      mandatory: true,
      type: "text",
      description: "",
      error: formik.errors.name,
      placeholder: "Enter company name",
      tooltip: "Enter the company name",
      value: formik.values.name || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "Key_member",
      label: "Key Member",
      mandatory: true,
      type: "text",
      description: "",
      error: formik.errors.Key_member,
      placeholder: "Enter Key Member",
      tooltip: "Enter the Key Member",
      value: formik.values.Key_member || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "Founder",
      label: "Founder",
      mandatory: true,
      type: "text",
      description: "",
      error: formik.errors.Founder,
      placeholder: "Enter Founder",
      tooltip: "Enter the  Founder",
      value: formik.values.Founder || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "Executives",
      label: "Executives",
      mandatory: true,
      type: "text",
      description: "",
      error: formik.errors.Executives,
      placeholder: "Enter Executives",
      tooltip: "Enter the  Executives",
      value: formik.values.Executives || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "address",
      label: "Address",
      mandatory: true,
      type: "text",
      description: "",
      error: formik.errors.address,
      placeholder: "Enter company address",
      tooltip: "Enter the company address",
      value: formik.values.address || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "yearOfEstablishment",
      label: "Year of Establishment",
      mandatory: true,
      type: "date",
      description: "",
      error: formik.errors.yearOfEstablishment,
      placeholder: "YYYY-MM-DD",
      tooltip: "Enter year of establishment",
      value: formik.values.yearOfEstablishment || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "logo",
      label: "Company Logo",
      mandatory: false,
      type: "image",
      description: "",
      error: formik.errors.logo,
      placeholder: "",
      value: formik.values.logo || "",
      onChangeFile: handleImageChange,
      onChange: () => {},
    },
    {
      id: "vision",
      label: "Company Vision",
      mandatory: true,
      type: "areaText",
      description: "",
      error: formik.errors.vision,
      placeholder: "Enter company vision",
      tooltip: "Company's vision statement",
      value: formik.values.vision || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "goals",
      label: "Goals",
      mandatory: true,
      type: "areaText",
      description: "",
      error: formik.errors.goals,
      placeholder: "Enter company goals",
      tooltip: "Brief goals about the company",
      value: formik.values.goals || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "overview",
      label: "Overview",
      mandatory: true,
      type: "areaText",
      description: "",
      error: formik.errors.overview,
      placeholder: "Enter company overview",
      tooltip: "overview about the company",
      value: formik.values.overview || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
  ];

  const commercialRecord: InputPropsType[] = [
    {
      id: "commercialRecord.recordNumber",
      label: "Commercial Record Number",
      mandatory: true,
      type: "text",
      description: "",
      error: formik.errors.commercialRecord?.recordNumber,
      placeholder: "Enter record number",
      tooltip: "Enter the commercial record number",
      value: formik.values.commercialRecord.recordNumber || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "commercialRecord.grantDate",
      label: "Grant Date",
      mandatory: true,
      type: "date",
      description: "",
      error: formik.errors.commercialRecord?.grantDate,
      placeholder: "YYYY-MM-DD",
      tooltip: "Enter the grant date",
      value: formik.values.commercialRecord.grantDate || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "commercialRecord.issueDate",
      label: "Issue Date",
      mandatory: true,
      type: "date",
      description: "",
      error: formik.errors.commercialRecord?.issueDate,
      placeholder: "YYYY-MM-DD",
      tooltip: "Enter the issue date",
      value: formik.values.commercialRecord.issueDate || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "commercialRecord.expirationDate",
      label: "Expiration Date",
      mandatory: true,
      type: "date",
      description: "",
      error: formik.errors.commercialRecord?.expirationDate,
      placeholder: "YYYY-MM-DD",
      tooltip: "Enter the expiration date",
      value: formik.values.commercialRecord.expirationDate || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "commercialRecord.taxNumber",
      label: "Tax Number",
      mandatory: true,
      type: "text",
      description: "",
      error: formik.errors.commercialRecord?.taxNumber,
      placeholder: "Enter tax number",
      tooltip: "Enter the tax number",
      value: formik.values.commercialRecord.taxNumber || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
  ];

  const theme = useMantineTheme();
  console.log(formik.values);
  console.log(formik.errors);
  return (
    <ScrollArea h="calc(100vh - 80px)" w="100%">
      <form
        onSubmit={(e) => {
          console.log("omsubmit");
          console.log(formik.errors);
          formik.handleSubmit(e);
        }}
      >
        <Container size="xl" p="md">
          <InputForm
            base={attrb}
            count={0}
            onSubmit={() => {}}
            with_submit={false}
          />
          <Box
            mt="xl"
            mb="md"
            p={"sm"}
            style={{
              borderTop: "1px solid var(--mantine-color-red-6)",
              // borderBottom: "1px solid var(--mantine-color-red-6)",
            }}
          >
            <Text size="lg" fw={700} c={theme.primaryColor}>
              Commercial Record Information
            </Text>
            <InputForm
              base={commercialRecord}
              count={0}
              onSubmit={() => {}}
              with_submit={false}
            />
          </Box>

          <TableSelection<ContactInfoType>
            title="Contact Infos"
            fieldName="contactInfos"
            columns={[
              {
                key: "type",
                label: "Type",
                type: "select",
                options: ["email", "phone"],
              },

              {
                key: "value",
                label: "Value",
                type: "text",
              },
              {
                key: "subType",
                label: "Sub Type",
                type: "text",
              },
            ]}
            key={"contactInfos"}
            onFieldChange={formik.setFieldValue}
            data={formik.values.contactInfos}
            error={formik.errors.contactInfos?.toString() || ""}
          />

          <TableSelection<Holiday>
            key={"holidays"}
            title="Holidays"
            fieldName="holidays"
            columns={[
              { key: "name", label: "Holiday Name", type: "text" },
              { key: "date", label: "Date", type: "date" },
              { key: "reason", label: "Reason", type: "text" },
            ]}
            data={formik.values.holidays}
            onFieldChange={formik.setFieldValue}
            error={""}
          />

          {/* <TableSelection<Specialization>
            key={"specializations"}
            title="Specializations"
            fieldName="specializations"
            columns={[
              { key: "name", label: "Specialization", type: "text" },
              { key: "description", label: "Description", type: "text" },
            ]}
            data={formik.values.specializations}
            onFieldChange={formik.setFieldValue}
            error={formik.errors.specializations?.toString() || ""}
          /> */}
          <TableSelection<InsuranceCompany>
            title={"Insurance Company"}
            fieldName={"insuranceCompany"}
            columns={[
              { key: "companyName", label: "Company Name", type: "text" },
              { key: "companyPhone", label: "companyPhone", type: "phone" },
              { key: "companyEmail", label: "companyEmail", type: "email" },
            ]}
            onFieldChange={formik.setFieldValue}
            error={formik.errors.insuranceCompany?.toString() || ""}
          />
          <TableSelection<BankAccountType>
            key={"bankAccount"}
            title="Bank Accounts"
            fieldName="bankAccount"
            columns={[
              { key: "accountNumber", label: "Account Number", type: "text" },
              { key: "bankName", label: "Bank Name", type: "text" },
              { key: "swiftCode", label: "Swift Code", type: "text" },
              { key: "accountName", label: "Account Name", type: "text" },
            ]}
            data={formik.values.bankAccount}
            onFieldChange={formik.setFieldValue}
            error={formik.errors.bankAccount?.toString() || ""}
          />
          <Box mt="md" mb="xl">
            <Flex gap={"xl"}>
              <h3>Location</h3>
              <h5>x: {formik.values.locationGoogle.x}</h5>
              <h5>x: {formik.values.locationGoogle.y}</h5>
            </Flex>
            <LocationPicker
              onChange={handleLocationChange}
              initialPosition={formik.values.locationGoogle}
            />
            {formik.errors.locationGoogle && (
              <div style={{ color: "red" }}>
                {formik.errors.locationGoogle as string}
              </div>
            )}
          </Box>
          <Button type="submit" bg={"#9BDABB"} mt="md" w="30%">
            Submit
          </Button>
        </Container>
      </form>
    </ScrollArea>
  );
}

export default AddCompany;
