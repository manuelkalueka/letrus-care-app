import { BellDot, BookOpenCheck, CircleHelp, HandCoins, Home, NotebookPen } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const Sidebar: React.FC = () => {
  const [isActive, setIsActive] = useState(false)
  function changeItemActive(evento): void {
    console.log(evento)

    setIsActive(true)
  }
  return (
    <div
      className={`bg-transparent flex flex-col justify-between h-full gap-3 p-3 border-r border-zinc-700 w-[216px]`}
    >
      <ul className="flex flex-col gap-4">
        <li
          className={`flex items-center relative gap-4 w-full h-12 px-3 rounded transition-all text-gray-300 text-sm ${isActive && 'bg-zinc-700 '} hover:bg-zinc-700`}
          data-state="closed"
          onClick={(e) => {
            changeItemActive(e)
          }}
        >
          <Link to={'/home'} className="flex items-center gap-3 w-full">
            <Home className="hover:text-orange-600" />
            Home
          </Link>
        </li>
        <li
          className={`flex items-center relative gap-4 w-full h-12 px-3 rounded transition-all text-gray-300 text-sm ${isActive && 'bg-gray-800 '} hover:bg-zinc-700`}
        >
          <Link to={'/enrollment'} className="flex items-center gap-3 w-full">
            <NotebookPen />
            Inscrição
          </Link>
        </li>
        <li
          className={`flex items-center relative gap-4 w-full h-12 px-3 rounded transition-all text-gray-300 text-sm ${isActive && 'bg-gray-800 '} hover:bg-zinc-700`}
        >
          <Link to={'#'} className="flex items-center gap-3 w-full">
            <HandCoins />
            Pagamentos
          </Link>
        </li>
        <li
          className={`flex items-center relative gap-4 w-full h-12 px-3 rounded transition-all text-gray-300 text-sm ${isActive && 'bg-gray-800 '} hover:bg-zinc-700`}
        >
          <Link to={'#'} className="flex items-center gap-3 w-full">
            <BookOpenCheck />
            Aulas e Presenças
          </Link>
        </li>
      </ul>
      <ul className="flex flex-col gap-4">
        <li
          className={`flex items-center relative gap-4 w-full h-12 px-3 rounded transition-all text-gray-300 text-sm ${isActive && 'bg-gray-800 '} hover:bg-zinc-700`}
        >
          <Link to={'#'} className="flex items-center gap-3 w-full">
            <BellDot />
            Notificações
          </Link>
        </li>
        <li
          className={`flex items-center relative gap-4 w-full h-12 px-3 rounded transition-all text-gray-300 text-sm ${isActive && 'bg-gray-800 '} hover:bg-zinc-700`}
        >
          <Link to={'#'} className="flex items-center gap-3 w-full">
            <CircleHelp />
            Ajuda
          </Link>
        </li>
      </ul>
    </div>
  )
}
