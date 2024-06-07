import inputClasses from "./Input.module.css";

export default function Input({ label, ...props }) {
  return (
    <div className={inputClasses["input-container"]}>
      <input {...props} placeholder="" required />
      <label htmlFor={props.id}>{label}</label>
    </div>
  );
}
