import logo from "../../assets/logo-woa-api.png";
import MainNav from "../MainNav/MainNav";
import headerClasses from "./Header.module.css";

export default function Header() {
  return (
    <header className={headerClasses.header}>
      <div className={headerClasses["img-box"]}>
        <img src={logo} alt="WOA API Logo" />
      </div>
      <MainNav />
    </header>
  );
}
