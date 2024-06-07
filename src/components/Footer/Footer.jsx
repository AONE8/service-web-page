import footerClasses from "./Footer.module.css";
import logoUrl from "../../assets/logo-woa-api.png";

export default function Footer() {
  return (
    <footer className={footerClasses["footer"]}>
      <img src={logoUrl} alt="Logo" />
      <div className="copyright">
        &copy; Copyright {new Date().getFullYear()} by Andrii Malyshko
      </div>
    </footer>
  );
}
