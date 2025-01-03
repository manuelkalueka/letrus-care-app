import React from 'react'
import { Footer } from '@renderer/components/Footer'
import { HeaderMain } from '@renderer/components/HeaderMain'
import { Sidebar } from '@renderer/components/Sidebar'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { ClassroomCarousel } from './ClassroomCarousel'

export const AttendanceScreen: React.FC = () => {
  const classrooms = [
    { name: 'Matemática - 8ª Série', teacher: 'Professor João', schedule: 'Seg e Qua - 14:00' },
    { name: 'Física - 9ª Série', teacher: 'Professora Ana', schedule: 'Ter e Qui - 10:00' },
    { name: 'Matemática - 8ª Série', teacher: 'Professor João', schedule: 'Seg e Qua - 14:00' },
    { name: 'Física - 9ª Série', teacher: 'Professora Ana', schedule: 'Ter e Qui - 10:00' }
  ]

  return (
    <div>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <HeaderMain />

        <div className="flex flex-1 pt-[62px] lg:pt-[70px] overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-auto pt-4">
            <div className="flex flex-col flex-1 w-11/12 mx-auto">
              <h2 className="text-3xl text-zinc-400">Turmas e Presenças</h2>
              {/* <article className="text-zinc-600 mt-3">
                <p>Níveis Disponíveis no (a) {center?.name}</p>
              </article> */}

              <div className="container p-6">
                <ClassroomCarousel classrooms={classrooms} />
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
