import { BellDot, BookOpenCheck, CircleHelp, HandCoins, Home, NotebookPen } from 'lucide-react'
import React, { ReactElement } from 'react'
import { NavLink } from 'react-router'

interface SidebarProps {
  isOpen: boolean
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const renderMenuItem = (icon: React.ReactNode, label: string, path: string): ReactElement => (
    <li className="flex items-center relative gap-4 w-full h-12 px-3 rounded transition-all text-gray-300 text-sm hover:bg-zinc-700">
      <NavLink
        to={path}
        className={({ isActive }) =>
          `flex items-center gap-3 w-full h-full ${
            isActive ? 'text-orange-600' : 'hover:text-orange-600'
          }`
        }
      >
        <div>{icon}</div>
        {isOpen && <span>{label}</span>}
      </NavLink>
    </li>
  )

  return (
    <div
      className={`bg-transparent flex flex-col justify-between h-full gap-3 p-3 border-r border-zinc-700 transition-all  ${
        isOpen ? 'w-[216px]' : 'w-[64px] items-center'
      }`}
    >
      <ul className="flex flex-col gap-4">
        {renderMenuItem(<Home />, 'Home', '/home')}
        {renderMenuItem(<NotebookPen />, 'Inscrição', '/enrollment')}
        {renderMenuItem(<HandCoins />, 'Pagamentos', '/payments')}
        {renderMenuItem(<BookOpenCheck />, 'Aulas e Presenças', '/classes')}
      </ul>
      <ul className="flex flex-col gap-4">
        {renderMenuItem(<BellDot />, 'Notificações', '/notifications')}
        {renderMenuItem(<CircleHelp />, 'Ajuda', '/help')}
      </ul>
    </div>
  )
}
