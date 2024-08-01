import React from 'react'
import { LogoLectrus } from '../LogoLectrus'
export const Header: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 h-[62px] lg:h-[70px] bg-gray-850 border border-transparent border-b-gray-700 flex px-4 lg:pr-8 bg-gray-850 border-b border-gray-700 items-center z-50">
      <section>
        <div>
          <LogoLectrus sizeFont="text-xl" sizeImage={30} />
        </div>
      </section>
    </div>
  )
}
