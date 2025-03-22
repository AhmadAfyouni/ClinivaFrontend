import { Badge,Text, Flex, Table, useMantineTheme , Box} from "@mantine/core";
import  { ReactNode} from 'react'
import useSelectionStore from "../../store/useSelectionStore";
import CheckBox from "./CheckBox";
interface Props{
    th0:string;
    th1 :string;
    th2 :ReactNode;
    th3:string;
    th4:string;
    th5: string
}
const TableBody = ({ th0 , th1 , th2 ,  th3 , th4 , th5 }:Props) => {
  const theme = useMantineTheme();
  const { selection, setSelection } = useSelectionStore();
      const getStatusBadge = (status: string) => {
        const statusColors = {
          active: { bg: theme.other?.secondaryDarkColor, },
          inactive: { bg: theme.primaryColor}
        };

        const {bg} = statusColors[status as keyof typeof statusColors] || {bg : theme.other.bg};
        return (
          <Badge 
          bg={bg} c={theme.other?.onSurfacePrimary} ff="Lato" fz='9px' p='4px 10px' radius='20px'>
            {th5}
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
    <Table.Tr key={th0} bd={theme.other.bgSubtle}>
      <Table.Td>
        <CheckBox selection={selection} setToggle={toggleRow} id={th0} />
      </Table.Td>
      
      <Table.Td p={0} w='100%'>
        <Flex fz='11px' h='50px' w='97%' justify='space-between'>
          {/* Desktop view ID and Name */}
          <Flex visibleFrom="md" w='25%' justify='space-between'>
            <Box fz='11px' w='70px' p='16px 4px' c={theme.other.onSurfacePrimary} ta='start'>
            <Text fz='11px' p='0' c={theme.other.onSurfacePrimary} truncate>{th0}</Text>
              
            </Box>
            <Box fz='11px' w='130px' p='16px 4px' c={theme.other.onSurfacePrimary}>
              <Flex align='center' ta='start' c={theme.other.onSurfacePrimary}>
                {getAvatarCircle()}
                <Text fz='11px' p='0' c={theme.other.onSurfacePrimary} truncate>{th1}</Text>
              </Flex>
            </Box>
          </Flex>
          
          {/* Mobile  Avatar, Name and ID */}
          <Flex hiddenFrom="md" direction='row' align='center' w='120px'>
            {getAvatarCircle()}
            <Flex direction='column' w='130px' align='start'>
              <Text fz='11px' p='0' c={theme.other.onSurfacePrimary} truncate>{th1}</Text>
              <Text fz='11px' p='0' c={theme.other.onSurfacePrimary} truncate>{th0}</Text>
            </Flex>
          </Flex>

          <Flex w={{ base: '90px', md: '148px' }}>
            <Box fz='11px' c={theme.other.onSurfacePrimary} style={{ padding: '16px 4px', color: '#6b7280', textAlign: 'start' }}>
              {th2}
            </Box>
          </Flex>
          
          <Box fz='11px' p='16px 4px' w='110px' ta='start' c={theme.other.onSurfacePrimary}>
            <Text fz='11px' p='0' c={theme.other.onSurfacePrimary} truncate>{th3}</Text>
          </Box>
          
          <Box w='106px' p='16px 4px' fz='11px' ta='start' c={theme.other.onSurfacePrimary}>
           <Text fz='11px' p='0' c={theme.other.onSurfacePrimary} truncate>{th4}</Text>
          </Box>
          
          <Box w='110px' p='16px 4px' fz='11px' ta='start' c={theme.other.onSurfacePrimary}>
            {getStatusBadge(th5.toLocaleLowerCase())}
          <Text fz='11px' p='0' c={theme.other.onSurfacePrimary} truncate>
          </Text>
          </Box>
        </Flex>
      </Table.Td>
    </Table.Tr>
  </Table.Tbody>
  )
}

export default TableBody

