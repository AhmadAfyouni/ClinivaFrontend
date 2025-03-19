import { TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

interface Props{
    searchValue :string
    setSearchValue : (vlaue : string) =>void
}
export const SearchInput = ({searchValue , setSearchValue }:Props) => {
    
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value); 
      };
      
    return (
        <TextInput
            w="180px"
            fz="10px"
            placeholder="Search patient ,treatment "
            mb="md"
            leftSection={<IconSearch size={16} stroke={1.5} />}
            value={searchValue}
            onChange={handleSearchChange}
            mr="10px"
            />
    );
}
