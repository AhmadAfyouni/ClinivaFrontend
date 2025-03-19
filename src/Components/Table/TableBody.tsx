import { Badge,Text, Flex, Table, useMantineTheme , Box} from "@mantine/core";
import  { ReactNode} from 'react'
import useSelectionStore from "../../store/useSelectionStore";
import CheckBox from "./CheckBox";
interface Props{
    id:string;
    name :string;
    date :ReactNode;
    time:ReactNode;
    doctor:string;
    treatment:string;
    status: string
}
const TableBody = ({ id , name , date , time , doctor , treatment , status }:Props) => {
  const theme = useMantineTheme();
  const { selection, setSelection } = useSelectionStore();
      const getStatusBadge = (status: string) => {
        const statusColors = {
          Completed: { bg: theme.other?.secondaryDarkColor, },
          'In Progress': { bg: theme.other?.primaryColor},
          Pending: { bg: theme.other?.borderDefault}
        };
    
        const {bg} = statusColors[status as keyof typeof statusColors] || statusColors.Pending;
        return (
          <Badge 
          bg={bg} c={theme.other?.onSurfacePrimary} ff="Lato" fz='9px' p='4px 10px' radius='20px'>
            {status}
          </Badge>
        );
      };

      const getAvatarCircle = () => (
        <Box w='30px' h='30px' mr='10px' bg={theme.colors.myPrimary[4]}
        style={{
          borderRadius: '50%',
          display: 'inline-block',
        }}
        ></Box>
      );

      const toggleRow = (id:string) => {
        setSelection((current) =>current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        );
      };


  return (
    <Table.Tbody>
    <Table.Tr key={id} bd={theme.other.bgSubtle}>
      <Table.Td>
        <CheckBox selection={selection} setToggle={toggleRow} id={id} />
      </Table.Td>
      
      <Table.Td p={0} w='100%'>
        <Flex fz='11px' h='50px' w='97%' justify='space-between'>
          {/* Desktop view ID and Name */}
          <Flex visibleFrom="md" w='30%' justify='space-between'>
            <Box fz='11px' w='70px' p='16px 4px' c={theme.other.onSurfacePrimary} ta='start'>
              {id}
            </Box>
            <Box fz='11px' w='130px' p='16px 4px' c={theme.other.onSurfacePrimary}>
              <Flex align='center' ta='start' c={theme.other.onSurfacePrimary}>
                {getAvatarCircle()}
                {name}
              </Flex>
            </Box>
          </Flex>
          
          {/* Mobile  Avatar, Name and ID */}
          <Flex hiddenFrom="md" direction='row' align='center' w='120px'>
            {getAvatarCircle()}
            <Flex direction='column' w='130px' align='start'>
              <Text fz='11px' p='0' c={theme.other.onSurfacePrimary}>{name}</Text>
              <Text fz='11px' p='0' c={theme.other.onSurfacePrimary}>{id}</Text>
            </Flex>
          </Flex>

          <Flex w={{ base: '90px', md: '148px' }}>
            <Box fz='11px' c={theme.other.onSurfacePrimary} style={{ padding: '16px 4px', color: '#6b7280', textAlign: 'start' }}>
              {date} - {time}
            </Box>
          </Flex>
          
          <Box fz='11px' p='16px 4px' w='110px' ta='start' c={theme.other.onSurfacePrimary}>
            {doctor}
          </Box>
          
          <Box w='106px' p='16px 4px' fz='11px' ta='start' c={theme.other.onSurfacePrimary}>
            {treatment}
          </Box>
          
          <Box w='110px' p='16px 4px' fz='11px' ta='start' c={theme.other.onSurfacePrimary}>
            {getStatusBadge(status)}
          </Box>
        </Flex>
      </Table.Td>
    </Table.Tr>
  </Table.Tbody>
  )
}

export default TableBody

