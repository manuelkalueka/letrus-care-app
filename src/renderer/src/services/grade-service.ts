import apiMananger from './api'

interface IGrade {
  grade: string
  centerId: string
}

export async function createGrade(data: IGrade): Promise<void> {
  try {
    await apiMananger.post('/grades/new', data)
  } catch (error) {
    console.log('Erro ao criar nível ', error)
    throw error
  }
}

export async function getGradesService() {
  try {
    const { data } = await apiMananger.get('/grades/all')
    return data
  } catch (error) {
    console.log('Erro ao buscar níveis', error)
    throw error
  }
}

export async function deleteGradeService(id: string): Promise<void> {
  try {
    await apiMananger.patch(`/grades/delete/${id}`)
  } catch (error) {
    console.log('Erro ao eliminar níveis', error)
    throw error
  }
}
