import { Select } from "@mantine/core";
import { IoIosArrowDown } from "react-icons/io";
import CustomListType from "../../types/CustomList/CustomListType";

export default function FilterCustom({FiltersTable}:CustomListType){
    return(
        FiltersTable.map((item) => (
        <Select      
        size="sm"
        onChange={(value) => item.setFilterValue(value as string)}
        comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
        checkIconPosition="left"
        rightSection={<IoIosArrowDown size={15} color={"#414651"} />} w="100px" radius="16px" variant="filled"    
        styles={{
            input: {
              backgroundColor: '#E2F6EC',
              '&:focus': {
                backgroundColor: '#E2F6EC'
              },
              '&:hover': {
                backgroundColor: '#E2F6EC'
              }
            }
          }} placeholder={item.title} data={item.values} />
          ))
    )
    
}