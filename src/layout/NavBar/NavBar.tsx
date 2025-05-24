import {
  Avatar,
  Flex,
  Text,
  Group,
  Burger,
  Menu,
  UnstyledButton,
  Button,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconLogout } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import RTL from "../../Components/RTL";
import SwitchDarkMode from "../../Components/Dark";
import usePageTitleStore from "../../store/usePageTitleStore";
import useDrawerStore from "../../store/useDrawerStore";
import ConfirmDialog from "../../pages/ConfirmDialog";
import { useConfirmDialogStore } from "../../store/useConfirmDialog";
interface Props {
  login: boolean;
}
function NavBar({ login }: Props) {
  const title = usePageTitleStore((state) => state.title);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { opened, toggle } = useDrawerStore();
  const navigate = useNavigate();
  // const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const handleLogout = () => {
    console.log("Logging out...");
    const emailsUsed = localStorage.getItem("usedEmails");
    sessionStorage.clear();
    localStorage.clear();
    if (emailsUsed) {
      localStorage.setItem("usedEmails", emailsUsed);
    }
    navigate("/login");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  // const handleSettings = () => {
  //   console.log("Navigating to settings...");
  // };
  const userName = localStorage.getItem("userName");
  const role = localStorage.getItem("role");

  const { isConfirmOpen, openConfirmDialog, closeConfirmDialog } =
    useConfirmDialogStore();
  if (isLoginPage) return null;
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
        {login ? (
          <Text
            fw={"700"}
            size={isMobile ? "1.2rem" : "1.5rem"}
            style={{ cursor: "pointer" }}
          >
            {title !== "login" && title}
          </Text>
        ) : location.pathname !== "/login" ? (
          <Button variant="subtle" onClick={handleLogin}>
            Login
          </Button>
        ) : (
          ""
        )}
      </Group>

      <Group gap={"lg"} visibleFrom="sm">
        <SwitchDarkMode />
        <RTL />
        {login && (
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Group gap="sm" style={{ cursor: "pointer" }}>
                <Avatar radius={"xl"} />
                <Flex direction={"column"} align={"flex-start"}>
                  <Text fw={"500["}>{userName}</Text>
                  <Text
                    style={{
                      fontWeight: 400,
                      fontSize: 11,
                      lineHeight: "124%",
                      letterSpacing: 0,
                      color: "#B8B1A9",
                    }}
                  >
                    {role}
                  </Text>
                  {/* <Text fw={"100"} size="0.8rem">
                    Dev
                  </Text> */}
                </Flex>
              </Group>
            </Menu.Target>
            <Menu.Dropdown>
              {/* <Menu.Item
                leftSection={<IconSettings size={14} />}
                onClick={handleSettings}
              >
                Settings
              </Menu.Item> */}
              <Menu.Divider />
              <Menu.Item
                leftSection={<IconLogout size={14} />}
                // onClick={handleLogout}
                onClick={() => {
                  openConfirmDialog();
                }}
                color="red"
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Group>

      {/* Mobile view */}
      <Group gap={"md"} hiddenFrom="sm">
        <SwitchDarkMode />
        <RTL />

        <Menu shadow="md" width={200}>
          <Menu.Target>
            <UnstyledButton>
              <Avatar radius="xl" />
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Settings</Menu.Label>
            <Menu.Item>Profile</Menu.Item>
            <Menu.Item>Settings</Menu.Item>
            <Menu.Divider />
            <Menu.Item
              color="red"
              //  onClick={handleLogout}
              onClick={() => {
                openConfirmDialog();
              }}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <ConfirmDialog
        opened={isConfirmOpen}
        onClose={() => {
          // setSelectedId(null);
          closeConfirmDialog();
        }}
        confirm="Logout"
        areYouSure="Are you sure you want to log out?"
        onConfirm={() => handleLogout()}
      />
    </Flex>
  );
}

export default NavBar;
