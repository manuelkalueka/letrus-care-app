import apiMananger from './api'

interface IEnrollment {
  studentId?: string
  courseId?: string
  enrollmentDate: Date
  grade: string | string
  name: { fullName: string; surname?: string }
  birthDate: Date
  gender: 'masculino' | 'feminino'
  parents: { father: string; mother: string }
  address: string
  phoneNumber: string
  email?: string
  centerId?: string
}

export const createEnrollment = async (data: IEnrollment): Promise<void> => {
  const { enrollmentDate, name, birthDate, gender, parents, address, phoneNumber, email } = data

  const centerId = '66cf4452cd7b270579633e7a' // ID fixo para centro e curso
  const courseId = '66cf4452cd7b270579633e7a' // ID fixo para curso
  const grade = '66cf4452cd7b270579633e7a' // ID fixo para grade

  try {
    // Cria o estudante
    const { data: studentData } = await apiMananger.post('/students/new', {
      name,
      birthDate,
      gender,
      address,
      phoneNumber,
      email,
      parents,
      centerId
    })

    // Usa o ID do estudante recém-criado para criar a inscrição
    await apiMananger.post('/enrollments/new', {
      courseId,
      enrollmentDate,
      grade,
      centerId,
      studentId: studentData?._id
    })
  } catch (error) {
    console.log('Erro ao criar inscrição:', error)
    throw error
  }
}
