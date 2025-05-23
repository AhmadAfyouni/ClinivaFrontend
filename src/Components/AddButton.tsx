import { Button, Text, useMantineTheme } from "@mantine/core";
import { useTranslation } from "react-i18next";
interface Props {
  text: string;
  handleOnClick: () => void;
}
const AddButton = ({ text, handleOnClick }: Props) => {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  return (
    <Button
      bg={theme.other.secondaryDarkColor}
      onClick={handleOnClick}
      variant="filled"
      w="113px"
      h="30px"
      mr="5px"
      color="teal"
      py="6px"
      px="10px "
      radius="xl"
      size="35px"
      p="0"
    >
      <Text
        fw="normal"
        fz="20px"
        mr="5px"
        color="white"
        // c={theme.other?.onSurfacePrimary}
      >
        +
      </Text>
      <Text
        fw="normal"
        fz="11px"
        // c={theme.other?.onSurfacePrimary}
        color="white"
        visibleFrom="xs"
      >
        {t(text)}
      </Text>
    </Button>
  );
};

export default AddButton;
