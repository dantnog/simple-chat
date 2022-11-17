import ButtonProps from "../types/ButtonProps";

export default function Button({key, name, type, theme, onClick, children}: ButtonProps) {
  return (
    <button 
      key={key}
      type={type}
      onClick={() => onClick ? onClick() : null}
      className={theme === 1
        ? "text-center w-full py-1 bg-slate-300 hover:bg-lime-400 dark:bg-slate-700 dark:hover:bg-lime-600 hover:text-slate-800 dark:hover:text-slate-200 rounded-md"
        : theme === 2 
          ? "text-center w-full py-1 bg-slate-300 hover:bg-slate-400 focus:bg-slate-500 dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:bg-slate-500 hover:text-slate-800 dark:hover:text-slate-200 focus:text-slate-800 dark:focus:text-slate-200 rounded-md"
          : theme === 3 
            ? "grid place-items-center w-8 h-8 text-lg bg-slate-300 hover:bg-lime-400 dark:bg-slate-700 dark:hover:bg-lime-600 hover:text-slate-800 dark:hover:text-slate-200 rounded-md"
            : "grid place-items-center h-full w-14 text-lg bg-transparent hover:bg-lime-400 dark:hover:bg-lime-600 hover:text-slate-800 dark:hover:text-slate-200"
      }
      >
      {name}{children}
    </button>
  )
}