// // components/DeleteConfirmationDialog.tsx
// import { Dialog, Button, Group, rem, Text, ActionIcon  } from "@mantine/core";
// import iconDelete from "../assets/icons/Featured icon (1).svg";
// import { IconX } from "@tabler/icons-react";
// interface DeleteConfirmationDialogProps {
//   opened: boolean;
//   onClose: () => void;
//   onConfirm: (id?: string) => void;
//   itemId?: string;
// }

// const DeleteConfirmationDialog = ({
//   opened,
//   onClose,
//   onConfirm,
//   itemId,
// }: DeleteConfirmationDialogProps) => {
  
//   if (!opened) return null;

//   return (
//     <>
   

//       {/* Dialog */}
//         <div
//     style={{
//       position: 'fixed',
//       inset: 0,
//       backgroundColor: 'rgba(0, 0, 0, 0.5)',
//       zIndex: 999,
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//     }}
//   >
//       <Dialog
//         opened={opened}
//         size="sm"
//         radius="lg"
//         p="lg"
//         shadow="lg"
//         onClose={onClose}
//         aria-modal={true}
//         style={{
//           position: "fixed",
//           top: "40%",
//           left: "40%",
//           transform: "translate(50%, 50%)",
//           backgroundColor: "#ffff",
//           maxWidth: rem(400),
//           width: "400px",
//           height: "260px",
//           zIndex: 1000, 
//           display:"flex",
//           flexDirection : "column",
//           borderRadius: "16px"
//         }}
//       >
//         <div style={{display: "flex", justifyContent: "space-between", alignItems:"center"}}>
//         <img src={iconDelete} alt="icon-delete" style={{width:"58px"}}/>
//         <div style={{ }}>
//         <ActionIcon variant="transparent" onClick={onClose}>
//           <IconX size={40} color="#717680" />
//         </ActionIcon>
//       </div>

//         </div>
//         <Text size="18px" fw={600} mb="sm" c="#181D27" mt="20px">
//           Delete User?
//         </Text>
//         <Text size="14px" c="#535862" mb="md" style={{lineHeight: "20px"}}>
//           Are you sure you want to delete this User? This action cannot be undone.
//         </Text>

//         <Group mt="10px">
//           <Button variant="outline"  onClick={onClose} style={{background: "#fff", border: "2px solid #D5D7DA", width:"45%", borderRadius:"20px", color: "#414651"}}>
//             Cancel
//           </Button>
//           <Button onClick={() =>{
//              console.log("dellllllllllleetion");
//              onConfirm(itemId)
//           }}  style={{background: "#D92D20", border: "1px solid #D92D20", width:"45%", borderRadius:"20px", color: "#FFFFFF"}}>
//             Delete
//           </Button>
//         </Group>
//       </Dialog>

//   </div>
//     </>
//   );
// };

// export default DeleteConfirmationDialog;


// components/DeleteConfirmationDialog.tsx
import { useEffect } from "react";
import {
  Button,
  Group,
  Text,
  ActionIcon,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import iconDelete from "../assets/icons/Featured icon (1).svg";

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
  // منع التمرير عند فتح المودال
  useEffect(() => {
    if (opened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  if (!opened) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()} // منع الغلق عند الضغط داخل المودال
        style={{
          backgroundColor: "#fff",
          maxWidth: "400px",
          width: "400px",
          height: "260px",
          borderRadius: "16px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 10000,
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <img src={iconDelete} alt="icon-delete" style={{ width: "58px" }} />
          <ActionIcon variant="transparent" onClick={onClose}>
            <IconX size={40} color="#717680" />
          </ActionIcon>
        </div>

        <Text size="18px" fw={600} mb="sm" c="#181D27" mt="20px">
          Delete User?
        </Text>
        <Text size="14px" c="#535862" mb="md" style={{ lineHeight: "20px" }}>
          Are you sure you want to delete this User? This action cannot be undone.
        </Text>

        <Group mt="auto" position="apart">
          <Button
            variant="outline"
            onClick={onClose}
            style={{
              background: "#fff",
              border: "2px solid #D5D7DA",
              width: "45%",
              borderRadius: "20px",
              color: "#414651",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => onConfirm(itemId)}
            style={{
              background: "#D92D20",
              border: "1px solid #D92D20",
              width: "45%",
              borderRadius: "20px",
              color: "#FFFFFF",
            }}
          >
            Delete
          </Button>
        </Group>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;

