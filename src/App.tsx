import { Card, Flex } from "@mantine/core";
import "./App.css";
import { SideBar } from "./layout/SideBar/SideBar";
import NavBar from "./layout/NavBar/NavBar";
import AddUser from "./pages/User/AddUser";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

function App() {
  return (
    <Flex h={"100%"} direction={"row"} justify={"flex-start"}>
      <SideBar />
      <Flex w={"100%"} direction={"column"} justify={"start"} align={"center"}>
        <NavBar />
        <Card bg={"#FAF6F5"} w={"97%"} h={"100%"} mr={"xl"} ml={"xl"}>
          <AddUser />
        </Card>
      </Flex>
    </Flex>
  );
}

export default App;
