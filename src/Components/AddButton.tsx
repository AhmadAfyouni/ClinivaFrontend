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
      w="fit-content"
      h="35px"
      mr="5px"
      color="teal"
      radius="xl"
      size="35px"
      p="0 "
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
        p="0 8px"
        c={theme.other?.onSurfacePrimary}
        visibleFrom="xs"
      >
        {t(text)}
      </Text>
    </Button>
  );
};

export default AddButton;
