import React, { useState, useEffect } from 'react'
import { useAuth } from '@renderer/contexts/auth-context'
import { useCenter } from '@renderer/contexts/center-context'
import { formatDateWithTime } from '@renderer/utils/format-date'

export const DateTimeDisplay: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(formatDateWithTime(new Date()))

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(formatDateWithTime(new Date()))
    }, 1000) // Atualiza a cada segundo

    return (): void => clearInterval(interval) // Limpa o intervalo ao desmontar o componente
  }, [])

  return <p>Data: {currentTime} </p>
}

export const Footer: React.FC = () => {
  const { center } = useCenter()
  const { user } = useAuth()
  return (
    <div className="flex items-center justify-between px-4 py-1 bg-zinc-900">
      <p className="text-orange-700 capitalize">{center?.name}</p>
      <p className="text-orange-700">{user?.username}</p>
      <DateTimeDisplay />
    </div>
  )
}
