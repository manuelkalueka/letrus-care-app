import { Modal } from '@renderer/components/Modal'
import { IResponseClass, updateClassStatusService } from '@renderer/services/class-service'
import { MoreVertical, PenSquareIcon, Plus, XOctagon } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Slider from 'react-slick'
import { ModalAddStudent } from './ModalAddStudent'
import Swal from 'sweetalert2'
import { FormEditClass } from './FormEditClass'
import { abreaviateName } from '@renderer/utils'

export const ClassroomCarousel: React.FC<{
  classrooms: IResponseClass[]
  onUpdateClassrooms: () => void
}> = ({ classrooms, onUpdateClassrooms }) => {
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
  const [showMenu, setShowMenu] = useState<{ [key: string]: boolean }>({})
  const [selectedClass, setSelectedClass] = useState<IResponseClass>({} as IResponseClass)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)

  const openModal = (myclass: IResponseClass): void => {
    setSelectedClass(myclass)
    setIsModalOpen(true)
  }
  const closeModal = (): void => {
    if (typeof onUpdateClassrooms === 'function') {
      onUpdateClassrooms()
    }
    setIsModalOpen(false)
  }

  const openModalEdit = (myclass: IResponseClass): void => {
    setSelectedClass(myclass)
    setIsModalEditOpen(true)
  }
  const closeModalEdit = (): void => {
    if (typeof onUpdateClassrooms === 'function') {
      onUpdateClassrooms()
    }
    setIsModalEditOpen(false)
  }
  const handleCancelClassRoom = async (id: string): Promise<void> => {
    const { isConfirmed } = await Swal.fire({
      title: 'Tens a certeza?',
      text: 'Esta acção não pode ser revertida!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, cancelar!',
      cancelButtonText: 'anular',
      customClass: {
        confirmButton: 'bg-red-600'
      }
    })
    if (isConfirmed) {
      await updateClassStatusService(id, 'inactive')
      if (typeof onUpdateClassrooms === 'function') {
        onUpdateClassrooms()
      }
    }
  }

  const DropDownMenu: React.FC<{ myclass: IResponseClass }> = ({ myclass }) => {
    return (
      <div className="absolute right-0 top-9 bg-zinc-500 shadow-lg rounded-md z-20">
        <ul>
          <li>
            <button
              type="button"
              className="flex items-center p-2 hover:bg-zinc-600 w-full"
              onClick={() => openModal(myclass)}
            >
              <span className="mr-2">
                <Plus />
              </span>
              <span>Adicionar Aluno</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="flex items-center p-2 hover:bg-zinc-600 w-full"
              onClick={() => openModalEdit(myclass)}
            >
              <span className="mr-2">
                <PenSquareIcon />
              </span>
              <span>Editar Turma</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="flex items-center p-2 hover:bg-zinc-600 w-full"
              onClick={() => handleCancelClassRoom(myclass?._id as string)}
            >
              <span className="mr-2">
                <XOctagon />
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
    <>
      <Slider {...settings}>
        {classrooms.map((classroom) => (
          <div
            key={classroom?._id}
            className="relative flex bg-zinc-800 hover:bg-zinc-700 hover:cursor-pointer p-2 max-w-[300px] h-[11rem] mx-1 rounded shadow hover:shadow-lg"
            onDoubleClick={() => {
              navigate(`/classes/show/${classroom?._id}`, {
                state: { class: classroom }
              })
            }}
          >
            <section className="flex justify-between">
              <h3 className="text-lg border-b w-10/12">{classroom?.className}</h3>

              <button
                type="button"
                className=" text-orange-300 bg-transparent active:opacity-70 transition-opacity"
                onClick={() =>
                  setShowMenu((prev) => ({
                    ...prev,
                    [classroom?._id as string]: !prev[classroom?._id as string]
                  }))
                }
              >
                <MoreVertical />
              </button>
              {showMenu[classroom?._id as string] && <DropDownMenu myclass={classroom} />}
            </section>
            <main>
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
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div>
            <h2 className="text-3xl">Adicionar alunos</h2>
            <div className="bg-orange-700 text-orange-700 h-2 mt-2 w-16" />
            <ModalAddStudent selectedClass={selectedClass} />
          </div>
        </Modal>
      )}

      {isModalEditOpen && (
        <Modal onClose={() => closeModalEdit()} isOpen={isModalEditOpen}>
          <h2 className="text-3xl">Editar {selectedClass.className}</h2>
          <div className="bg-orange-700 text-orange-700 h-2 mt-2 w-16" />
          <FormEditClass onClose={() => closeModalEdit()} selectedClass={selectedClass} />
        </Modal>
      )}
    </>
  )
}
