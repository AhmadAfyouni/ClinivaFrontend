import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Button, Flex, Select } from "@mantine/core";
import PaginationType from "../../types/PaginationControl";

interface Props {
  store: PaginationType;
}

function CustomPagination({ store: useStore }: Props) {
  // console.log(useStore);
  return (
    <Flex direction={"row"} gap={"xs"} key={"stackPagination"} pt={"xs"}>
      <Button
        key={"first"}
        onClick={() => {
          useStore.setCurrent_page(1);
        }}
        disabled={useStore.has_previous_page ? false : true}
        size="xs"
        radius="xl"
      >
        <MdOutlineKeyboardDoubleArrowLeft />
      </Button>
      <Button
        key={"prev"}
        onClick={() => useStore.setCurrent_page(useStore.current_page - 1)}
        disabled={useStore.has_previous_page ? false : true}
        style={{ color: "primary.main", backgroundColor: "background.paper" }}
        size="xs"
        radius="xl"
      >
        <IoIosArrowBack />
      </Button>
      <Button
        key={"next"}
        onClick={() => {
          useStore.setCurrent_page(useStore.current_page + 1);
        }}
        style={{ color: "primary.main", backgroundColor: "background.paper" }}
        disabled={useStore.has_next_page ? false : true}
        size="xs"
        radius="xl"
      >
        <IoIosArrowForward />
      </Button>
      <Button
        key={"last"}
        onClick={() => {
          useStore.setCurrent_page(useStore.total_pages);
        }}
        disabled={useStore.has_next_page ? false : true}
        style={{ color: "primary.main", backgroundColor: "background.paper" }}
        size="xs"
        radius="xl"
      >
        <MdOutlineKeyboardDoubleArrowRight />
      </Button>
      <Select
        w="90px"
        placeholder={useStore.items_per_page + "" || "Items per page"}
        data={["5", "10", "15", "20", "30"]}
        comboboxProps={{
          transitionProps: { transition: "rotate-right", duration: 200 },
        }}
        onChange={(value) => {
          useStore.setItems_per_page(Number(value));
          useStore.setReFetch(true);
        }}
        size="xs"
      />
    </Flex>
  );
}

export default CustomPagination;
