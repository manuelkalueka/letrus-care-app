import React, { useEffect, useState } from 'react'
import { Footer } from '@renderer/components/Footer'
import { HeaderMain } from '@renderer/components/HeaderMain'
import { Sidebar } from '@renderer/components/Sidebar'
import { IResponseClass } from '@renderer/services/class-service'
import { useLocation } from 'react-router'
import { CheckCheck, NotebookPen, X } from 'lucide-react'
import { ITeacher } from '@renderer/services/teacher-service'
import { createFormalName } from '@renderer/utils'

export const ShowClassScreen: React.FC = () => {
  const [classRoom, setClassRoom] = useState<IResponseClass>({} as IResponseClass)
  const location = useLocation()

  useEffect(() => {
    setClassRoom(location.state?.class)
  }, [location.state])
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const [attendance, setAttendance] = useState({})

  // async function fetchClass(): Promise<void> {
  //   const classResult = await getClassService(classRoom._id as string)
  //   setClassRoom(classResult)
  // }

  // //em caso de actualização colocar dependentes correctos
  // useEffect(() => {
  //   fetchClass()
  // }, [])

  const handleAttendance = (studentId: string, status: string): void => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }))
  }

  const [isLessonOpened, setIsLessonOpened] = useState(false)

  function showTeachers(teachers: ITeacher[]): string {
    if (!teachers || teachers.length === 0) {
      return ''
    }

    let names = createFormalName(teachers[0].fullName)

    if (teachers.length > 1 && teachers.length < 3) {
      names += ' e ' + createFormalName(teachers[teachers.length - 1].fullName)
    } else if (teachers.length > 2) {
      for (let i = 1; i < teachers.length - 1; i++) {
        names += ', ' + createFormalName(teachers[i].fullName)
      }

      names += ' e ' + createFormalName(teachers[teachers.length - 1].fullName)
    }

    return names
  }

  return (
    <div className="flex flex-col h-screen">
      <HeaderMain isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex flex-1 justify-center pt-[62px] lg:pt-[70px] overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="flex flex-col flex-1 overflow-hidden pt-4">
          <div className="flex flex-col flex-1 w-11/12 mx-auto">
            {classRoom ? (
              <>
                <div className="flex justify-between items-center w-full mx-auto bg-zinc-800 p-6 rounded-lg shadow-md">
                  <div>
                    <h2 className="text-3xl text-zinc-400">{classRoom.className}</h2>
                    <article className="text-zinc-300 mt-3">
                      <p>Professores: {showTeachers(classRoom?.teachers)}</p>
                      <p>Nível: {classRoom.grade?.grade}</p>
                      <p>Curso: {classRoom.course?.name}</p>
                    </article>
                  </div>
                  <div>
                    <button className="bg-orange-700 text-white px-4 py-2 rounded hover:brightness-110 transition-all">
                      Nova Aula
                    </button>
                  </div>
                </div>
                <div>
                  <h3
                    className={`${isLessonOpened ? 'text-zinc-200' : 'text-zinc-700'} mt-4 text-xl font-semibold transition-all`}
                  >
                    Lista de Alunos
                  </h3>
                  <div className="max-h-[76%] overflow-auto">
                    <ul
                      className={`mt-2 ${isLessonOpened ? 'text-zinc-200' : 'text-zinc-700'} transition-all`}
                    >
                      {classRoom.students?.map((student, index) => (
                        <li
                          key={student?._id as string}
                          className="flex justify-between items-center p-2 border-b border-zinc-700"
                        >
                          <span>
                            {index + 1}. {student?.name?.fullName}
                          </span>
                          <div className="space-x-2">
                            <button
                              disabled={!isLessonOpened}
                              title="Presente"
                              className={`px-3 py-1 rounded ${
                                attendance[student?._id as string] === 'present'
                                  ? 'bg-green-500 text-white'
                                  : 'bg-zinc-700'
                              }`}
                              onClick={() => handleAttendance(student?._id as string, 'present')}
                            >
                              <CheckCheck />
                            </button>
                            <button
                              disabled={!isLessonOpened}
                              title="Ausente"
                              className={`px-3 py-1 rounded ${
                                attendance[student?._id as string] === 'absent'
                                  ? 'bg-red-500 text-white'
                                  : 'bg-zinc-700'
                              }`}
                              onClick={() => handleAttendance(student?._id as string, 'absent')}
                            >
                              <X />
                            </button>
                            <button
                              disabled={!isLessonOpened}
                              title="Adicionar Nota"
                              className="px-3 py-1 rounded bg-zinc-700"
                              onClick={() => alert('Modal de Observação')}
                            >
                              <NotebookPen />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <h4 className="mt-6 text-zinc-700">
                    Total de Alunos: {classRoom.students?.length}
                  </h4>
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-center">Carregando dados da turma...</p>
            )}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
