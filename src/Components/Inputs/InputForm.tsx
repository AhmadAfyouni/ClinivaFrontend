import { Text, Flex } from "@mantine/core";
import InputTooltip from "./Base/Inputs_with_tooltip";

function InputForm() {
  return (
    <Flex
      w={"100%"}
      direction={"column"}
      justify={"center"}
      align={"center"}
      gap={"xl"}
    >
      <Flex
        w={"100%"}
        direction={"row"}
        justify={"flex-start"}
        align={"center"}
      >
        <Text fw={"500"}>New Doctor</Text>
      </Flex>

      <Flex
        w={"100%"}
        direction={"row"}
        justify={"space-around"}
        align={"center"}
        gap={"lg"}
      >
        <InputTooltip
          label="Name"
          placeholder="Kaled "
          tooltip="Enter the name !"
          type="text"
        />
        <InputTooltip
          label="email"
          placeholder="expmple@gmail.com"
          tooltip="enter the email !"
          type="text"
        />
      </Flex>
    </Flex>
  );
}

export default InputForm;
