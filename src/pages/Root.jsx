import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import MainWrapper from "../components/MainWrapper/MainWrapper";
import Footer from "../components/Footer/Footer";

export default function RootLayout() {
  return (
    <>
      <Header />
      <MainWrapper>
        <Outlet />
      </MainWrapper>
      <Footer />
    </>
  );
}
