import MainWrapperClasses from "./MainWrapper.module.css";

export default function MainWrapper({ children }) {
  return <main className={MainWrapperClasses.main}>{children}</main>;
}
