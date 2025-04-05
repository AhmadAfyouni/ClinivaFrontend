import { Card, Flex, Text } from "@mantine/core";

interface CardDateProps {
  month: string;
  weakDay: string;
}
function CardDate({ month, weakDay }: CardDateProps) {
  return (
    <Card
      w={"100%"}
      miw={"140px"}
      //   h={72}
      //   pt={12}
      //   pr={6}
      //   pb={12}
      //   pl={6}
      style={{ gap: "4px", borderRadius: "14px" }}
      bg={"white"}
    >
      <Flex direction={"column"} align={"center"}>
        <Text
          c={"#66615E"}
          style={{
            fontFamily: "Lato",
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "130%",
            letterSpacing: "0%",
            textAlign: "center",
          }}
        >
          {weakDay}
        </Text>
        <Text
          c={"#1A1615"}
          style={{
            fontFamily: "Lato",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "116%",
            letterSpacing: 0,
            textAlign: "center",
          }}
        >
          {month}
        </Text>
      </Flex>
    </Card>
  );
}

export default CardDate;
