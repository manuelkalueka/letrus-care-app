import { BellDot, BookOpenCheck, CircleHelp, HandCoins, Home, NotebookPen } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const Sidebar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<
    'home' | 'payment' | 'enrollment' | 'notification' | 'help' | 'attendance'
  >(() => (localStorage.getItem('activeMenu') as any) || 'home')

  // Atualiza o estado quando a tela é recarregada ou ao montar o componente
  useEffect(() => {
    localStorage.setItem('activeMenu', activeMenu)
  }, [activeMenu])

  // Função para renderizar um item da sidebar
  const renderMenuItem = (menu: string, icon: React.ReactNode, label: string, path: string) => (
    <li
      className={`flex items-center relative gap-4 w-full h-12 px-3 rounded transition-all text-gray-300 text-sm ${
        activeMenu === menu && 'bg-zinc-700'
      } hover:bg-zinc-700`}
      onClick={() => setActiveMenu(menu as any)}
    >
      <Link to={path} className="flex items-center gap-3 w-full h-full">
        <div
          className={`transition-all ${activeMenu === menu ? 'text-orange-600' : 'hover:text-orange-600'}`}
        >
          {icon}
        </div>
        {label}
      </Link>
    </li>
  )

  return (
    <div className="bg-transparent flex flex-col justify-between h-full gap-3 p-3 border-r border-zinc-700 w-[216px]">
      <ul className="flex flex-col gap-4">
        {renderMenuItem('home', <Home />, 'Home', '/')}
        {renderMenuItem('enrollment', <NotebookPen />, 'Inscrição', '/enrollment')}
        {renderMenuItem('payment', <HandCoins />, 'Pagamentos', '/payments')}
        {renderMenuItem('attendance', <BookOpenCheck />, 'Aulas e Presenças', '/attendance')}
      </ul>
      <ul className="flex flex-col gap-4">
        {renderMenuItem('notification', <BellDot />, 'Notificações', '/notification')}
        {renderMenuItem('help', <CircleHelp />, 'Ajuda', '/help')}
      </ul>
    </div>
  )
}
