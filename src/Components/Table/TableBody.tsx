import { Badge, Flex, Table, useMantineTheme} from "@mantine/core";
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
const TableBody = ({id,name ,date ,time,doctor ,treatment,status}:Props) => {
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
        <div
        style={{
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          backgroundColor: theme.colors.myPrimary[4],
          display: 'inline-block',
          marginRight: '10px'
        }}
        ></div>
      );

      const toggleRow = (id: any) => {
        setSelection((current) =>current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        );
      };


  return (
    <Table.Tr key={id} bd={theme.other.bgSubtle}>
        <Table.Td >
          <CheckBox selection={selection} setToggle={toggleRow} id={id} />
        </Table.Td>
        <Flex fz='11px' h='50px' w='97%' justify='space-between'>
          <Flex visibleFrom="md" w='30%' justify='space-between' >
          <Table.Td fz='11px' w='70px' p='16px 4px' c={theme.other.onSurfacePrimary} ta='start'>{id}</Table.Td>
            <Table.Td fz='11px' w='130px' p='16px 4px'  c={theme.other.onSurfacePrimary}>
              <Flex align='center' ta='start'  c={theme.other.onSurfacePrimary}>
                {getAvatarCircle()}
                {name}
              </Flex>
            </Table.Td>
          </Flex>
          <Flex hiddenFrom="md" direction='row' align='center' w='120px'>
            {getAvatarCircle()}
            <Flex direction='column' w='130px' align='start'>
              <Table.Td fz='11px' p='0'  c={theme.other.onSurfacePrimary}>{name}</Table.Td>
              <Table.Td fz='11px' p='0'  c={theme.other.onSurfacePrimary}>{id}</Table.Td>
            </Flex>
          </Flex>
          <Flex w={{ base: '90px', md: '148px' }}>
            <Table.Td fz='11px'  c={theme.other.onSurfacePrimary} style={{ padding: '16px 4px', color: '#6b7280',textAlign:'start'}}>{date} · {time}</Table.Td>
          </Flex>
            <Table.Td fz='11px'  p='16px 4px' w='110px'  ta='start' c={theme.other.onSurfacePrimary}  >{doctor}</Table.Td>
            <Table.Td w='106px'  p='16px 4px' fz='11px'  ta='start' c={theme.other.onSurfacePrimary}>{treatment}</Table.Td>
            <Table.Td  w='110px'  p='16px 4px' fz='11px'  ta='start' c={theme.other.onSurfacePrimary}>{getStatusBadge(status)}</Table.Td>
        </Flex>
      </Table.Tr>
  )
}

export default TableBody

