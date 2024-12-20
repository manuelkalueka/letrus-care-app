import React, { useState } from 'react'
import { LogoLectrus } from '../LogoLectrus'
import { Menu, Search, UserRound, School } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useAuth } from '@renderer/contexts/auth-context'
import { useCenter } from '@renderer/contexts/center-context'

const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { center } = useCenter()
  const navigate = useNavigate()
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          className="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium"
          aria-expanded="true"
          aria-haspopup="true"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => {
            setTimeout(() => setIsOpen(false), 1800) //atrasa a  saida simulando que ele espera o usuario clicar
          }}
          title={center?.name}
          onDoubleClick={() => {
            navigate('/centers/show')
          }}
        >
          <School />
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-zinc-800 ring-1 ring-black ring-opacity-5 text-white"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <a
              href="/courses"
              className="text-zinc-100 block px-4 py-2 text-sm hover:bg-zinc-900 hover:transition-all"
              role="menuitem"
            >
              Cursos
            </a>
            <a
              href="/grades"
              className="text-zinc-100 block px-4 py-2 text-sm hover:bg-zinc-900 hover:transition-all"
              role="menuitem"
            >
              Níveis
            </a>
            <a
              href="/teachers"
              className="text-zinc-100 block px-4 py-2 text-sm hover:bg-zinc-900 hover:transition-all"
              role="menuitem"
            >
              Professores
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

const DropdownUser: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const { logout, user } = useAuth()

  function handleLogout(): void {
    if (confirm('Terminar Sessão?')) {
      logout()
      navigate('/login')
    }
    return
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          className="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium"
          aria-expanded="true"
          aria-haspopup="true"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => {
            setTimeout(() => setIsOpen(false), 1800) //atrasa a  saida simulando que ele espera o usuario clicar
          }}
          title={user?.username}
        >
          <UserRound />
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-zinc-800 ring-1 ring-black ring-opacity-5 text-white"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <a
              href="/profile"
              className="text-zinc-100 block px-4 py-2 text-sm hover:bg-zinc-900 hover:transition-all"
              role="menuitem"
            >
              Perfil
            </a>
            <a
              href="/#"
              className="text-zinc-100 block px-4 py-2 text-sm hover:bg-zinc-900 hover:transition-all"
              role="menuitem"
            >
              Configurações
            </a>
            <a
              className="text-zinc-100 block px-4 py-2 text-sm hover:bg-zinc-900 hover:transition-all cursor-pointer"
              role="menuitem"
              onClick={() => {
                handleLogout()
              }}
            >
              Sair
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export const Header: React.FC = () => {
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
        <Dropdown />
        <DropdownUser />
      </section>
    </div>
  )
}
