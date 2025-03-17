import { Button, useMantineTheme } from '@mantine/core'
import { ReactNode } from 'react'
interface Props{
    children ?: ReactNode
    margin ?: string
}
const CircledButton = ({children ,margin}:Props) => {
  const theme =useMantineTheme()
  return (
    <Button
    c={theme.other.secondaryLightColor}
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