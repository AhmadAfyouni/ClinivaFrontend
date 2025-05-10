import { Flex, Pagination, Select, Text, useMantineTheme } from "@mantine/core";
import PaginationType from "../../types/PaginationControl";
import { HiDotsHorizontal } from "react-icons/hi";
import React from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

interface PaginationIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

interface Props {
  store: PaginationType;
}

function CustomPagination({ store: useStore }: Props) {
  const theme = useMantineTheme();
  // Create function components for each icon
  const NextIcon = (props: PaginationIconProps) => (
    <MdOutlineKeyboardArrowRight {...props} />
  );
  const PrevIcon = (props: PaginationIconProps) => (
    <MdOutlineKeyboardArrowLeft {...props} />
  );
  const FirstIcon = (props: PaginationIconProps) => (
    <MdOutlineKeyboardDoubleArrowLeft {...props} />
  );
  const LastIcon = (props: PaginationIconProps) => (
    <MdOutlineKeyboardDoubleArrowRight {...props} />
  );
  const DotsIcon = (props: PaginationIconProps) => (
    <HiDotsHorizontal {...props} />
  );
  console.log(useStore);
  return (
    <Flex justify="space-between" h="30px">
      {useStore.total_items !== 0 && (
        <Flex>
          <Text
            style={{ alignContent: "center" }}
            fz="13px"
            c={theme.other.onSurfaceTertiary}
            mr="6px"
          >
            showing
          </Text>
          <Select
            radius="xl"
            w="55px"
            h="30px"
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
            styles={{
              input: {
                backgroundColor: theme.other.secondaryLightColor,
                color: theme.other.onSurfaceTertiary,
              },
              dropdown: {
                color: theme.other.onSurfaceTertiary,
                backgroundColor: theme.other.bg,
              },
            }}
          />
          <Text
            style={{ alignContent: "center" }}
            fz="13px"
            c={theme.other.onSurfaceTertiary}
            ml="6px"
          >
            out of {useStore.total_items}
          </Text>
        </Flex>
      )}
      <Pagination
        total={useStore.total_pages}
        radius="xl"
        withEdges
        siblings={0}
        nextIcon={NextIcon}
        previousIcon={PrevIcon}
        firstIcon={FirstIcon}
        lastIcon={LastIcon}
        dotsIcon={DotsIcon}
        value={useStore.current_page}
        onChange={(page) => useStore.setCurrent_page(page)}
        color={theme.other.secondaryDarkColor}
      />
    </Flex>
  );
}

export default CustomPagination;
