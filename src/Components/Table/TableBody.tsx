import {
  Badge,
  Text,
  Flex,
  Table,
  useMantineTheme,
  Tooltip,
  Image,
  Skeleton,
  UnstyledButton,
} from "@mantine/core";
import { Edit2Icon, CircleAlert } from "lucide-react";
import { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
interface Props {
  th0: string;
  th1: string;
  th2: { value: string; width?: string };
  th3: { value: string; width?: string };
  th4: string;
  onEditClick?: () => void;
  onDeleteClick: () => void;
  // th4: string;
  imgUrl?: string;
  selection?: string[];
  onClick: () => void;
  setSelection?: (updater: (current: string[]) => string[]) => void;
  th5?:string,
  edit?:boolean
}
const TableBody = ({
  th0,
  th1,
  th2 = { value: "", width: "160px" },
  th3 = { value: "", width: "148px" },
  th4,
  onDeleteClick,
  onEditClick,
  imgUrl = "",
  onClick,
  th5,
  edit=true
}: Props) => {
  const theme = useMantineTheme();
  // const isMobile = useMediaQuery("(max-width: 576px)");
  // const isTablet = useMediaQuery("(min-width: 577px) and (max-width: 992px)");
  // const isComputer = useMediaQuery("(min-width: 993px)");
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const userId = localStorage.getItem("userId")
  console.log(th5);
  
  const getStatusBadge = (status: string) => {
    const statusColors = {
      true: { bg: theme.other?.Active },
      false: { bg: theme.other?.desActive },
      cancelled: { bg: theme.colors.myPrimary[6] },
      scheduled: { bg: theme.colors.myPrimary[2] },
      completed: { bg: theme.other.secondaryDarkColor },
    };
    const { bg } = statusColors[status as keyof typeof statusColors] || {
      bg: theme.other.bg,
    };

    const label =
      th4 === "true" ? "Active" : th4 === "false" ? "Inactive" : th4;
    return th4 === "true" || th4 === "false" ? (
      <Badge
        bg={bg}
        c={theme.other?.onSurfacePrimary}
        fz="11px"
        p="4px 10px"
        radius="20px"
        w={75}
      >
        {label}
      </Badge>
    ) : (
      <Text fz="11px" p="0" c={theme.other.onSurfacePrimary}>
        {label}
      </Text>
    );
  };

  // const getAvatarCircle = () => (
  //   <Box
  //     miw="30px"
  //     mih="30px"
  //     mr="10px"
  //     bg={theme.colors.myPrimary[4]}
  //     style={{
  //       borderRadius: "50%",
  //       display: "inline-block",
  //     }}
  //   ></Box>
  const getImageCircle = () => (
    <Flex
      w={30}
      h={30}
      bg={theme.other.bg}
      align="center"
      justify="center"
      style={{
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      {!loaded && !error && <Skeleton w={30} h={30} radius="xl" />}
      {!error && imgUrl ? (
        <Image
          src={imgUrl}
          w="100%"
          h="100%"
          alt="Uploaded Image"
          fit="cover"
          onLoad={() => setLoaded(true)}
          onError={() => {
            setLoaded(false);
            setError(true);
          }}
        />
      ) : error ? (
        <CiImageOn size={20} color={theme.other.onSurfaceSecondary} />
      ) : null}
    </Flex>
  );
  console.log(th3.width);

  console.log(th2);
  // const toggleRow = (id: string) => {
  //   setSelection((current) =>
  //     current.includes(id)
  //       ? current.filter((item) => item !== id)
  //       : [...current, id]
  //   );
  // };
  return (
    <Table.Tbody w="50px">
      {/* <Table.Tbody> */}
      <Table.Tr key={th0} bd={theme.other.bgSubtle}>
        {/* <Table.Td> 
          <CheckBox selection={selection} setToggle={toggleRow} id={th0} />
        </Table.Td> */}
        <Table.Td
          p="20px"
          w="100%"
          style={{ cursor: "pointer" }}
          onClick={onClick}
        >
          <Flex fz="11px" h="40px" w="100%" justify="space-between">
            {/* Desktop view ID and Name */}
            {/* {isComputer && (
              <Flex w="25%" justify="space-between" align="center"> */}

            {/* </Flex>
            )} */}

            {/* Mobile  Avatar, Name and ID */}
            {/* {(isMobile || isTablet) && (
              <Flex direction="row" align="center" w="150px">
                {imgUrl !== "" && getImageCircle()}
                <Flex align="start" ta="start" direction="column" w="130px">
                  <Text
                    fz="11px"
                    p="0"
                    c={theme.other.onSurfacePrimary}
                    truncate
                  >
                    {th1}
                  </Text>
                  <Text
                    fz="11px"
                    p="0"
                    c={theme.other.onSurfacePrimary}
                    truncate
                  >
                    {th0}
                  </Text>
                </Flex>
              </Flex>
            )} */}
            <Flex
              fz="11px"
              w="70px"
              c={theme.other.onSurfacePrimary}
              ta="start"
              align="center"
            >

              <Text pr="xs" fz="11px" p="0" c={theme.other.onSurfacePrimary} truncate>
                {th0}
              </Text>
                {imgUrl !== "" && getImageCircle()}
            </Flex>
            <Flex fz="11px" w="160px" c={theme.other.onSurfacePrimary}>
              <Flex
                align="center"
                ta="start"
                // justify='center'
                c={theme.other.onSurfacePrimary}
              >
                <Text  fz="11px" p="0" c={theme.other.onSurfacePrimary} truncate>
                  {th1}
                </Text>
              </Flex>
            </Flex>
            <Flex
              // w={th3.width !== "" ? th3.width : "110px"}
              w={{
                // base: th3.width !== "" ? th3.width : "90px",
                base: th2.width,
                md: th2.width ?? "148px",
              }}
              fz="11px"
              align="center"
              c={theme.other.onSurfacePrimary}
              style={{
                color: "#6b7280",
                textAlign: "start",
              }}
            >
              {th2.value}
            </Flex>

            <Flex
              fz="11px"
              w={th3.width ?? "110px"}
              ta="start"
              c={theme.other.onSurfacePrimary}
              align="center"
            >
              <Tooltip label={th3.value}>
                <Text fz="11px" p="0" c={theme.other.onSurfacePrimary} truncate>
                  {th3.value}
                </Text>
              </Tooltip>
            </Flex>

            <Flex
              w="106px"
              fz="11px"
              ta="start"
              align="center"
              c={theme.other.onSurfacePrimary}
            >
              {getStatusBadge(th4)}
              <Tooltip label={th4}>
                <Text
                  fz="11px"
                  p="0"
                  c={theme.other.onSurfacePrimary}
                  truncate
                ></Text>
              </Tooltip>
              {/* <Tooltip label={th4}>
                <Text fz="11px" p="0" c={theme.other.onSurfacePrimary} truncate>
                  {th4}
                </Text>
              </Tooltip> */}
            </Flex>
            <Flex
              w="110px"
              fz="11px"
              ta="center"
              align="center"
              c={theme.other.onSurfacePrimary}
            >
             {edit && <UnstyledButton
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click from bubbling to Table.Td
                  // handle edit logic here
                  onEditClick?.();
                  console.log("hello");
                }}
                p="5px"
                mr={10}
              >
                 <Edit2Icon size="20px" color={theme.other.onSurfaceSecondary} />
              </UnstyledButton>}
              <UnstyledButton
                
                p="5px"
              >
              {
              th5 === userId
              ? <Tooltip
                label={"This is your account"}
                withArrow
                position="top-end"
                transitionProps={{ transition: "pop-bottom-right" }}
              >
                <CircleAlert size="20px" color={theme.other.onSurfaceSecondary} />
              </Tooltip>:
              <RiDeleteBinLine
                  onClick={(e) => {
                      e.stopPropagation(); // Prevent click from bubbling to Table.Td
                      // handle edit delete here
                      console.log("hello"); 
                      onDeleteClick();
                    }}
                  size="20px"
                  color={theme.other.onSurfaceSecondary}
                />}  
              </UnstyledButton>
            </Flex>
          </Flex>
        </Table.Td>
      </Table.Tr>
    </Table.Tbody>
  );
};

export default TableBody;
