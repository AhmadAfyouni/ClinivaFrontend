import { Avatar, Flex, Select, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import CustomListType from "../../types/CustomList/CustomListType";

export default function Pagination({ pagination }: CustomListType) {
  const { t } = useTranslation();
  return (
    <Flex justify={"space-between"} w={"100%"}>
      <Flex justify={"center"} align={"center"} gap={"lg"}>
        <Text ff={"Lato"} fw={400} c={"#717680"} size="12px" lh={"12px"}>
          {t("Showing")}
        </Text>
        <Select
          size="sm"
          onChange={(value) => pagination?.setCurrent_page(Number(value))}
          comboboxProps={{
            transitionProps: { transition: "pop", duration: 200 },
          }}
          checkIconPosition="left"
          rightSection={<IoIosArrowDown size={15} color={"#414651"} />}
          w="100px"
          radius="16px"
          variant="filled"
          styles={{
            input: {
              backgroundColor: "#E2F6EC",
              "&:focus": {
                backgroundColor: "#E2F6EC",
              },
              "&:hover": {
                backgroundColor: "#E2F6EC",
              },
            },
          }}
          placeholder={
            pagination?.current_page ? pagination.current_page.toString() : "10"
          }
          data={["5", "10", "15", "30"]}
        />
        <Text ff={"Lato"} fw={400} c={"#717680"} size="12px" lh={"12px"}>
          {t("Out of ") + pagination?.total_pages}
        </Text>
      </Flex>
      <Flex justify={"center"} align={"center"} gap={"lg"}>
        <IoIosArrowDown size={15} color={"#414651"} />
        <Avatar key={"1"} name="1" bg={"#00B48D"} />
      </Flex>
    </Flex>
  );
}
