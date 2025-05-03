import { ActionIcon, Text, Tooltip } from "@mantine/core";
import { useTranslation } from "react-i18next";

export default function RTL() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const toggleLanguage = () => {
    // i18n.changeLanguage(isRTL ? "en" : "ar");
  };

  return (
    <Tooltip label={isRTL ? "العربية" : "English"}>
      <ActionIcon
        onClick={toggleLanguage}
        variant="subtle"
        radius="md"
        size="lg"
      >
        <Text>{isRTL ? "AR" : "EN"}</Text>
      </ActionIcon>
    </Tooltip>
  );
}
