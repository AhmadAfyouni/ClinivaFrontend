// import { ActionIcon, Text, Tooltip } from "@mantine/core";
// import { useTranslation } from "react-i18next";

// export default function RTL() {
//   const { i18n } = useTranslation();
//   const isRTL = i18n.language === "ar";

//   const toggleLanguage = () => {
//     i18n.changeLanguage(isRTL ? "en" : "ar");
//   };

//   return (
//     <Tooltip label={isRTL ? "العربية" : "English"}>
//       <ActionIcon
//         onClick={toggleLanguage}
//         variant="subtle"
//         radius="md"
//         size="lg"
//       >
//         <Text>{isRTL ? "AR" : "EN"}</Text>
//       </ActionIcon>
//     </Tooltip>
//   );
// }

import { Menu, ActionIcon } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";

export default function RTL() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    localStorage.setItem("lang", lang); // Optional: Persist language preference
  };

  return (
    <Menu shadow="md" width={150}>
      <Menu.Target>
        <ActionIcon variant="subtle" radius="md" size="lg" title="Change language">
          {/* <IconLanguage /> */}
          <Languages />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {/* <Menu.Label>Choose Language</Menu.Label> */}
        <Menu.Item
          onClick={() => handleChangeLanguage("en")}
          disabled={currentLang === "en"}
        >
          English
        </Menu.Item>
        <Menu.Item
          onClick={() => handleChangeLanguage("ar")}
          disabled={currentLang === "ar"}
        >
          العربية
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
