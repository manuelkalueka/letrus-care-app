import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCenter } from '@renderer/contexts/center-context'
import { getTeachersServiceAll, ITeacher } from '@renderer/services/teacher-service'

import { editClassService, IResponseClass } from '@renderer/services/class-service'
import Swal from 'sweetalert2'

const classSchema = yup
  .object({
    className: yup.string().required(),
    period: yup.string().oneOf(['morning', 'moon', 'evening']).required(),
    classLimit: yup.number().required(),
    teachers: yup.array().of(yup.string().required()).required(),
    schedule: yup.string().required()
  })
  .required()

type FormData = yup.InferType<typeof classSchema>

export const FormEditClass: React.FC<{ onClose: () => void; selectedClass: IResponseClass }> = ({
  onClose,
  selectedClass
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(classSchema),
    defaultValues: {
      teachers: getTeachersId(selectedClass.teachers as ITeacher[])
    }
  })

  const [teachers, setTeachers] = useState<ITeacher[] | null>(null)

  const { center } = useCenter()

  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([])

  useEffect(() => {
    const fetchTeachers = async (): Promise<void> => {
      const data = await getTeachersServiceAll(center?._id as string)
      setTeachers(data)
    }

    fetchTeachers()
  }, [center?._id])

  function getTeachersId(teachers: ITeacher[]): string[] {
    if (!teachers || teachers.length === 0) {
      return []
    }

    const tId = new Array<string>()
    teachers?.forEach((t) => tId.push(t?._id as string))
    return tId
  }

  // Atualiza os professores selecionados da turma
  useEffect(() => {
    if (selectedClass?.teachers) {
      const teacherIds = selectedClass.teachers.map((t) => (t as ITeacher)._id)
      setSelectedTeachers(teacherIds as string[])
      setValue('teachers', teacherIds as string[]) // Atualiza o campo corretamente
    }
  }, [selectedClass, setValue])
  const onSubmit = async (data: FormData): Promise<void> => {
    try {
      await editClassService(selectedClass?._id as string, data)
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'alterações salvas com sucesso',
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: 'h-44 p-2',
          title: 'text-sm',
          icon: 'text-xs'
        },
        timerProgressBar: true
      })
      onClose()
    } catch (error) {
      Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: 'Ocoreeu um erro',
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: 'h-44 p-2',
          title: 'text-sm',
          icon: 'text-xs'
        },
        timerProgressBar: true
      })
      console.error('Erro ao salvar alterações: ', error)
      throw error
    }
  }
  return (
    <>
      <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <label className="text-gray-200" htmlFor="className">
            Nome da turma
          </label>
          <input
            id="className"
            {...register('className')}
            defaultValue={selectedClass.className}
            type="text"
            className="w-full h-12 p-3  bg-zinc-950 rounded-md focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
          />
          {errors.className && <p className="text-red-500">{errors.className?.message}</p>}
        </div>
        <div>
          <label className="text-gray-200" htmlFor="teachers">
            Professor(es)
          </label>
          <select
            id="teachers"
            multiple
            {...register('teachers')}
            value={selectedTeachers}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions, (option) => option.value)
              setSelectedTeachers(values)
              setValue('teachers', values)
            }}
            className="w-full h-12 p-3  bg-zinc-950 rounded-md focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
          >
            {teachers?.map((teacher) => (
              <option key={teacher?._id} value={teacher?._id}>
                {teacher?.fullName}
              </option>
            ))}
          </select>
          {errors.teachers && <p className="text-red-500">{errors.teachers?.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-200" htmlFor="period">
              Período
            </label>
            <select
              id="period"
              {...register('period')}
              defaultValue={selectedClass.period}
              className="w-full h-12 p-3  bg-zinc-950 rounded-md focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
            >
              <option value="morning">Manhã</option>
              <option value="moon">Tarde</option>
              <option value="evening">Noite</option>
            </select>
          </div>
          <div>
            <label className="text-gray-200" htmlFor="schedule">
              Horário
            </label>
            <input
              id="schedule"
              {...register('schedule')}
              type="text"
              defaultValue={selectedClass.schedule}
              className="w-full h-12 p-3  bg-zinc-950 rounded-md focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
              placeholder="Ex.: 7h-10h"
            />
            {errors.schedule && <p className="text-red-500">{errors.schedule?.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <label className="text-gray-200" htmlFor="classLimit">
            Limite de Alunos
          </label>
          <input
            id="classLimit"
            {...register('classLimit')}
            min={20}
            defaultValue={selectedClass.classLimit}
            type="number"
            className="w-full h-12 p-3  bg-zinc-950 rounded-md focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
            placeholder="min: 20"
          />
          {errors.classLimit && <p className="text-red-500">{errors.classLimit?.message}</p>}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-orange-700 w-full h-12 p-3 text-white shadow-shape rounded-md"
          >
            Salvar
          </button>
        </div>
      </form>
    </>
  )
}
