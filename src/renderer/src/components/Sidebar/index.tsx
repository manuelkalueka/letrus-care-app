import { BellDot, BookOpenCheck, CircleHelp, HandCoins, Home, NotebookPen } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar: React.FC = () => {
  return (
    <div className="bg-zinc-400 flex justify-between flex-col h-svh">
      <ul>
        <li className="flex items-center">
          <Home />
          <Link to={'#'}>Home</Link>
        </li>
        <li className="flex items-center">
          <NotebookPen />
          <Link to={'#'}>Inscrição</Link>
        </li>
        <li className="flex items-center">
          <HandCoins />
          <Link to={'#'}>Pagamentos</Link>
        </li>
        <li className="flex items-center">
          <BookOpenCheck />
          <Link to={'#'}>Aulas e Presenças</Link>
        </li>
      </ul>
      <ul>
        <li className="flex items-center">
          <BellDot />
          <Link to={'#'}>Notificações</Link>
        </li>
        <li className="flex items-center">
          <CircleHelp />
          <Link to={'#'}>Ajuda</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
