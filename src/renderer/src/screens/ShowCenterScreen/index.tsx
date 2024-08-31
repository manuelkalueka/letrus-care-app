import React from 'react'
import { useNavigate } from 'react-router-dom'

// import { Container } from './styles';

export const ShowCenterScreen: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1
        onClick={() => {
          navigate('/login')
        }}
      >
        Show center Screen
      </h1>
    </div>
  )
}
