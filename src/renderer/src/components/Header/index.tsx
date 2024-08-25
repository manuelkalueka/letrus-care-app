import React from 'react'
import { LogoLectrus } from '../LogoLectrus'
import { Calendar, Menu, Search, UserRound } from 'lucide-react'
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
        <button>
          <Calendar />
        </button>
        <button>
          <UserRound />
        </button>
      </section>
    </div>
  )
}
