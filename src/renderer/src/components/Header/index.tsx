import React from 'react'
import { LogoLectrus } from '../LogoLectrus'
import { Menu, Search, UserRound, School } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { logoutService } from '@renderer/services/user'
export const Header: React.FC = () => {
  const navigate = useNavigate()

  function handleLogout(): void {
    if (confirm('Terminar Sessão?')) {
      logoutService()
      navigate('/login')
    }
    return
  }
  return (
    <div className="flex items-center justify-between fixed top-0 left-0 right-0 h-[62px] lg:h-[70px] bg-gray-850 border border-transparent border-b-zinc-700 lg:pr-8 bg-gray-850 border-b z-50 px-4 bg-zinc-900">
      <section className="flex items-center justify-between gap-4">
        <button>
          <Menu />
        </button>
        <LogoLectrus sizeFont="text-xl" sizeImage={30} />
      </section>
      <section className="flex items-center justify-center w-96 bg-zinc-950 px-2 rounded">
        <Search className="text-zinc-500" />
        <input
          type="search"
          placeholder="Pesquise por serviços ou professores"
          className="w-full bg-transparent border-0 outline-0 placeholder:text-zinc-500"
        />
      </section>
      <section className="flex items-center justify-between gap-4">
        <button title="NOME DO CENTRO">
          <School />
        </button>
        <button>
          <UserRound
            onClick={() => {
              handleLogout()
            }}
          />
        </button>
      </section>
    </div>
  )
}
//My Dropdown
// <ul className="flex flex-col gap-4">
// <li
//   className={`flex items-center gap-4 justify-center w-full h-12 px-3 rounded transition-all text-gray-300 text-sm bg-zinc-700 hover:bg-zinc-700`}
//   data-state="closed"
// >
//   <Link to={'/home'} className="flex items-center gap-3 w-full">
//     Cursos
//   </Link>
// </li>
// <li
//   className={`flex items-center gap-4 justify-center w-full h-12 px-3 rounded transition-all text-gray-300 text-sm bg-zinc-700 hover:bg-zinc-700`}
//   data-state="closed"
// >
//   <Link to={'/home'} className="flex items-center gap-3 w-full">
//     Classes
//   </Link>
// </li>
// <li
//   className={`flex items-center gap-4 justify-center w-full h-12 px-3 rounded transition-all text-gray-300 text-sm bg-zinc-700 hover:bg-zinc-700`}
//   data-state="closed"
// >
//   <Link to={'/home'} className="flex items-center gap-3 w-full">
//     professores
//   </Link>
// </li>
// </ul>
