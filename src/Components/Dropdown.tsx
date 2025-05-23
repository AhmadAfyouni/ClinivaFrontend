import { Select, useMantineTheme } from "@mantine/core";
import useDropDownStore from "../store/Dropdown/useDropDownStore ";

interface Props {
  options: string[];
  placeHolder: string;
  onChange: (value: string | null) => void;
  dropDownName: string;
}

const Dropdown = ({ placeHolder, options, onChange, dropDownName }: Props) => {
  const theme = useMantineTheme();
  const { selectedOption } = useDropDownStore();
  const value = selectedOption[dropDownName] ?? null;
  return (
    <>
      <Select
        value={value}
        w="110px"
        mr="5px"
        mb="10px"
        placeholder={placeHolder}
        onChange={onChange}
        color={theme.other.onSurfacePrimary}
        data={options}
        clearable
        styles={{
          input: {
            backgroundColor: theme.other.secondaryLightColor,
            border: "none",
            color: theme.other.onSurfacePrimary,
            fontWeight: 500,
            fontSize: "10px",
            borderRadius: "50px",
            "::placeholder": {
              c: theme.other.onSurfacePrimary,
            },
          },

          option: {
            fontSize: "10px",
            padding: "8px 4px",
            "&[dataSelected]": {
              backgroundColor: theme.other.bgSubtle,
              c: theme.other.secondaryColor,
            },
            "&[dataHovered]": {
              backgroundColor: theme.other.bgSubtle,
              c: theme.other.secondaryColor,
            },
          },
          dropdown: {
            borderRadius: "8px",
          },
        }}
      />
    </>
  );
};

export default Dropdown;
