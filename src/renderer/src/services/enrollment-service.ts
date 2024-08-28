import apiMananger from './api'

interface IEnrollment {
  studentId: string
  courseId: string
  enrollmentDate: Date
  grade: string | string
  name: { fullName: string; surname?: string }
  birthDate: Date
  gender: 'masculino' | 'feminino'
  parents: { father: string; mother: string }
  address: string
  phoneNumber: string
  email?: string
  centerId: string
}
export const createEnrollment = async (data: IEnrollment) => {
  const {
    courseId,
    enrollmentDate,
    grade,
    name,
    birthDate,
    gender,
    parents,
    address,
    phoneNumber,
    email,
    centerId
  } = data
  try {
    const student = await apiMananger.post('/student/new', {
      name,
      birthDate,
      gender,
      address,
      phoneNumber,
      email,
      parents
    })

    const { status } = await apiMananger.post('/enrollment/new', {})

    return status
  } catch (error) {
    console.log(error)
  }
}
