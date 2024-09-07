import moment from 'moment'

function relativeTime(dateStr: string): string {
  // Parse a string no formato YYYYMMDD em um objeto Date
  const date = moment(dateStr)

  // Define a localização para português de Portugal
  moment.locale('pt-PT')
  const newDate = date.fromNow()
  // Retorna a data relativa em formato de frase
  return newDate
}

function formatDate(dateStr: string): string {
  const date = moment(dateStr)
  moment.locale('pt-PT')

  // Formata a data no formato DD/MM/YYYY
  return date.format('DD/MM/YYYY')
}

function getHour(date: Date): string {
  const dataString = date
  // Converta a string para um objeto Moment
  const dataMoment = moment(dataString)

  // Extraia apenas a hora da data
  const hora = dataMoment.format('HH:mm:ss')
  return hora
}

function formatDateWithTime(date: Date) {
  return moment(date).locale('pt').format('MMMM Do YYYY, h:mm:ss a')
}

function formateCurrency(value): string {
  const newValue = new Intl.NumberFormat('pt', { style: 'currency', currency: 'AOA' }).format(value)

  return newValue
}
export { relativeTime, formatDate, getHour, formatDateWithTime, formateCurrency }
