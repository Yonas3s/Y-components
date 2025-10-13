import "./Input.css";

interface InputProps {
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  marginBottom?: string;
  required?: boolean;
}

const Input = ({ type, placeholder, value, onChange, marginBottom, required }: InputProps) => {
  return (
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} className="input-field" style={{ marginBottom: marginBottom }} required={required}   />
  )
}

export default Input
