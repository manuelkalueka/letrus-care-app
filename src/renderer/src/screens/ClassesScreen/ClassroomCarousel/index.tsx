import { IResponseClass } from '@renderer/services/class-service'
import { MoreVertical } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Slider from 'react-slick'

export const ClassroomCarousel: React.FC<{
  classrooms: IResponseClass[]
}> = ({ classrooms }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: classrooms.length > 1 ? 4 : 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }
  const [showMenu, setShowMenu] = useState<boolean>(false)

  const DropDownMenu: React.FC = () => {
    return (
      <div className="absolute right-0 top-0 bg-white shadow-lg rounded-md z-10">
        <ul>
          <li>
            <button type="button" className="flex items-center p-2 hover:bg-gray-100 w-full">
              <span className="mr-2">
                <MoreVertical />
              </span>
              <span>Adicionar Aluno</span>
            </button>
          </li>
          <li>
            <button type="button" className="flex items-center p-2 hover:bg-gray-100 w-full">
              <span className="mr-2">
                <MoreVertical />
              </span>
              <span>Editar Turma</span>
            </button>
          </li>
          <li>
            <button type="button" className="flex items-center p-2 hover:bg-gray-100 w-full">
              <span className="mr-2">
                <MoreVertical />
              </span>
              <span>Cancelar</span>
            </button>
          </li>
        </ul>
      </div>
    )
  }

  const PERIOD = ['Manhã', 'Tarde', 'Noite']
  const navigate = useNavigate()
  return (
    <Slider {...settings}>
      {classrooms.map((classroom) => (
        <div
          key={classroom?._id}
          className="relative flex bg-zinc-800 hover:bg-zinc-700 hover:cursor-pointer p-2 max-w-[229px] mx-1 rounded shadow hover:shadow-lg"
          onDoubleClick={() => {
            navigate(`/classes/show/${classroom._id}`, {
              state: { class: classroom }
            })
          }}
        >
          <section className="flex justify-between">
            <h3 className="text-lg border-b w-10/12">{classroom?.className}</h3>

            <button
              type="button"
              className=" text-orange-300 bg-transparent active:opacity-70 transition-opacity"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreVertical />
            </button>
            {showMenu && <DropDownMenu />}
          </section>
          <main>
            <p>
              <span className="font-semibold">Professor: </span>
              [MKAL Dev]
            </p>
            <p>
              <span className="font-semibold">Modalidade: </span>
              {classroom?.course?.courseType === 'on_home' ? 'Domiclio' : 'Centro'}
            </p>
            <p>
              <span className="font-semibold">Periodo: </span>
              {classroom?.period === 'moon'
                ? PERIOD[1]
                : classroom?.period === 'morning'
                  ? PERIOD[0]
                  : PERIOD[2]}
            </p>
            <p>
              <span className="font-semibold">Nível: </span>
              {classroom?.grade?.grade}
            </p>
            <p>
              <span className="font-semibold">Curso: </span>
              {classroom?.course?.name}
            </p>
          </main>
        </div>
      ))}
    </Slider>
  )
}
