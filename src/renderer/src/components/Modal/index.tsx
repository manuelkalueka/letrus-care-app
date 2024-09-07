import { X } from 'lucide-react'
import React from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-70" onClick={onClose}></div>
      <div className="relative bg-zinc-800 p-8 rounded-lg shadow-lg w-1/2">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="active:text-orange-700" />
        </button>
        {children}
      </div>
    </div>
  )
}
