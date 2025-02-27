import { useCenter } from '@renderer/contexts/center-context'
import { editClassService, IClass, IResponseClass } from '@renderer/services/class-service'
import { getStudentsForClassService, IEnrollment } from '@renderer/services/enrollment-service'
import { IStudent } from '@renderer/services/student'
import { CheckCircle, PlusCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export const ModalAddStudent: React.FC<{ selectedClass: IResponseClass }> = ({ selectedClass }) => {
  const [studentList, setStudentList] = useState<IEnrollment[]>()
  const { center } = useCenter()
  const fetchStudents = async (): Promise<void> => {
    try {
      const results = await getStudentsForClassService(center?._id as string, {
        courseId: selectedClass.course?._id as string,
        grade: selectedClass.grade?._id as string
      })
      setStudentList(results)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  const [isAdded, setIsAdded] = useState<{ [key: string]: boolean }>({})
  const handleEditClass = async (studentId: string): Promise<void> => {
    try {
      const currentStudents = selectedClass.students as IStudent[]
      const updatedStudents = [...currentStudents, studentId]
      await editClassService(
        selectedClass?._id as string,
        {
          students: updatedStudents
        } as IClass
      )
      setIsAdded((prev) => ({
        ...prev,
        [studentId]: true
      }))
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  return (
    <div>
      {studentList ? (
        <ul className="mt-2 text-zinc-200 bg-zinc-700 rounded-md p-2">
          {studentList.map((enrollment) => (
            <li
              key={enrollment.studentId?._id}
              className="flex justify-between items-center p-2 border-b border-zinc-600"
            >
              <span>{enrollment.studentId?.name?.fullName}</span>
              <div className="space-x-2">
                {!isAdded[enrollment.studentId?._id] ? (
                  <button
                    title="Adicionar"
                    className="px-3 py-1 rounded text-white"
                    onClick={() => handleEditClass(enrollment.studentId?._id)}
                  >
                    <PlusCircle />
                  </button>
                ) : (
                  <button title="adicionado" className="px-3 py-1 rounded text-white">
                    <CheckCircle />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p>Sem alunos inscritos para esse curso e nível</p>
        </div>
      )}
    </div>
  )
}
