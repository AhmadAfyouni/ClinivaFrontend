// components/DeleteConfirmationDialog.tsx
import { Dialog, Button, Group, rem, Text } from "@mantine/core";

interface DeleteConfirmationDialogProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: (id?: string) => void;
  itemId?: string;
}

const DeleteConfirmationDialog = ({
  opened,
  onClose,
  onConfirm,
  itemId,
}: DeleteConfirmationDialogProps) => {
  
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
          Confirm Deletion
        </Text>
        <Text size="sm" c="dimmed" mb="md">
          Are you sure you want to delete this item?
        </Text>

        <Group justify="flex-end">
          <Button variant="outline" color="red" onClick={onClose} >
            Cancel
          </Button>
          <Button color="red" onClick={() =>{
             onConfirm(itemId)
          }}>
            Delete
          </Button>
        </Group>
      </Dialog>
    </>
  );
};

export default DeleteConfirmationDialog;
