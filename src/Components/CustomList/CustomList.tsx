import { Button, Flex, TextInput } from "@mantine/core";
import CustomListType from "../../types/CustomList/CustomListType";
import { Search } from "lucide-react";
import FilterCustom from "./Filter";
import CustomTable from "./Table";
import NoDataImage from "./utilities/noData";
import Pagination from "./Pagination";
export default function CustomList(Props: CustomListType) {
  return (
    <Flex direction="column" w={"100%"} gap={"xl"} h={"100%"}>
      <Flex justify="space-between">
        <Flex gap={"md"}>
          <TextInput
            leftSection={<Search size={15} color={"#414651"} />}
            radius="16px"
            variant="filled"
            placeholder={"Search for a " + Props.TableName}
            styles={{
              input: {
                backgroundColor: "white",
                "&:focus": {
                  backgroundColor: "white",
                },
                "&:hover": {
                  backgroundColor: "white",
                },
              },
            }}
          />
          <FilterCustom {...Props} />
        </Flex>
        <Flex>
          {Props.HasPermissionToAdd && (
            <Button radius="16px" fw="Lato" bg="#00B48D">
              {"+  Add New " + Props.TableName}
            </Button>
          )}
        </Flex>
      </Flex>
      <Flex mih={"68vh"} w={"100%"} justify={"center"} align={"flex-start"}>
        {Props.isEmpty ? <NoDataImage /> : <CustomTable {...Props} />}
      </Flex>
      <Flex>
        <Pagination {...Props} />{" "}
      </Flex>
    </Flex>
  );
}
