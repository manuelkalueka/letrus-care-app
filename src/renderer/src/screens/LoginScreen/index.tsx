import { loginService } from '@renderer/services/user'
import React from 'react'

export const LoginScreen: React.FC = () => {
  return (
    <div >
      <h1>Sou o Login</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, rerum at quo officia, autem
        impedit vero aliquam expedita nisi necessitatibus labore. Repellat, reiciendis. Consectetur
        deserunt quasi officia alias dolor quia.
      </p>
      <button
        type="button"
        onClick={async () => {
          await loginService({ username: 'admin', password: '1234' })
        }}
      >
        Requisitar Login
      </button>
    </div>
  )
}
