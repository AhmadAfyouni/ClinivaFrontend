import {
  Flex,
  Text,
  Badge,
  useMantineTheme,
  Center,
  ScrollArea,
  Button,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import ListComponent from "../../Components/CompanyDetails/ListComponent";
import useStaffList from "../../hooks/staff/useStaffList";
import useServiceDetails from "../../hooks/serviceH/useServiceDetails";
import { useNavigate, useParams } from "react-router";
import { BsPerson } from "react-icons/bs";
import useDeleteById from "../../hooks/delete/useDeleteById";

const ServiceDetails = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 576px)");
  const { mutate } = useDeleteById({
    endpoint: "services",
    mutationKey: "delete-services",
    navigationUrl: "/services",
  });
  const { id: serviceId } = useParams();
  const { data } = useServiceDetails(serviceId!);
  const info = [
    { title: "ID", content: data?.publicId },
    { title: "Name", content: data?.name },
    { title: "Price", content: data?.price },
    { title: "Created at ", content: data?.createdAt.slice(0, 10) },
  ];
  const info1 = [
    { title: "Description", content: data?.description },
    { title: "Modified at", content: data?.updatedAt.slice(0, 10) },
  ];
  const { data: Staff, isFetched } = useStaffList();
  console.log(data?.isActive);
  const handleDeleteEvent = () => {
    mutate(data?._id ?? "-1");
  };
  const handleEditEvent = () => {
    navigate(`/services/edit/${serviceId}`);
  };
  if (!Staff) return null;
  if (!isFetched || !data)
    return (
      <Center>
        <Text>No Service Details Found</Text>
      </Center>
    );
  else console.log(data?.doctors.map((item) => item.name));
  return (
    <ScrollArea h="100vh" w="100%" type="always" bg={theme.other.bg}>
      <Flex direction="row">
        <Flex w="100%" direction="column" mb="lg" gap="md">
          <Text fz={20} fw={600} c={theme.colors.myPrimary[5]}>
            Service
          </Text>
          <Flex direction={isMobile ? "column" : "row"}>
            <Flex
              w={isMobile ? "100%" : "48%"}
              direction="column"
              mb="lg"
              gap="md"
            >
              {info.map((item, index) => (
                <Flex key={index}>
                  <Text w={200} c={theme.other.onSurfaceTertiary}>
                    {item.title}
                  </Text>
                  <Text c={theme.other.onSurfacePrimary}>{item.content}</Text>
                </Flex>
              ))}
            </Flex>
            <Flex direction="column" w={isMobile ? "100%" : "48%"} gap="md">
              <Flex>
                <Text w={200} c={theme.other.onSurfaceTertiary}>
                  Status
                </Text>
                <Badge
                  size="14px"
                  p="sm"
                  bg={
                    data.isActive === true
                      ? theme.colors.myPrimary[4]
                      : theme.other.secondaryColor
                  }
                >
                  {data.isActive === true ? "Active" : "InActive"}
                </Badge>
              </Flex>
              <Flex w="100%" direction="column" mb="lg" gap="lg">
                {info1.map((item, index) => (
                  <Flex key={index}>
                    <Text w={200} c={theme.other.onSurfaceTertiary}>
                      {item.title}
                    </Text>
                    <Text c={theme.other.onSurfacePrimary}>{item.content}</Text>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Text fw={600} fz={20} c={theme.colors.myPrimary[5]}>
        Doctors & Clinics
      </Text>
      <Flex
        w="100%"
        justify="space-between"
        direction={isMobile ? "column" : "row"}
      >
        <Flex w="50%">
          <ListComponent
            key={0}
            minwidth="50%"
            title="Doctors"
            listItems={data.doctors.map((item) => item.name)}
            icon={<BsPerson />}
          />
        </Flex>
        <Flex w="50%">
          {/* <ListComponent
              key={1}
              minwidth="50%"
              title="Clinics"
              listItems={data.clinic.name}
              icon={<FaClinicMedical />}
            /> */}
        </Flex>
      </Flex>
      <Button
        variant="filled"
        color="red"
        radius="xl"
        mb="110px"
        onClick={handleDeleteEvent}
      >
        Delete
      </Button>
      <Button
        variant="filled"
        color="green"
        radius="xl"
        mb="110px"
        onClick={handleEditEvent}
      >
        Edit
      </Button>
    </ScrollArea>
  );
};

export default ServiceDetails;
