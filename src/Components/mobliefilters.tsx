import { SlidersHorizontal } from 'lucide-react'
import CircledButton from './CircledButton'
import { useMantineTheme } from '@mantine/core'

const MobileFilters = () => {
    const theme = useMantineTheme()
  return (
    <CircledButton margin="8px" bg={theme.other.secondaryLightColor}>
        <SlidersHorizontal size={27} color={theme.other.onSurfacePrimary} />
    </CircledButton>
  )
}

export default MobileFilters 
