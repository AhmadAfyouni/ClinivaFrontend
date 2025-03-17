import {ComboboxItem, Select, useMantineTheme } from '@mantine/core';

interface Props {
  options: string[];
  placeHolder: string;
  onChange: (value: string | null, option: ComboboxItem) => void;
}

const Dropdown = ({ placeHolder, options, onChange }: Props) => {
    const theme = useMantineTheme(); 
  return (
    <div>
      <Select w='100px'
      mr='5px'
        placeholder={placeHolder}
        onChange={onChange}
        color={ theme.other.onSurfacePrimary}
        data={options} 
        clearable
        styles={{
          input: {
            backgroundColor:theme.other.secondaryLightColor,
            border: 'none',
            color: theme.other.onSurfacePrimary,
            fontWeight: 500,
            fontSize: '10px',
            borderRadius: '50px',
            '::placeholder': {
                color: theme.other.onSurfacePrimary,
              },
          },
          
          dropdown: {
            borderRadius: '8px',
          },
          item: {
            '&[data-selected]': {
              backgroundColor: '#e8f5e9',
              color: '#2A9D8F',
            },
            '&[data-hovered]': {
              backgroundColor: '#f0f9f0',
            },
          },
          rightSection: {
            pointerEvents: 'none',
          },
        }}
      />
    </div>
  );
};

export default Dropdown;
