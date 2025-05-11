import useGetEmployee from "../../hooks/employee/useGetEmployee";
import EditEmployee from "./EditEmployee";

function FetchDataForEditEmploy() {
  const hook = useGetEmployee();
  if (hook.isSuccess && hook.data) return <EditEmployee />;

  return <></>;
}

export default FetchDataForEditEmploy;
