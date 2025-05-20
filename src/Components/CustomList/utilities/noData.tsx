import {  Flex,Image, Text } from "@mantine/core";
import noData from '../../../assets/noData.svg'

export default function NoDataImage()
{
return <Flex justify={"center"} align={"Center"} direction={"column"}>
 <Image src={noData}  />
 <Text ff={"Lato"} fw={600} lh={"115%"} c={"#414651"} size="22px">No data to show</Text>

</Flex>
}