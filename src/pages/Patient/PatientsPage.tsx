import { useEffect, useState } from "react";
import { Table, ScrollArea, Flex, Center, Text } from "@mantine/core";
import TableBody from "../../Components/Table/TableBody";
import TableHead from "../../Components/Table/TableHead";
import { useNavigate } from "react-router";
import usePatientsList from "../../hooks/patient/usePatientsList";
import useSortStore from "../../hooks/useSortStore ";

const PatientsPage = () => {
  const { sortBy, order, setSortBy, setOrder } = useSortStore();
  const { data, isFetched } = usePatientsList(1, 10, false, sortBy, order);
  console.log(data);
  const [selection, setSelection] = useState<string[]>([]);
  // const [treatment, setTreatment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setOrder(order);
    setSortBy(sortBy);

    // if (role) {
    //   result = result.filter((p) => p.role === role);
    // }
    // setRole(role);
  }, [order, sortBy]);

  if (!data) return null;

  const toggleAll = () => {
    setSelection((current) =>
      current.length === data?.length
        ? []
        : data.map((item) => {
            return item._id;
          })
    );
  };
  // const handleChangeDropDownTreatment = () => {
  //   setTreatment(treatment);
  // };
  // const doctorOptions = [...new Set(data.map((p) => p.doctor))]
  //   .map((d) => ({ value: d, label: d }))
  //   .map((option) => option.value);
  // const treatmentOptions = [...new Set(data.map((p) => p.treatment))]
  //   .map((t) => ({ value: t, label: t }))
  //   .map((option) => option.value);

  const rows = data?.map((item) => (
    <TableBody
      onClick={() => navigate(`/patients/details/${item._id}`)}
      key={item._id}
      th0={item._id}
      th1={item.name}
      // th2={item.date}
      // th3={item.doctor}
      // th4={item.treatment}
      // th5={item.status}
      th2={item.dateOfBirth.slice(0, 10)}
      th3={item.address}
      th4={item.address}
      th5={item.blood_type}
      selection={selection}
      setSelection={setSelection}
    />
  ));
  if (!isFetched)
    return (
      <Center>
        <Text>No Patients Found</Text>
      </Center>
    );
  else
    return (
      <Flex w="95%" h="85vh" direction="column">
        {/* <MultiFilters
          search={search}
          handleSearchChange={handleSearchChange}
          doctorOptions={doctorOptions}
          treatmentOptions={treatmentOptions}
          dateRange={dateRange}
          handleChangDropDownDoctor={handleChangDropDownDoctor}
          handleChangeDropDownTreatment={handleChangeDropDownTreatment}
          setDateRange={setDateRange}
        /> */}
        <ScrollArea>
          <Table>
            <TableHead
              labels={[
                "Patint Id",
                "Name",
                "Last Visist ",
                "Doctors",
                "Treatment",
                "status",
                "Patient",
              ]}
              data={data}
              selection={selection}
              toggleAll={toggleAll}
              sortedBy={[
                "_id",
                "name",
                "dateOfBirth",
                "address",
                "address",
                "blood_type",
              ]}
            />
            {rows}
          </Table>
        </ScrollArea>
      </Flex>
    );
};

export default PatientsPage;
