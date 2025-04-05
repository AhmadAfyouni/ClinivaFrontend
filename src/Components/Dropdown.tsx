import { ComboboxItem, Select, useMantineTheme } from "@mantine/core";


interface Props {
  options: string[];
  placeHolder: string;
  onChange: (value: string | null) => void;
}

const Dropdown = ({ placeHolder, options, onChange }: Props) => {

    const theme = useMantineTheme(); 
    
  return (
    <div>
      <Select w='110px'
      mr='5px'
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
              color: theme.other.onSurfacePrimary,
            },
          },

          option: {
            fontSize: '10px', 
            padding: '8px 4px', 
            '&[dataSelected]': {
              backgroundColor: theme.other.bgSubtle, 
              color: '#2A9D8F', 
            },
            '&[dataHovered]': {
              backgroundColor: theme.other.bgSubtle,
            },
          },
          dropdown: {
            borderRadius: '8px',
          },
        }}
      />
    </div>
  );
};

export default Dropdown;
