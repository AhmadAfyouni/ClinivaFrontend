import {
  Title,
  Text,
  Paper,
  ThemeIcon,
  Divider,
  useMantineTheme,
  Flex,
} from "@mantine/core";
import { Sparkles } from "lucide-react";

interface Props {
  title: string;
  content: string;
}
const TextTitle = ({ title, content }: Props) => {
  const theme = useMantineTheme();
  return (
    <Paper radius="md" bg={theme.other.bg}>
      <Flex>
        <ThemeIcon
          mr={10}
          size={18}
          radius="md"
          variant="light"
          c={theme.colors.myPrimary[5]}
        >
          <Sparkles size={24} />
        </ThemeIcon>
        <Title
          order={2}
          fz={18}
          lh={1.2}
          fw={600}
          c={theme.other.onSurfacePrimary}
        >
          {title}
        </Title>
      </Flex>

      <Divider mb="lg" variant="dashed" />

      <Text lh={1.6} c={theme.other.onSurfaceSecondary}>
        {content}
      </Text>
    </Paper>
  );
};

export default TextTitle;
