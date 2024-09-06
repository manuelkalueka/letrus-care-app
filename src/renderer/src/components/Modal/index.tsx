import React from 'react'
interface ModalProps {
  title: string
  body: React.ReactNode
}
export const Modal: React.FC<ModalProps> = (props) => {
  return (
    <div>
      <header>
        <h2>{props.title}</h2>
      </header>
      <section>{props.body}</section>
    </div>
  )
}
