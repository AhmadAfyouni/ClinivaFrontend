import { Avatar, Flex, Text, Group, Burger } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import RTL from "../../Components/RTL";
import SwitchDarkMode from "../../Components/Dark";
import usePageTitleStore from "../../store/usePageTitleStore";
import useDrawerStore from "../../store/useDrawerStore";

function NavBar() {
  const title = usePageTitleStore((state) => state.title);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { opened, toggle } = useDrawerStore();

  return (
    <Flex
      // bg={"blue"}
      w={"100%"}
      h={"10%"}
      px={"lg"}
      direction={"row"}
      justify={"space-between"}
      align={"center"}
      style={{ padding: isMobile ? "8px" : "16px 24px" }}
    >
      <Group gap="md">
        {isMobile && <Burger opened={opened} onClick={toggle} size="sm" />}
        <Text fw={"700"} size={isMobile ? "1.2rem" : "1.5rem"}>
          {title}
        </Text>
      </Group>

      <Group gap={"lg"} visibleFrom="sm">
        <SwitchDarkMode />
        <RTL />
        <Avatar radius={"xl"} />
        <Flex direction={"column"} align={"flex-start"}>
          <Text fw={"500"}>AbdElwahap</Text>
          <Text fw={"100"} size="0.8rem">
            Dev
          </Text>
        </Flex>
      </Group>

      {/* Mobile view */}
      <Group gap={"md"} hiddenFrom="sm">
        <SwitchDarkMode />
        <RTL />
        <Avatar radius={"xl"} />
      </Group>
    </Flex>
  );
}

export default NavBar;
