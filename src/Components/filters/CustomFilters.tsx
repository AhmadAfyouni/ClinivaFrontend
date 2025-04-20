import { Button, Flex, Popover, useMantineTheme } from "@mantine/core";
import Dropdown from "../Dropdown";
import { DatePickerInput } from "@mantine/dates";
import { CiSliderHorizontal } from "react-icons/ci";
import { useMediaQuery } from "@mantine/hooks";

interface Props {
  IsDropDown1?: boolean;
  placeHolderDropDown1?: string;
  OptionsDropDown1: string[];
  handlDropDownChange1: (value: string | null) => void;
  IsDropDown2?: boolean;
  placeHolderDropDown2?: string;
  OptionsDropDown2?: string[];
  handlDropDownChange2?: (value: string | null) => void;
  IsDropDown3?: boolean;
  placeHolderDropDown3?: string;
  OptionsDropDown3?: string[];
  handlDropDownChange3?: (value: string | null) => void;
  IsDateInput?: boolean;
  placeHolderDateInput?: string;
  vlaueDateInput?: Date | null;
  handleDateChange?: (value: Date | null) => void;
}
const CustomFilters = ({
  IsDropDown1 = false,
  placeHolderDropDown1,
  OptionsDropDown1,
  handlDropDownChange1,
  IsDropDown2 = false,
  placeHolderDropDown2,
  OptionsDropDown2,
  handlDropDownChange2,
  IsDropDown3 = false,
  placeHolderDropDown3,
  OptionsDropDown3,
  handlDropDownChange3,
  IsDateInput = false,
  placeHolderDateInput,
  vlaueDateInput,
  handleDateChange,
}: Props) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 576px)");
  return (
    <Flex>
      {!isMobile && (
        <Flex>
          {IsDropDown1 && (
            <Dropdown
              onChange={handlDropDownChange1}
              options={OptionsDropDown1}
              placeHolder={placeHolderDropDown1 || ""}
            />
          )}
          {IsDropDown2 && (
            <Dropdown
              onChange={handlDropDownChange2 || (() => {})}
              options={OptionsDropDown2 || []}
              placeHolder={placeHolderDropDown2 || ""}
            />
          )}
          {IsDropDown3 && (
            <Dropdown
              onChange={handlDropDownChange3 || (() => {})}
              options={OptionsDropDown3 || []}
              placeHolder={placeHolderDropDown3 || ""}
            />
          )}
          {IsDateInput && (
            <DatePickerInput
              value={vlaueDateInput}
              onChange={handleDateChange}
              placeholder={placeHolderDateInput || "Date"}
              radius={30}
              w="140px"
              styles={{
                input: {
                  backgroundColor: theme.other.secondaryColor,
                  color: theme.other.onSurfacePrimary,
                },
              }}
            />
          )}
        </Flex>
      )}
      {isMobile && (
        <Popover width={150} position="bottom" withArrow shadow="md">
          <Popover.Target>
            <Button bg={theme.other.secondaryDarkColor} radius="xl">
              <CiSliderHorizontal />
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            {IsDropDown1 && (
              <Dropdown
                onChange={handlDropDownChange1}
                options={OptionsDropDown1}
                placeHolder={placeHolderDropDown1 || ""}
              />
            )}
            {IsDropDown2 && (
              <Dropdown
                onChange={handlDropDownChange2 || (() => {})}
                options={OptionsDropDown2 || []}
                placeHolder={placeHolderDropDown2 || ""}
              />
            )}
            {IsDropDown3 && (
              <Dropdown
                onChange={handlDropDownChange3 || (() => {})}
                options={OptionsDropDown3 || []}
                placeHolder={placeHolderDropDown3 || ""}
              />
            )}
            {IsDateInput && (
              <DatePickerInput
                value={vlaueDateInput}
                onChange={handleDateChange}
                placeholder={placeHolderDateInput || "Date"}
                radius={30}
                w={120}
              />
            )}
          </Popover.Dropdown>
        </Popover>
      )}
    </Flex>
  );
};

export default CustomFilters;
