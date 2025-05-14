// import dayjs from "dayjs";
// import { DateInput, DateInputProps } from "@mantine/dates";
// import InputPropsType from "../../../types/InputsType";
// import { DateValue } from "@mantine/dates";
// import { useTranslation } from "react-i18next";

// const dateParser: DateInputProps["dateParser"] = (input) => {
//   if (input === "WW2") {
//     return new Date(1939, 8, 1);
//   }
//   return dayjs(input, "DD/MM/YYYY").toDate();
// };

// interface Props {
//   base: InputPropsType;
// }

// export default function DateBase(props: Props) {
//   const { t } = useTranslation();

//   const handleChange = (value: DateValue) => {
//     if (props.base.onChange) {
//       const formattedDate = value ? dayjs(value).format("YYYY-MM-DD") : "";

//       const event = {
//         target: { name: props.base.id, value: formattedDate },
//       } as React.ChangeEvent<HTMLInputElement>;

//       props.base.onChange(event);
//     }
//   };

//   let dateValue: Date | null;
//   if (
//     typeof props.base.value === "string" &&
//     dayjs(props.base.value, "DD/MM/YYYY").isValid()
//   ) {
//     dateValue = new Date(props.base.value);
//   } else if (typeof props.base.value === "number") {
//     dateValue = new Date(props.base.value);
//   } else {
//     dateValue = null;
//   }

//   return (
//     <DateInput
//       dateParser={dateParser}
//       w={"60%"}
//       valueFormat="DD/MM/YYYY"
//       id={props.base.id}
//       withAsterisk={props.base.mandatory}
//       label={t(props.base.label)}
//       placeholder={t(props.base.placeholder || "")}
//       onChange={handleChange}
//       error={t(props.base.error || "")}
//       disabled={props.base.disabled}
//       value={dateValue}
//     />
//   );
// }




import dayjs from "dayjs";
import "dayjs/locale/en"; 
import { DateInput, DateInputProps } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { rem } from "@mantine/core";
import InputPropsType from "../../../types/InputsType";
import { DateValue } from "@mantine/dates";
import { useTranslation } from "react-i18next";

const dateParser: DateInputProps["dateParser"] = (input) => {
  if (input === "WW2") {
    return new Date(1939, 8, 1);
  }
return dayjs(input, "MMMM D, YYYY HH:mm").toDate(); 
};

interface Props {
  base: InputPropsType;
}

export default function DateBase(props: Props) {
  const { t } = useTranslation();
  dayjs.locale("en");

  const handleChange = (value: DateValue) => {
    if (props.base.onChange) {
      const formattedDate = value ? dayjs(value).format("MMMM D, YYYY") : "";

      const event = {
        target: { name: props.base.id, value: formattedDate },
      } as React.ChangeEvent<HTMLInputElement>;

      props.base.onChange(event);
    }
  };

  let dateValue: Date | null;
  if (
    typeof props.base.value === "string" &&
    props.base.value.length > 0 && // Ensure string is not empty
    dayjs(props.base.value, "YYYY-MM-DD").isValid() // Expect YYYY-MM-DD from formik
    dayjs(props.base.value).isValid()
  ) {
    dateValue = dayjs(props.base.value, "YYYY-MM-DD").toDate();
  } else if (typeof props.base.value === "string" && dayjs(props.base.value, "DD/MM/YYYY").isValid()) { // Fallback for DD/MM/YYYY initial value
    dateValue = dayjs(props.base.value, "DD/MM/YYYY").toDate();
  }
  else if (typeof props.base.value === "number") {
    dateValue = new Date(props.base.value);
  } else {
    dateValue = null;
  }

  return (
    <DateInput
      rightSection={<IconCalendar style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
      dateParser={dateParser}
      w={"60%"}
      valueFormat="MMMM D, YYYY"
      id={props.base.id}
      withAsterisk={props.base.mandatory}
      label={t(props.base.label)}
      placeholder={t(props.base.placeholder || "")}
      onChange={handleChange}
      error={t(props.base.error || "")}
      disabled={props.base.disabled}
      value={dateValue}
    />
  );
}

