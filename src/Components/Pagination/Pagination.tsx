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
  console.log(useStore);
  return (
    <Flex direction={"row"} gap={"xs"} key={"stackPagination"}>
      <Button
        key={"first"}
        onClick={() => {
          useStore.setCurrent_page(1);
        }}
        disabled={useStore.has_previous_page ? false : true}
      >
        <MdOutlineKeyboardDoubleArrowLeft />
      </Button>
      <Button
        key={"prev"}
        onClick={() => useStore.setCurrent_page(useStore.current_page - 1)}
        disabled={useStore.has_previous_page ? false : true}
        style={{ color: "primary.main", backgroundColor: "background.paper" }}
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
      >
        <IoIosArrowForward />
      </Button>
      <Button
        key={"last"}
        onClick={() => useStore.setCurrent_page(useStore.total_pages)}
        disabled={useStore.has_next_page ? false : true}
        style={{ color: "primary.main", backgroundColor: "background.paper" }}
      >
        <MdOutlineKeyboardDoubleArrowRight />
      </Button>
      <Select
        placeholder={useStore.items_per_page + "" || "Items per page"}
        data={["5", "10", "15", "20", "30"]}
        comboboxProps={{
          transitionProps: { transition: "rotate-right", duration: 200 },
        }}
        onChange={(value) => {
          useStore.setItems_per_page(typeof value === "number" ? value : 10);
          useStore.setReFetch(true);
        }}
      />
    </Flex>
  );
}

export default CustomPagination;
