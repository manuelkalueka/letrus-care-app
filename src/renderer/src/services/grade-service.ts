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

export async function getGradesService(centerId: string) {
  try {
    const { data } = await apiMananger.get(`/grades/all/${centerId}`)
    return data
  } catch (error) {
    console.log('Erro ao buscar níveis', error)
    throw error
  }
}

export async function getGradeService(gradeId: string) {
  try {
    const { data } = await apiMananger.get(`/grades/${gradeId}`)
    return data
  } catch (error) {
    console.log('Erro ao buscar nível', error)
    throw error
  }
}

export async function editGradeService(gradeId: string, data: IGrade) {
  try {
    await apiMananger.put(`/grades/edit/${gradeId}`, data)
  } catch (error) {
    console.log('Erro ao editar nível', error)
    throw error
  }
}

export async function deleteGradeService(id: string): Promise<void> {
  try {
    await apiMananger.delete(`/grades/delete/${id}`)
  } catch (error) {
    console.log('Erro ao eliminar níveis', error)
    throw error
  }
}
