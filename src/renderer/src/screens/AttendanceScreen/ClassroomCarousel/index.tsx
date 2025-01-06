import { MoreVertical } from 'lucide-react'
import React from 'react'
import Slider from 'react-slick'

export const ClassroomCarousel: React.FC<{
  classrooms: object[]
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

  return (
    <Slider {...settings}>
      {/* Listagem das turmas */}
      {classrooms.map((classroom, index) => (
        <>
          <div
            key={index}
            className="flex justify-between bg-zinc-600 hover:bg-zinc-700 hover:cursor-pointer p-2 max-w-[229px] mx-1 rounded shadow hover:shadow-lg"
          >
            <main>
              <h3 className="text-lg border-b">{classroom?.className}</h3>
              <p>
                <span className="font-semibold">Professor: </span>
                [MKAL Dev]
              </p>
              <p>
                <span className="font-semibold">Horário: </span>
                {classroom?.schedule}
              </p>
              <p>
                <span className="font-semibold">Periodo: </span>
                {classroom?.period}
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
            <section>
              <button
                type="button"
                className="text-orange-300 bg-transparent active:opacity-70 transition-opacity"
                onClick={() => {
                  alert('Clicando o botão de opções')
                }}
              >
                <MoreVertical />
              </button>
            </section>
          </div>
        </>
      ))}
    </Slider>
  )
}
