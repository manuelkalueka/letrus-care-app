import React from 'react'
import { TailSpin } from 'react-loader-spinner'

export const LoaderComponent: React.FC = () => {
  return (
    <div className="flex items-center flex-col justify-center h-lvh gap-4">
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#D97706"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <p>Carregando...</p>
    </div>
  )
}
