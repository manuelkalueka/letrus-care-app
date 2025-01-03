import React, { useState } from 'react'
import Slider from 'react-slick'
import { Plus } from 'lucide-react' // Ícone para o botão
import { Modal } from '@renderer/components/Modal' // Importa o componente do modal

import { FormCreateClass } from './../FormCreateClass' // Importa o formulário para criar nova turma

export const ClassroomCarousel: React.FC<{ classrooms: object[] }> = ({ classrooms }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const closeModal = () => setIsModalOpen(false)

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Turmas</h2>
      <Slider {...settings}>
        {/* Botão para adicionar nova turma */}
        <div
          className="flex items-center justify-center bg-gray-100 p-6 rounded shadow hover:shadow-lg cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={32} />
          <p>Nova Turma</p>
        </div>

        {/* Listagem das turmas */}
        {classrooms.map((classroom, index) => (
          <div key={index} className="flex flex-col bg-white p-4 rounded shadow hover:shadow-lg">
            <h3 className="text-lg font-semibold">{classroom?.name}</h3>
            <p>{classroom?.teacher}</p>
            <p>{classroom?.schedule}</p>
          </div>
        ))}
      </Slider>

      {/* Modal para criar nova turma */}
      {isModalOpen && (
        <Modal onClose={() => closeModal()} isOpen={isModalOpen}>
          <h2 className="text-3xl">Criar Nova Turma</h2>
          <div className="bg-orange-700 text-orange-700 h-2 mt-2 w-16" />
          <FormCreateClass onClose={() => closeModal()} />
        </Modal>
      )}
    </div>
  )
}
