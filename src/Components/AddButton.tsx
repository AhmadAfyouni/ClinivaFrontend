import { Button, Text, useMantineTheme } from "@mantine/core";
interface Props {
  text: string;
  handleOnClick: () => void;
}
const AddButton = ({ text, handleOnClick }: Props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useMantineTheme();
  return (
    <Button
      bd={theme.other.secondaryDarkColor}
      onClick={handleOnClick}
      variant="filled"
      w="fit-content"
      h="35px"
      mr="5px"
      color="teal"
      radius="xl"
      size="35px"
      p="0"
    >
      <Text
        fw="normal"
        fz="20px"
        p="10px 12px"
        c={theme.other?.onSurfacePrimary}
      >
        +
      </Text>
      <Text
        fw="normal"
        fz="11px"
        pr="8px"
        c={theme.other?.onSurfacePrimary}
        visibleFrom="xs"
      >
        {text}
      </Text>
    </Button>
  );
};

export default AddButton;
