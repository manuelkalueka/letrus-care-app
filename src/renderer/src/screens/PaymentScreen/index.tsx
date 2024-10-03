import { Header } from '@renderer/components/Header'
import { Sidebar } from '@renderer/components/Sidebar'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const PaymentScreen: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      <div className="flex flex-1 pt-[62px] lg:pt-[70px] overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto p-4">
          <div className="flex flex-col flex-1 w-11/12 mx-auto">
            <h2 className="text-3xl text-zinc-400">Pagamentos</h2>
            <article className="text-zinc-600 mt-3">
              <p>Mantém controlo das contribuições dos alunos</p>
            </article>
            <button
              onClick={() => {
                navigate('/payments/new')
              }}
              className="bg-orange-700 text-white px-4 py-2 rounded hover:brightness-110 transition-all mt-4 self-end"
            >
              Novo Pagamento
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
