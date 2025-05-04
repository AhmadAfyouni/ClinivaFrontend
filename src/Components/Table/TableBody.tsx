import {
  Badge,
  Text,
  Flex,
  Table,
  useMantineTheme,
  Box,
  Tooltip,
  Image,
  Skeleton,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { CiImageOn } from "react-icons/ci";
interface Props {
  th0: string;
  th1: string;
  th2: string;
  th3: string;
  th4: string;
  th5: string;
  imgUrl?: string;
  selection: string[];
  onClick: () => void;
  setSelection: (updater: (current: string[]) => string[]) => void;
}
const TableBody = ({
  th0,
  th1,
  th2,
  th3,
  th4,
  th5,
  imgUrl = "",
  // selection,
  // setSelection,
  onClick,
}: Props) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 576px)");
  const isTablet = useMediaQuery("(min-width: 577px) and (max-width: 992px)");
  const isComputer = useMediaQuery("(min-width: 993px)");
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const getStatusBadge = (status: string) => {
    const statusColors = {
      true: { bg: theme.other?.secondaryDarkColor },
      false: { bg: theme.primaryColor },
      cancelled: { bg: theme.colors.myPrimary[6] },
      scheduled: { bg: theme.colors.myPrimary[2] },
      completed: { bg: theme.other.secondaryDarkColor },
    };
    const { bg } = statusColors[status as keyof typeof statusColors] || {
      bg: theme.other.bg,
    };

    const label =
      th5 === "true" ? "Active" : th5 === "false" ? "Inactive" : th5;
    return th5 === "true" || th5 === "false" ? (
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

  // const toggleRow = (id: string) => {
  //   setSelection((current) =>
  //     current.includes(id)
  //       ? current.filter((item) => item !== id)
  //       : [...current, id]
  //   );
  // };
  return (
    <Table.Tbody>
      {/* <Table.Tbody> */}
      <Table.Tr key={th0} bd={theme.other.bgSubtle}>
        {/* <Table.Td>
          <CheckBox selection={selection} setToggle={toggleRow} id={th0} />
        </Table.Td> */}

        <Table.Td
          p={0}
          w="100%"
          onClick={onClick}
          style={{ cursor: "pointer" }}
        >
          <Flex fz="11px" h="50px" w="97%" justify="space-between">
            {/* Desktop view ID and Name */}
            {isComputer && (
              <Flex w="25%" justify="space-between" align="center">
                <Box
                  fz="11px"
                  w="70px"
                  p="16px 4px"
                  c={theme.other.onSurfacePrimary}
                  ta="start"
                >
                  <Text
                    fz="11px"
                    p="0"
                    c={theme.other.onSurfacePrimary}
                    truncate
                  >
                    {th0}
                  </Text>
                </Box>
                <Box
                  fz="11px"
                  w="160px"
                  p="16px 4px"
                  c={theme.other.onSurfacePrimary}
                >
                  <Flex
                    align="center"
                    ta="start"
                    // justify='center'
                    c={theme.other.onSurfacePrimary}
                  >
                    {imgUrl !== "" && getImageCircle()}
                    <Text
                      fz="11px"
                      p="0"
                      c={theme.other.onSurfacePrimary}
                      truncate
                    >
                      {th1}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            )}

            {/* Mobile  Avatar, Name and ID */}
            {(isMobile || isTablet) && (
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
            )}

            <Flex w={{ base: "90px", md: "148px" }}>
              <Box
                fz="11px"
                c={theme.other.onSurfacePrimary}
                style={{
                  padding: "16px 4px",
                  color: "#6b7280",
                  textAlign: "start",
                }}
              >
                {th2}
              </Box>
            </Flex>

            <Box
              fz="11px"
              p="16px 4px"
              w="110px"
              ta="start"
              c={theme.other.onSurfacePrimary}
            >
              <Tooltip label={th3}>
                <Text fz="11px" p="0" c={theme.other.onSurfacePrimary} truncate>
                  {th3}
                </Text>
              </Tooltip>
            </Box>

            <Box
              w="106px"
              p="16px 4px"
              fz="11px"
              ta="start"
              c={theme.other.onSurfacePrimary}
            >
              <Tooltip label={th4}>
                <Text fz="11px" p="0" c={theme.other.onSurfacePrimary} truncate>
                  {th4}
                </Text>
              </Tooltip>
            </Box>

            <Box
              w="110px"
              p="16px 4px"
              fz="11px"
              ta="start"
              c={theme.other.onSurfacePrimary}
            >
              {getStatusBadge(th5)}
              <Tooltip label={th5}>
                <Text
                  fz="11px"
                  p="0"
                  c={theme.other.onSurfacePrimary}
                  truncate
                ></Text>
              </Tooltip>
            </Box>
          </Flex>
        </Table.Td>
      </Table.Tr>
    </Table.Tbody>
  );
};

export default TableBody;
