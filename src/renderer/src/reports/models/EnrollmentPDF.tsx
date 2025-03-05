import React, { useEffect, useState } from 'react'
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'
import Logo from '../../assets/logo-vector.png'
import { getFromStorage } from '../../utils/storage'
import { ICenter } from '@renderer/services/center-service'
import { formatDateWithTimeNoWeekDay, formateCurrency } from '@renderer/utils/format'
import { createFormalName } from '@renderer/utils'
import { IEnrollmentForShow, IEnrollmentReceipt } from '@renderer/services/enrollment-service'
import { TableEnrollmentDetails } from '../components/TableEnrollmentDetails'

interface EnrollmentPDFProps {
  selectedEnrollment: {
    enrollment: IEnrollmentForShow
    receipt: IEnrollmentReceipt
  }
}

export const EnrollmentPDF: React.FC<EnrollmentPDFProps> = ({ selectedEnrollment }) => {
  const [center, setCenter] = useState<ICenter>({} as ICenter)

  const [imageFromDB, setImageFromDB] = useState('')
  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const storagedCenter: ICenter = getFromStorage('center') as ICenter
      if (storagedCenter) {
        setCenter(storagedCenter)
        if (storagedCenter?.fileData) {
          setImageFromDB(storagedCenter.fileData)
        }
      }
    }
    loadStorageData()
  }, [])

  function calculateAge(): number {
    const today = new Date().getFullYear()
    const birthDate = new Date(selectedEnrollment.enrollment.studentId?.birthDate).getFullYear()
    return today - birthDate
  }

  return (
    <Document>
      <Page size={'A5'} style={styles.page} orientation="landscape">
        <View style={styles.header}>
          <Image
            src={imageFromDB ? `data:${center?.fileType};base64,${imageFromDB}` : Logo}
            style={{
              width: 30,
              height: 30
            }}
          />
          <Text style={styles.titleCenter}>{center.name}</Text>
          <Text>Secretaria Geral</Text>
          <Text style={styles.titleDocument}>
            Confirmação de Matrícula - Ano Lectivo {center.year_school}
          </Text>
        </View>
        <View style={styles.section}>
          <View style={[styles.horiSection, styles.textMin]}>
            <Text>Recibo Nº: {selectedEnrollment?.receipt.receiptNumber}</Text>

            <Text>
              Data de Inscrição:{' '}
              {formatDateWithTimeNoWeekDay(selectedEnrollment?.enrollment?.enrollmentDate as Date)}
            </Text>
          </View>
          <View style={styles.boxContent}>
            <View>
              <Text style={styles.lineSpace}>
                <Text style={styles.label}>Nome: </Text>
                {createFormalName(selectedEnrollment.enrollment?.studentId?.name?.fullName)}
              </Text>
              <Text style={styles.lineSpace}>
                <Text style={styles.label}>
                  Código: {selectedEnrollment.enrollment?.studentId?.studentCode}
                </Text>
              </Text>
              <Text style={styles.lineSpace}>
                <Text style={styles.label}>Telefone: </Text>{' '}
                {selectedEnrollment.enrollment?.studentId?.phoneNumber}
              </Text>
              <Text style={styles.lineSpace}>
                <Text style={styles.label}>Curso: </Text>{' '}
                {selectedEnrollment.enrollment?.courseId?.name}
              </Text>
              <Text style={styles.lineSpace}>
                <Text style={styles.label}>Idade: </Text>{' '}
                {`${calculateAge()} ${calculateAge() > 1 ? 'anos' : 'ano'}`}
              </Text>
            </View>
            <View>
              <Text style={styles.lineSpace}>
                <Text style={styles.label}>Turma: </Text> [Geral]
              </Text>
              <Text style={styles.lineSpace}>
                <Text style={styles.label}>Nível: </Text>{' '}
                {selectedEnrollment.enrollment?.grade?.grade}
              </Text>
              <Text style={styles.lineSpace}>
                <Text style={styles.label}>Periodo: </Text> [Manhã]
              </Text>
              <Text style={styles.lineSpace}>
                <Text style={styles.label}>Turno: </Text> [7h-9h20]
              </Text>
              <Text style={styles.lineSpace}>
                <Text style={styles.label}>Total Pago: </Text>{' '}
                {formateCurrency(selectedEnrollment.enrollment.courseId?.enrollmentFee)}
              </Text>
            </View>
          </View>
          <View style={{ marginVertical: 4, fontSize: 10 }}>
            <Text>Detalhes de Pagamento Descritos Abaixo: </Text>
          </View>

          <TableEnrollmentDetails
            rows={[
              {
                year: center.year_school as string,
                service: 'Emolumento',
                description: 'Taxa de Inscrição',
                amount: selectedEnrollment.enrollment.courseId?.enrollmentFee as number,
                status: 'Pago'
              }
            ]}
          />
          <View style={{ marginVertical: 4 }} />

          <View style={[styles.horiSection, { marginTop: 15 }]}>
            <View style={styles.signView}>
              <Text>O (a) Encarregado (a)</Text>
              <Text style={styles.signBar}></Text>
              <Text>
                {createFormalName(selectedEnrollment.enrollment.studentId?.parents?.mother)}
              </Text>
            </View>
            <View style={styles.signView}>
              <Text>O (a) Responsável (a)</Text>
              <Text style={styles.signBar}></Text>
              <Text>{selectedEnrollment.enrollment.userId?.username}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            alignSelf: 'flex-start',
            color: '#5f5f5f'
          }}
          fixed
        ></View>
        <Text>Processado por Letrus Care v1.0.0</Text>

        <Text
          style={{
            alignSelf: 'flex-end',
            color: '#5f5f5f'
          }}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  )
}
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 11,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flex: 1
  },
  header: {
    alignItems: 'center',
    gap: 3
  },
  textMin: {
    fontSize: 10,
    fontWeight: 900
  },
  titleCenter: {
    fontSize: 11,
    textTransform: 'uppercase'
  },
  titleDocument: {
    fontSize: 12,
    fontWeight: 900,
    marginVertical: 8
  },
  section: {
    margin: 8,
    padding: 8,
    gap: 2
  },
  horiSection: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  boxContent: {
    padding: 2,
    width: '100%',
    height: 'auto',
    borderWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    fontSize: 10
  },
  label: {
    fontWeight: 'bold'
  },
  lineSpace: {
    lineHeight: 1.15
  },
  signBar: {
    width: '100%',
    borderWidth: 1,
    marginTop: 10
  },
  signView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'capitalize'
  }
})
