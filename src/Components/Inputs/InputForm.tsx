import { Flex, Text, Grid, Button, useMantineTheme } from "@mantine/core";
import InputPropsType from "../../types/InputsType";
import InputBaseCustom from "./InputBase";
interface Props {
  base: InputPropsType[];
  count: number;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title?: string;
  with_submit?: boolean;
}
function InputForm({ base, title, onSubmit, with_submit = true }: Props) {
  const theme = useMantineTheme();
  return (
    <form
      onSubmit={(e) => {
        console.log("omsubmit", e);
        onSubmit(e);
      }}
    >
      <Flex
        // bg={"grape"}
        w={"100%"}
        h={"100%"}
        direction={"column"}
        justify={"center"}
        align={"center"}
        gap={"xl"}
        style={{ overflowY: "auto" }}
      >
        {title ? (
          <Flex
            // bg={"blue"}
            w={"100%"}
            // h={"2%"}
            direction={"row"}
            justify={"flex-start"}
            align={"center"}
          >
            <Text c={theme.other.onSurfaceSecondary} fw={"800"}>
              {title}
            </Text>
          </Flex>
        ) : (
          <></>
        )}

        <Grid w={"95%"} h={"100%"} mb={"xl"}>
          {base.map((attr) => (
            <Grid.Col span={{ base: 12, sm: 6 }} key={attr.id}>
              <InputBaseCustom base={attr} key={attr.id} />
            </Grid.Col>
          ))}
          {with_submit ? (
            <Button type="submit" bg={"#9BDABB"} mt="md" w="70%">
              Submit
            </Button>
          ) : (
            <></>
          )}
        </Grid>
      </Flex>
    </form>
  );
}

export default InputForm;
