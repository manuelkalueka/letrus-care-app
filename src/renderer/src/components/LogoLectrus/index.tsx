import React from 'react'
import Logo from '../../assets/logo-vector.png'

export const LogoLectrus: React.FC = () => {
  return (
    <h1 className="flex items-center mb-5">
      <img src={Logo} alt="Logo da Letrus Care" width={40} />
      <span className="text-3xl">LETRUS CARE</span>
    </h1>
  )
}
