import InputProps from "../types/InputProps";

export default function Input({value, onChange}: InputProps) {
  return (
    <input 
      type="text" 
      value={value}
      onChange={e => onChange(e.target.value)}
      className="outline-none bg-transparent h-full w-full" 
    />
  )
}