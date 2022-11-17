import { ReactNode } from "react"

export default interface ButtonProps {
  name?: string
  key?: number
  type: 'button' | 'submit' | 'reset'
  theme: 1 | 2 | 3 | 4
  onClick?: Function
  children?: ReactNode
}