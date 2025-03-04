/// <reference types="vite/client" />

// Permite importação de arquivos PNG como módulos
declare module '*.png' {
  const value: string
  export default value
}
