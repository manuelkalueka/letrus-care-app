import React from 'react'
import Logo from '../../assets/logo-vector.png'

interface LogoProps {
  sizeImage: number
  sizeFont: string
}
export const LogoLectrus: React.FC<LogoProps> = ({ sizeFont, sizeImage }) => {
  return (
    <h1 className="flex items-center">
      <img src={Logo} alt="Logo da Letrus Care" width={sizeImage} />
      <span className={sizeFont}>LETRUS CARE</span>
    </h1>
  )
}
