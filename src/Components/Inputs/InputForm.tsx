import { Flex, Text, Grid, Button } from "@mantine/core";
import InputPropsType from "../../types/InputsType";
import InputBaseCustom from "./InputBase";
interface Props {
  base: InputPropsType[];
  count: number;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
function InputForm({ base, onSubmit }: Props) {
  return (
    <form
      onSubmit={(e) => {
        onSubmit(e);
      }}
    >
      <Flex
        // bg={"grape"}
        w={"100%"}
        h={"600px"}
        direction={"column"}
        justify={"center"}
        align={"center"}
        gap={"xl"}
        style={{ overflowY: "auto" }}
      >
        <Flex
          bg={"blue"}
          w={"100%"}
          // h={"2%"}
          direction={"row"}
          justify={"flex-start"}
          align={"center"}
        >
          <Text fw={"500"}>New Doctor</Text>
        </Flex>

        <Grid w={"95%"} h={"100%"} mb={"xl"}>
          {base.map((attr) => (
            <Grid.Col span={6} key={attr.id}>
              <InputBaseCustom base={attr} key={attr.id} />
            </Grid.Col>
          ))}
          <Button type="submit" bg={"#9BDABB"} mt="md" w="70%">
            Submit
          </Button>
        </Grid>
      </Flex>
    </form>
  );
}

export default InputForm;
