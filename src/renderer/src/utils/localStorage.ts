export const saveToLocalStorage = (key: string, value): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getFromLocalStorage = (key: string): object | null => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

export const removeFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key)
}
