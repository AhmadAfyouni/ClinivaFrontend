import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useRef } from "react";

interface Props {
  searchValue: string;
  setSearchValue: (vlaue: string) => void;
  text: string;
}
export const SearchInput = ({ searchValue, setSearchValue, text }: Props) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (searchValue.trim() !== "") inputRef.current?.focus();
  }, []);

  return (
    <TextInput
      w="180px"
      fz="10px"
      placeholder={text}
      mb="md"
      leftSection={<IconSearch size={16} stroke={1.5} />}
      value={searchValue}
      onChange={handleSearchChange}
      mr="10px"
      ref={inputRef}
      radius="md"
    />
  );
};
