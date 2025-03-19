import { useFormik } from "formik";
import AddCompanyType, {
  ContactInfo,
  Holiday,
  Specialization,
  BankAccount,
} from "../../types/AddCompanyType";
import AddCompanySchema from "../../schema/AddCompanySchema";
import InputForm from "../../Components/Inputs/InputForm";
import InputPropsType from "../../types/InputsType";
import LocationPicker from "../../Components/Map/LocationPicker";
import { Box, Button, Container, Flex, ScrollArea, Text } from "@mantine/core";
import TableSelection from "../../Components/Inputs/table/TableSelection";
import { useMantineTheme } from "@mantine/core";

function AddCompany() {
  const handleImageChange = (file: File | null) => {
    formik.setFieldValue("logo", file);
  };

  const handleLocationChange = (location: { x: number; y: number }) => {
    formik.setFieldValue("locationGoogle", location);
  };

  const formik = useFormik<AddCompanyType>({
    initialValues: {
      name: "",
      address: "",
      intro: "",
      yearOfEstablishment: new Date().toISOString().split("T")[0],
      logo: "",
      vision: "",
      details: "",
      contactInfos: [],
      holidays: [],
      specializations: [],
      workingDays: [],
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
    },
    validationSchema: AddCompanySchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
    },
  });

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
      id: "intro",
      label: "Introduction",
      mandatory: true,
      type: "areaText",
      description: "",
      error: formik.errors.intro,
      placeholder: "Enter company introduction",
      tooltip: "Brief introduction about the company",
      value: formik.values.intro || "",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      id: "details",
      label: "Company Details",
      mandatory: true,
      type: "areaText",
      description: "",
      error: formik.errors.details,
      placeholder: "Enter company details",
      tooltip: "Detailed information about the company",
      value: formik.values.details || "",
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
  console.log("values", formik.values);
  console.log("Error values", formik.errors);

  const theme = useMantineTheme();

  return (
    <ScrollArea h="calc(100vh - 80px)" w="100%">
      <form
        onSubmit={(e) => {
          console.log("omsubmit");
          formik.handleSubmit(e);
        }}
      >
        <Container size="xl" p="md">
          <InputForm
            base={attrb}
            count={0}
            onSubmit={formik.handleSubmit}
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
              onSubmit={formik.handleSubmit}
              with_submit={false}
            />
          </Box>

          <TableSelection<ContactInfo>
            title="Contact Information"
            fieldName="contactInfos"
            columns={[
              { key: "name", label: "Name", type: "text" },
              { key: "email", label: "Email", type: "email" },
              { key: "phone", label: "Phone", type: "phone" },
              { key: "designation", label: "Designation", type: "text" },
            ]}
            data={formik.values.contactInfos}
            onFieldChange={formik.setFieldValue}
          />

          <TableSelection<Holiday>
            title="Holidays"
            fieldName="holidays"
            columns={[
              { key: "name", label: "Holiday Name", type: "text" },
              { key: "date", label: "Date", type: "date" },
              { key: "reason", label: "Reason", type: "text" },
            ]}
            data={formik.values.holidays}
            onFieldChange={formik.setFieldValue}
          />

          <TableSelection<Specialization>
            title="Specializations"
            fieldName="specializations"
            columns={[
              { key: "name", label: "Specialization", type: "text" },
              { key: "description", label: "Description", type: "text" },
            ]}
            data={formik.values.specializations}
            onFieldChange={formik.setFieldValue}
          />

          <TableSelection<BankAccount>
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
          <Button type="submit" bg={"#9BDABB"} mt="md" w="70%">
            Submit
          </Button>
        </Container>
      </form>
    </ScrollArea>
  );
}

export default AddCompany;
