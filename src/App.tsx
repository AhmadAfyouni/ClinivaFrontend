import { Card, Flex } from "@mantine/core";
import "./App.css";
import InputForm from "./Components/Inputs/InputForm";
import { SideBar } from "./layout/SideBar/SideBar";
import NavBar from "./layout/NavBar/NavBar";

function App() {
  return (
    <Flex h={"100%"} direction={"row"} justify={"flex-start"}>
      <SideBar />
      <Flex w={"100%"} direction={"column"} justify={"start"} align={"center"}>
        <NavBar />
        <Card bg={"#FAF6F5"} w={"97%"} h={"100%"} mr={"xl"} ml={"xl"}>
          <InputForm />
        </Card>
      </Flex>
    </Flex>
  );
}

export default App;
