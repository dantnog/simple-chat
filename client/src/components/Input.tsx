import InputProps from "../types/InputProps";

export default function Input({value, onChange, placeholder}: InputProps) {
  return (
    <input 
      type="text" 
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      className="outline-none bg-transparent h-full w-full px-2" 
    />
  )
}