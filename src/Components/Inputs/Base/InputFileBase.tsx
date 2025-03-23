import { useState, useRef } from "react";
import { Avatar, FileInput, Group, ActionIcon } from "@mantine/core";
import { FiCamera } from "react-icons/fi";
import InputPropsType from "../../../types/InputsType";

interface Props {
  base: InputPropsType;
}

export default function InputFileBase({ base }: Props) {
  const [image, setImage] = useState<string | null>(
    typeof base.value === "string" ? base.value : null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (file: File | null) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      base.onChangeFile?.(file); // Ensure onChangeFile exists before calling
    }
  };

  return (
    <Group>
      {/* Clickable Avatar */}
      <div
        style={{
          position: "relative",
          cursor: "pointer",
          display: "inline-block",
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <Avatar src={image} alt="Profile Picture" radius="xl" size={100} />
        {/* Camera Icon Overlay */}
        <ActionIcon
          size="lg"
          radius="xl"
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            color: "white",
            boxShadow: "0 0 5px rgba(0,0,0,0.2)",
          }}
        >
          <FiCamera size={20} />
        </ActionIcon>
      </div>

      {/* Hidden File Input */}
      <FileInput
        ref={fileInputRef}
        accept="image/*"
        placeholder="Upload an image"
        onChange={handleImageChange}
        style={{ display: "none" }}
        id={base.id}
      />

      {base.error && (
        <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
          {base.error}
        </p>
      )}
    </Group>
  );
}
