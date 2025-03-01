import { yupResolver } from '@hookform/resolvers/yup'
import { editCourse, ICourse } from '@renderer/services/course-service'
import { useForm } from 'react-hook-form'
import { Rings } from 'react-loader-spinner'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import * as yup from 'yup'
const schema = yup
  .object({
    name: yup.string().required('Preecha o nome do curso'),
    description: yup.string().required('Explique um pouco sobre o curso'),
    startDate: yup.date().required(),
    endDate: yup.date().required(),
    fee: yup.number().required('Preecha a propina'),
    feeFine: yup.number().required('Preecha a multa'),
    courseType: yup.string().oneOf(['on_home', 'on_center'])
  })
  .required()
type FormData = yup.InferType<typeof schema>

interface ModalEditCourseProps {
  data: ICourse | null
  onClose: () => void
}
export const ModalEditCourse: React.FC<ModalEditCourseProps> = ({ data: courseInfo, onClose }) => {
  const MySwal = withReactContent(Swal)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  const onSubmit = async (data: FormData): Promise<void> => {
    try {
      await editCourse(courseInfo?._id as string, data)
      onClose()
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Novas Informações de Curso Salvas',
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: 'h-44 p-2', // Define a largura e o padding do card
          title: 'text-sm', // Tamanho do texto do título
          icon: 'text-xs' // Reduz o tamanho do ícone
        },
        timerProgressBar: true // Ativa a barra de progresso
      })
    } catch (error) {
      MySwal.fire({
        title: 'Erro interno',
        text: 'Erro ao Salvar.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 flex-col my-[5%]">
      <label className="text-gray-200" htmlFor="name">
        Nome do Curso
      </label>
      <input
        {...register('name')}
        placeholder="Nome do curso"
        defaultValue={courseInfo?.name}
        id="name"
        type="text"
        className="w-full h-12 p-3  bg-zinc-950 rounded-md focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
      />
      <span className="text-red-500">{errors.name?.message}</span>

      <label className="text-gray-200" htmlFor="description">
        Descrição
      </label>
      <input
        {...register('description')}
        placeholder="Descrição"
        defaultValue={courseInfo?.description}
        id="description"
        type="text"
        maxLength={120}
        className="w-full h-12 p-3 bg-zinc-950 rounded-md focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
      />
      <span className="text-red-500">{errors.description?.message}</span>
      <label className="text-gray-200" htmlFor="startDate">
        Data de Ínicio
      </label>
      <input
        {...register('startDate')}
        id="startDate"
        defaultValue={
          courseInfo?.startDate ? new Date(courseInfo?.startDate).toISOString().split('T')[0] : ''
        }
        type="date"
        required
        className="w-full h-12 p-3 bg-zinc-950 rounded-md focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
      />
      <label className="text-gray-200" htmlFor="fee">
        Propina Mensal (Kz)
      </label>
      <input
        {...register('fee')}
        placeholder="Propina"
        defaultValue={courseInfo?.fee}
        id="fee"
        type="number"
        min={0}
        className="w-full h-12 p-3 bg-zinc-950 rounded-md focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
      />
      <span className="text-red-500">{errors.fee?.message}</span>
      <label className="text-gray-200" htmlFor="fee">
        Multa por atraso (Kz)
      </label>
      <input
        {...register('feeFine')}
        defaultValue={courseInfo?.feeFine}
        placeholder="Multa"
        id="feeFine"
        type="number"
        min={0}
        className="w-full h-12 p-3 bg-zinc-950 rounded-md focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
      />
      <span className="text-red-500">{errors.feeFine?.message}</span>
      <label className="text-gray-200" htmlFor="endDate">
        Data de Término
      </label>
      <input
        {...register('endDate')}
        id="endDate"
        type="date"
        defaultValue={
          courseInfo?.endDate ? new Date(courseInfo?.endDate).toISOString().split('T')[0] : ''
        }
        required
        className="w-full h-12 p-3 bg-zinc-950 rounded-md focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
      />
      <label className="text-gray-200" htmlFor="courseType">
        Modalidade do Curso
      </label>
      <select
        {...register('courseType')}
        id="courseType"
        required
        className="w-full h-12 p-3 bg-zinc-950 rounded-md focus:border-0  border-gray-700 outline-none text-gray-100 text-base font-normal placeholder:text-gray-400 transition-colors"
        defaultValue={courseInfo?.courseType}
      >
        <option value="on_center">Centro</option>

        <option value="on_home">Domiciliar</option>
      </select>

      <button
        type="submit"
        className="flex items-center justify-center bg-orange-700 w-full h-12 p-3 text-white shadow-shape rounded-md"
      >
        {isSubmitting ? (
          <Rings
            height="32"
            width="32"
            color="#fff"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : (
          <span>Salvar</span>
        )}
      </button>
    </form>
  )
}
