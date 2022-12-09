import { Outlet } from "react-router-dom";

// Styles
import { LayoutContainer } from "./styles";

// Components
import { Header } from "../../components/Header";

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  );
}
