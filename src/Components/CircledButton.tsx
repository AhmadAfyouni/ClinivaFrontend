import { Button} from '@mantine/core'
import { ReactNode } from 'react'
interface Props{
    children ?: ReactNode
    margin ?: string
    bg:string
}
const CircledButton = ({children ,margin ,bg}:Props) => {
  return (
    <Button
    bd={bg}
    onClick={() => {}}
    variant="filled"
    w='35px'
    h='35px'
    mr={margin}
    color="teal"
    radius="xl"
    size="35px"
    p='0'
  >
    {children}
  </Button>
  )
}

export default CircledButton