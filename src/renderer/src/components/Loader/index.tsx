import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'

export const LoaderComponent: React.FC = () => {
  return (
    <div className="flex items-center flex-col justify-center h-lvh gap-4">
      <ThreeCircles
        visible={true}
        height="80"
        width="80"
        color="#c2410c"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <p>Carregando...</p>
    </div>
  )
}
