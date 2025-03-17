import { Checkbox, useMantineTheme } from '@mantine/core'

interface Props{
    selection :string[];
    id : string
    setToggle : (id:string) => void
}
const CheckBox = ({selection , setToggle , id}:Props) => {
      const theme = useMantineTheme();
    
    return (
    <Checkbox
            w='12px'
            iconColor={theme.other.onSurfacePrimary}
            c='blue'
            color={selection.includes(id) ? theme.other.secondaryColor : theme.other.bg}
            h='12px'
                type="checkbox"
                checked={selection.includes(id)}
                onChange={() => setToggle(id)}
                size='12px'
                style={{
                    borderRadius: '4px',
                    border: '1px solid #d1d5db',
                    cursor: 'pointer'
                }}
                />
    )
}

export default CheckBox