import { Flex, Loader, Overlay } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";

function LoaderCustom() {
  const queryClient = useQueryClient();
  const isPending = queryClient.isFetching() || queryClient.isMutating();

  if (!isPending) return null;

  return (
    <Overlay
      center
      fixed
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Flex justify="center" align="center" h="100vh">
        <Loader size="xl" color="#9BDABB" />
      </Flex>
    </Overlay>
  );
}
export default LoaderCustom;
