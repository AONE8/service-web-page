import { NavLink } from "react-router-dom";
import navClasses from "./MainNav.module.css";

export default function MainNav() {
  return (
    <nav className={navClasses.nav}>
      <ul>
        <li>
          <a href="#about-api">Про API</a>
        </li>
        <li>
          <a href="#feature-selection">Відбір ознак</a>
        </li>
        <li>
          <a href="#result">Результат</a>
        </li>
      </ul>
    </nav>
  );
}
