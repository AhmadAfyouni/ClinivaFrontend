import {
  Box,
  Button,
  Card,
  Flex,
  ScrollArea,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router";

function SelectPlan() {
  const navigate = useNavigate();

  const theme = useMantineTheme();
  const handelSelectPlan = (selectedPLan: number) => {
    localStorage.setItem("plan", selectedPLan.toString());
    navigate("/register");
  };
  return (
    <Box bg={theme.other.bg} w="100%" h="100vh">
      <Flex w="100%" justify="center" align="center">
        <Card
          bg={theme.other.bgSubtle}
          radius="xl"
          w={{ base: "95%", sm: "80%", md: "60%", lg: "50%" }}
          shadow="md"
        >
          <ScrollArea offsetScrollbars type="auto" h="100%" w="100%">
            <Flex direction="column" gap="xl" p="xl" w="100%" align="center">
              <Text size="xl" c={theme.primaryColor} fw={"800"}>
                Select Plan
              </Text>

              <Flex
                style={{
                  borderBottom: `2px solid ${theme.other.secondaryColor}`,

                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: theme.other.secondaryDarkColor,
                    transform: "translateY(-2px)",
                  },
                }}
                align={"center"}
                direction="row"
                w="100%"
              >
                <Flex direction="column" align="center" w="100%" p="md">
                  <Text fw={700} c={theme.other.onSurfacePrimary}>
                    Company
                  </Text>
                  <Text fw={300} c={theme.other.onSurfaceSecondary}>
                    Why Company
                  </Text>
                </Flex>
                <Button
                  onClick={() => handelSelectPlan(2)}
                  size="xl"
                  variant="subtle"
                >
                  {<IoIosArrowForward size={"50px"} />}
                </Button>
              </Flex>
              <Flex
                style={{
                  borderBottom: `2px solid ${theme.other.secondaryColor}`,

                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: theme.other.secondaryDarkColor,
                    transform: "translateY(-2px)",
                  },
                }}
                align={"center"}
                direction="row"
                w="100%"
              >
                <Flex direction="column" align="center" w="100%" p="md">
                  <Text fw={700} c={theme.other.onSurfacePrimary}>
                    Medical Complex
                  </Text>
                  <Text fw={300} c={theme.other.onSurfaceSecondary}>
                    Why Medical Complex
                  </Text>
                </Flex>
                <Button
                  onClick={() => handelSelectPlan(3)}
                  size="xl"
                  variant="subtle"
                >
                  {<IoIosArrowForward size={"50px"} />}
                </Button>
              </Flex>
              <Flex
                style={{
                  borderBottom: `2px solid ${theme.other.secondaryColor}`,

                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: theme.other.secondaryDarkColor,
                    transform: "translateY(-2px)",
                  },
                }}
                align={"center"}
                direction="row"
                w="100%"
              >
                <Flex direction="column" align="center" w="100%" p="md">
                  <Text fw={700} c={theme.other.onSurfacePrimary}>
                    Department
                  </Text>
                  <Text fw={300} c={theme.other.onSurfaceSecondary}>
                    Why Department
                  </Text>
                </Flex>
                <Button
                  onClick={() => handelSelectPlan(4)}
                  size="xl"
                  variant="subtle"
                >
                  {<IoIosArrowForward size={"50px"} />}
                </Button>
              </Flex>
              <Flex
                style={{
                  borderBottom: `2px solid ${theme.other.secondaryColor}`,

                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: theme.other.secondaryDarkColor,
                    transform: "translateY(-2px)",
                  },
                }}
                align={"center"}
                direction="row"
                w="100%"
              >
                <Flex direction="column" align="center" w="100%" p="md">
                  <Text fw={700} c={theme.other.onSurfacePrimary}>
                    Clinic{" "}
                  </Text>
                  <Text fw={300} c={theme.other.onSurfaceSecondary}>
                    Why Clinic
                  </Text>
                </Flex>
                <Button
                  onClick={() => handelSelectPlan(5)}
                  size="xl"
                  variant="subtle"
                >
                  {<IoIosArrowForward size={"50px"} />}
                </Button>
              </Flex>
            </Flex>
          </ScrollArea>
        </Card>
      </Flex>
    </Box>
  );
}

export default SelectPlan;
