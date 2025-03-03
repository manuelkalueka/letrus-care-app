import React, { useState } from 'react'
import { Footer } from '@renderer/components/Footer'
import { HeaderMain } from '@renderer/components/HeaderMain'
import { Sidebar } from '@renderer/components/Sidebar'

// const schema = yup
//   .object({
//     name: yup.string().required('Preecha o Nome do Centro'),
//     address: yup.string().required('Preecha o endereço do centro'),
//     phoneNumber: yup.string().required('Preecha o Telefone'),
//     email: yup.string().email('Email Inválido'),
//     nif: yup.string(),
//     documentCode: yup.string()
//   })
//   .required()
// type FormData = yup.InferType<typeof schema>

export const UserProfile: React.FC = () => {
  // const { user: userAuth } = useAuth()
  // const { center } = useCenter()
  // const [user, setUser] = useState<object | null>(null)

  // useEffect(() => {
  //   setUser({ userAuth, center })
  // }, [])

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors }
  // } = useForm<FormData>({
  //   resolver: yupResolver(schema)
  // })

  // const onSubmit = async (data: FormData): Promise<void> => {
  //   try {
  //     Swal.fire({
  //       position: 'bottom-end',
  //       icon: 'success',
  //       title: 'Centro Editado com Sucesso!',
  //       showConfirmButton: false,
  //       timer: 2000,
  //       customClass: {
  //         popup: 'h-44 p-2', // Define a largura e o padding do card
  //         title: 'text-sm', // Tamanho do texto do título
  //         icon: 'text-xs' // Reduz o tamanho do ícone
  //       },
  //       timerProgressBar: true // Ativa a barra de progresso
  //     })
  //   } catch (error) {
  //     Swal.fire({
  //       position: 'bottom-end',
  //       icon: 'error',
  //       title: 'Verifique os dados',
  //       showConfirmButton: false,
  //       timer: 2000,
  //       customClass: {
  //         popup: 'h-44 p-2',
  //         title: 'text-sm',
  //         icon: 'text-xs'
  //       },
  //       timerProgressBar: true
  //     })
  //   }
  // }
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <HeaderMain isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex flex-1 justify-center  pt-[62px] lg:pt-[70px] overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="flex flex-col flex-1 pt-4 overflow-auto">
          <div className="flex flex-col flex-1 w-11/12 mx-auto">
            {/* Título */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl text-zinc-400">Perfil</h2>
              </div>
            </div>

            {/* Informações Gerais */}
            {/* <div className="my-2 p-8 bg-zinc-900 rounded-md shadow-lg text-gray-200">
              <h2 className="text-lg font-semibold text-gray-400">Informações Pessoais</h2>
              <div className="flex items-center gap-2 mt-4">
                <div className="bg-red-700 size-40  rounded-md shadow-lg">FOTO</div>
                <div>
                  <p>
                    <span className="font-bold">Nome:</span> {user?.userAuth.username}
                  </p>
                  <p>
                    <span className="font-bold">Email:</span> {user?.userAuth.role}
                  </p>
                  <p>
                    <span className="font-bold">Telefone:</span> {user?.userAuth.role}
                  </p>
                  <p>
                    <span className="font-bold">Função:</span> {user?.userAuth.role}
                  </p>
                </div>
              </div>

              {/* Centro de Acesso */}
            {/* {user?.center && (
                <div className="flex flex-col gap-2 mt-4">
                  <h2 className="text-lg font-semibold text-gray-400">Centro de Acesso</h2>
                  <p>
                    <span className="font-bold">Nome:</span> {user?.center.name}
                  </p>
                  <p>
                    <span className="font-bold">Endereço:</span> {user?.center.address}
                  </p>
                </div>
              )} */}

            {/* Datas */}
            {/* <div className="flex flex-col gap-2 mt-4">
                <h2 className="text-lg font-semibold text-gray-400">Histórico</h2>
                <p>
                  <span className="font-bold">Criado em:</span>{' '}
                  {new Date(user?.userAuth.createdAt).toLocaleDateString('pt-PT', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </p>
                <p>
                  <span className="font-bold">Última actualização:</span>{' '}
                  {new Date(user?.userAuth.updatedAt).toLocaleDateString('pt-PT', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </p>
              </div> */}
          </div>
          {/* Botões */}
          <div className="flex gap-4 mt-2">
            <button
              onClick={() => alert('Função para editar o perfil!')}
              className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-all"
            >
              Editar Perfil
            </button>
            <button
              onClick={() => alert('Função para voltar à página anterior!')}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-all"
            >
              Voltar
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
