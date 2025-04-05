import { Avatar, Card, Flex, Text } from "@mantine/core";
interface Props {
  avatarL: string;
  avatarR: string;
  textU: string;
  textD: string;
  number: number;
  color: string;
}
function CardInfo(props: Props) {
  return (
    <Card bg={props.color} px={"5px"} w={"30%"}>
      <Flex direction={"column"} gap={"xs"}>
        <Flex justify={"space-between"} w={"100%"}>
          <Avatar src={props.avatarL} />
          <Avatar src={props.avatarR} />
        </Flex>
        <div>
          <Text>{props.textU}</Text>
          <Text>{props.textD}</Text>
        </div>
        <Text size="1.5rem" fw={"600"}>
          {props.number}
        </Text>
      </Flex>
    </Card>
  );
}

export default CardInfo;
