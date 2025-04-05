import { Card, Flex, useMantineTheme, Text, Avatar } from "@mantine/core";
import follow from "../../assets/icons/extraInfo/follow.svg";
import calender from "../../assets/icons/extraInfo/calender.svg";
import newPerson from "../../assets/icons/extraInfo/newPerson.svg";
import symbol from "../../assets/icons/extraInfo/symbol.svg";
import CardInfo from "./extra/CardInfo";

function AppointmentExtraInfo() {
  const theme = useMantineTheme();

  return (
    <Card py={"lg"} ml={"lg"} w={"40%"} bg={"white"}>
      <Flex direction={"column"} gap={"lg"}>
        <Flex justify={"space-around"} w={"100%"}>
          <CardInfo
            color={theme.primaryColor}
            avatarL={calender}
            avatarR={symbol}
            number={51}
            textU={"Follow"}
            textD={"Up"}
          />
          <CardInfo
            color={theme.other.secondaryColor}
            avatarL={newPerson}
            avatarR={symbol}
            number={51}
            textU={"Follow"}
            textD={"Up"}
          />
          <CardInfo
            color={theme.primaryColor}
            avatarL={follow}
            avatarR={symbol}
            number={51}
            textU={"Follow"}
            textD={"Up"}
          />
        </Flex>
        <Flex
          direction={"column"}
          style={{ borderRadius: "5px" }}
          p={"xs"}
          bg={theme.colors.gray[0]}
        >
          <Text>On Going Appointment</Text>
          <Flex
            direction={"column"}
            bg={"white"}
            w={"100%"}
            style={{ borderRadius: "8px" }}
            mb={"xs"}
          >
            <Flex justify={"space-between"} align={"center"} p="xs">
              <Flex align={"center"}>
                <Avatar src={""} />
                <div>
                  <Text ff={"Lato"} c={theme.other.onSurfacePrimary} fw={"400"}>
                    Maurice Galley
                  </Text>
                  <Text
                    size="xs"
                    ff={"Lato"}
                    c={theme.other.onSurfaceSecondary}
                    fw={"400"}
                  >
                    PB-002{" "}
                  </Text>
                </div>
              </Flex>
              <div>
                <Text c={theme.other.onSurfacePrimary} size="xs" fw={"600"}>
                  Dr. David Carter
                </Text>
                <Text size="xs" c={theme.other.onSurfaceSecondary} fw={"400"}>
                  Laser Hair Removal{" "}
                </Text>
              </div>
            </Flex>
            <Flex
              w={"100%"}
              justify={"center"}
              style={{
                borderRadius: "10px",
                borderTop: "solid 1px",
                borderColor: "#E4E2DD",
              }}
            >
              <Text
                py={"11px"}
                ff={"Lato"}
                c={theme.other.onSurfacePrimary}
                fw={"400"}
                size="0.8rem"
              >
                Est. Time: 12:00 PM - 2:00 PM
              </Text>
            </Flex>
          </Flex>
          <Flex justify={"space-between"}>
            <Flex direction={"column"} gap={"xl"} w={"40%"}>
              <div>
                <Text c={theme.other.onSurfaceSecondary} fw={"400"} size="xs">
                  Details
                </Text>
                <Text>Male, 34 years olds</Text>
              </div>
              <div>
                <Text c={theme.other.onSurfaceSecondary} fw={"400"} size="xs">
                  Address
                </Text>
                <Text>45 Green Valley Road, Apt 12, New York, NY 10001</Text>
              </div>
            </Flex>

            <Flex direction={"column"} w={"40%"}>
              <Text c={theme.other.onSurfaceSecondary} fw={"400"} size="xs">
                Consultation Notes
              </Text>
              <Text>
                Maurice is responding well to the treatment, and further
                sessions may be required for complete results.
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          direction={"column"}
          style={{ borderRadius: "5px" }}
          p={"xs"}
          bg={theme.colors.gray[0]}
        >
          <text>Upcoming Appointments</text>
          <Flex justify={"space-between"}>
            <Flex w={"50%"}>
              <Avatar size={"lg"} />
              <div>
                <Text>Laura Bennett</Text>
                <Text c={theme.other.onSurfaceSecondary}>
                  Acne Treatment Dr. Emily Ross
                </Text>
              </div>
            </Flex>
            <Flex
              direction={"column"}
              justify={"start"}
              align={"end"}
              w={"40%"}
            >
              <Text>24 Sep 2028</Text>
              <Text c={theme.other.onSurfaceSecondary}>9:00 AM</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}

export default AppointmentExtraInfo;
