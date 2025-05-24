import { Outlet } from "react-router-dom";
import Footer from "../Components/footer";

function MainLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default MainLayout;
