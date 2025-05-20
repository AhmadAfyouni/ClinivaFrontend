import { Table, Group } from '@mantine/core';
import CustomListType from '../../types/CustomList/CustomListType';
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

export default function CustomTable(Props:CustomListType) {
   
 

  // Find the maximum length among all Tbody arrays
  const maxRows = Math.max(...Props.TableFields.map(field => field.Tbody.length));
  
  return (
    <Table.ScrollContainer w={"100%"} minWidth={Props.TableFields.length * 100}>
      <Table bg={"white"} style={{borderRadius:"16px"}} w={"100%"} striped>
        <Table.Thead>
          <Table.Tr >
            {Props.TableFields.map((item) => (
              <Table.Th fs={"Lato"} c={"#414651"} fw={600} p={"lg"} w={item.width} key={item.Thead}>{item.Thead}</Table.Th>
            ))}
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {Array.from({ length: maxRows }).map((_, rowIndex) => (
            <Table.Tr key={`row-${rowIndex}`}>
              {Props.TableFields.map((field, colIndex) => (
                <Table.Td fs={"Lato"} c={"#414651"} fw={400} pl={"lg"} key={`cell-${rowIndex}-${colIndex}`}>
                  {field.Tbody[rowIndex] || ''}
                </Table.Td>
              ))}
              <Table.Td>
                <Group gap="lg" justify="left">
                 {Props.HasPermissionToEdit && <FiEdit2 size={20} color={"#717680"} onClick={() => {}} style={{ cursor: 'pointer' }} />}
                  {Props.HasPermissionToDelete && <RiDeleteBinLine size={20}  color={"#717680"} onClick={() => Props.handleDelete('id')} style={{ cursor: 'pointer' }} />}
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}