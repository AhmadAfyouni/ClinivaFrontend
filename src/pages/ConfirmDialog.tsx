import { Dialog, Button, Group, rem, Text } from "@mantine/core";

interface ConfirmDialogProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: (id?: string) => void;
  itemId?: string;
  confirm?:string;
  areYouSure?:string;
}

const ConfirmDialog = ({
  opened,
  onClose,
  onConfirm,
  confirm,
  areYouSure
}: ConfirmDialogProps) => {
  
  if (!opened) return null;

  return (
    <>
   

      {/* Dialog */}
      <Dialog
        opened={opened}
        size="sm"
        radius="lg"
        p="lg"
        shadow="md"
        withCloseButton
        onClose={onClose}
        aria-modal={true}
        style={{
          // position: "fixed",
          // top: "50%",
          // left: "50%",
          transform: "translate(-50%, -50%)",
          border: "1px solid #f03e3e",
          backgroundColor: "#fff0f0",
          maxWidth: rem(360),
          width: "100%",
          zIndex: 1000, // Ensure it's above the backdrop
        }}
      >
        <Text size="md" fw={500} mb="sm" c="red">
          {confirm}
        </Text>
        <Text size="sm" c="dimmed" mb="md">
          {areYouSure}
        </Text>

        <Group justify="flex-end">
          <Button variant="outline" color="red" onClick={onClose} >
            Cancel
          </Button>
          <Button color="red" onClick={() =>{
             onConfirm()
             onClose()
          }}>
            Confirm
          </Button>
        </Group>
      </Dialog>
    </>
  );
};

export default ConfirmDialog;
