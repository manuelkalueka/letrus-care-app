import React, { useEffect, useState } from 'react'
import { Footer } from '@renderer/components/Footer'
import { HeaderMain } from '@renderer/components/HeaderMain'
import { Sidebar } from '@renderer/components/Sidebar'
import { IClass } from '@renderer/services/class-service'
import { useLocation } from 'react-router'

export const ShowClassScreen: React.FC = () => {
  const [classRoom, setClassRoom] = useState<IClass>({} as IClass)
  const location = useLocation()
  useEffect(() => {
    setClassRoom(location.state?.class)
  }, [location.state])
  return (
    <div>
      <div className="flex flex-col h-screen">
        <HeaderMain />

        <div className="flex flex-1 pt-[62px] lg:pt-[70px] overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-auto pt-4">
            <div className="flex flex-col flex-1 w-11/12 mx-auto">
              <h2 className="text-3xl text-zinc-400">{classRoom.className}</h2>
              <article className="text-zinc-600 mt-3">
                <p>Turma do professor {classRoom.course?.name}</p>
              </article>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
