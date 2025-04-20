import {
  Flex,
  Text,
  Badge,
  useMantineTheme,
  Center,
  ScrollArea,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import ListComponent from "../../Components/CompanyDetails/ListComponent";
import { FaClinicMedical } from "react-icons/fa";

import useStaffList from "../../hooks/staff/useStaffList";

const ServiceDetails = () => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 576px)");
  const title = ["ID", "Name", "Price", "Created at "];
  const content = ["12345", "Clinic 1", "Complex 1", "Location 1"];
  const title2 = ["Description", "Modified at "];
  const content2 = ["3254", "blah blah blah"];
  const { data, isFetched } = useStaffList();
  // console.log(data);

  if (!data) return null;

  if (!isFetched || !data)
    return (
      <Center>
        <Text>No Service Staff Found</Text>
      </Center>
    );
  else
    return (
      <ScrollArea h="100vh" w="100%" type="always" bg={theme.other.bg}>
        <Flex direction="row">
          <Flex w="100%" direction="column" mb="lg" gap="md">
            <Text fz={20} fw={600} c={theme.colors.myPrimary[5]}>
              Departement
            </Text>
            <Flex direction={isMobile ? "column" : "row"}>
              <Flex
                w={isMobile ? "100%" : "48%"}
                direction="column"
                mb="lg"
                gap="md"
              >
                {title.map((item, index) => (
                  <Flex key={index}>
                    <Text w={200} c={theme.other.onSurfaceTertiary}>
                      {item}
                    </Text>
                    <Text c={theme.other.onSurfacePrimary}>
                      {content[index]}
                    </Text>
                  </Flex>
                ))}
              </Flex>
              <Flex direction="column" w={isMobile ? "100%" : "48%"} gap="md">
                <Flex>
                  <Text w={200} c={theme.other.onSurfaceTertiary}>
                    Status
                  </Text>
                  <Badge size="14px" p="sm">
                    Active
                  </Badge>
                </Flex>
                <Flex w="100%" direction="column" mb="lg" gap="lg">
                  {title2.map((item, index) => (
                    <Flex key={index}>
                      <Text w={200} c={theme.other.onSurfaceTertiary}>
                        {item}
                      </Text>
                      <Text c={theme.other.onSurfacePrimary}>
                        {content2[index]}
                      </Text>
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
              listItems={["gf1dsa", "gsgf2sdg", "g3fdsa", "gsg4fsdg", "gf5dsa"]}
              icon={<FaClinicMedical />}
            />
          </Flex>
          <Flex w="50%">
            <ListComponent
              key={1}
              minwidth="50%"
              title="Clinics"
              listItems={[
                "fsdgsf0",
                "sdf09g",
                "g00fdsa",
                "gsg9fsdg",
                "gfds8a",
                "gsg7fsdg",
              ]}
              icon={<FaClinicMedical />}
            />
          </Flex>
        </Flex>
      </ScrollArea>
    );
};

export default ServiceDetails;
