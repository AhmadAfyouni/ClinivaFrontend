import {Text, useMantineTheme } from "@mantine/core";
import CircledButton from "./CircledButton";

const AddButton = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useMantineTheme()
  return (
    <CircledButton bg={theme.other.secondaryDarkColor} w="fit-content" h="35px" margin="5px">
        <Text
        fw="normal"
        fz="20px"
        p='10px 12px'
        c={theme.other?.onSurfacePrimary}
      >
        +
      </Text>
        <Text
        fw="normal"
        fz="11px"
        pr='8px'
        c={theme.other?.onSurfacePrimary}
        visibleFrom="sm"
      >
        add User
      </Text>
    </CircledButton>
  );
};

export default AddButton;
