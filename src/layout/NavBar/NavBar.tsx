import { Avatar, Flex, Text } from "@mantine/core";
import RTL from "../../Components/RTL";
import SwitchDarkMode from "../../Components/Dark";

function NavBar() {
  return (
    <Flex
      // bg={"blue"}
      w={"100%"}
      h={"10%"}
      px={"lg"}
      direction={"row"}
      justify={"space-between"}
      align={"center"}
    >
      <Text fw={"700"} size="1.5rem">
        Doctor
      </Text>

      <Flex gap={"lg"} direction={"row"} align={"center"}>
        <SwitchDarkMode />
        <RTL />
        <Avatar radius={"xl"} />
        <Flex w={"100%"} direction={"column"} align={"flex-start"}>
          <Text fw={"500"}>AbdElwahap</Text>
          <Text fw={"100"} size="0.8rem">
            Dev
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default NavBar;
