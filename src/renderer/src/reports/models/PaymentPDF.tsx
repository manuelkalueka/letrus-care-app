import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'
import Logo from '../../assets/logo-vector.png'
import TableDocument from '../components/TableDocument'
import { useEffect, useState } from 'react'
import React from 'react'
import { getFromLocalStorage } from '../../utils/localStorage'

export const PaymentPDF: React.FC<{ payment: object }> = ({ payment }) => {
  const [centerName, setCenterName] = useState<string>('')

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const storagedCenter = getFromLocalStorage('center')
      if (storagedCenter) {
        setCenterName(storagedCenter?.name)
      }
    }
    loadStorageData()
  }, [])

  return (
    <Document>
      <Page size={'A5'} style={styles.page} orientation="landscape">
        <View style={styles.header}>
          <Image
            src={Logo}
            style={{
              width: 30,
              height: 30
            }}
          />
          <Text style={styles.titleCenter}>{centerName}</Text>
          <Text>Secretaria Geral</Text>
          <Text style={styles.titleDocument}>
            Recibo de Pagamento de Matrícula - Ano Lectivo [2024]
          </Text>
        </View>
        {/* <View style={styles.section}>
          <View style={[styles.horiSection, styles.textMin]}>
            <Text>Ficha nº[001/[CAF]/[2024]]</Text>

            <Text>Data de Inscrição: {formatDateWithTime(payment?.paymentDate)}</Text>
          </View>
          <View style={styles.boxContent}>
            <View>
              <Text style={styles.lineSpace}>
                <Text style={styles.label}>Nome do Aluno: </Text>
                {payment?.studentId?.name?.fullName}
              </Text>
              <Text style={styles.lineSpace}>
                <Text style={styles.label}>Código: </Text> {payment?.studentId?.studentCode}
              </Text>
              <Text style={styles.lineSpace}>
                <Text style={styles.label}>Telefone: </Text> {payment?.studentId?.phoneNumber}
              </Text>
              <Text style={styles.lineSpace}>
                <Text style={styles.label}>Idade: </Text>
                {getAge() >= 2 ? `${getAge()} anos` : `${getAge()} ano`}
              </Text>
            </View>
            <View>
              <Text style={styles.lineSpace}>
                <Text style={styles.label}>Curso: </Text> {payment?.courseId?.name}
              </Text>
              <Text style={styles.lineSpace}>
                <Text style={styles.label}>Turma: </Text> AL03
              </Text>
              <Text style={styles.lineSpace}>
                <Text style={styles.label}>Nível: </Text> {payment?.grade?.grade}
              </Text>
              <Text style={styles.lineSpace}>
                <Text style={styles.label}>Turno: </Text> 7h-10h
              </Text>
              <Text style={styles.lineSpace}>
                <Text style={styles.label}>Professor: </Text> Fernando
              </Text>
            </View>
          </View>
          <View>
            <Text>Detalahes de Pagamento Descritos na Tabela Abaixo: </Text>
          </View>
          <View style={[styles.horiSection, { marginTop: 15 }]}>
            <View>
              <Text>O (a) Encarregado (a)</Text>
              <Text style={styles.signBar}></Text>
              <Text>{payment?.studentId?.parents.mother}</Text>
            </View>
            <View>
              <Text>O (a) Responsável (a)</Text>
              <Text style={styles.signBar}></Text>
              <Text>Pedro Manuel Kalueka</Text>
            </View>
          </View>
        </View> */}
      </Page>
      <TableDocument />
    </Document>
  )
}
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flex: 1
  },
  header: {
    alignItems: 'center',
    gap: 4
  },
  textMin: {
    fontSize: 10,
    fontWeight: 900
  },
  titleCenter: {
    fontSize: 13,
    textTransform: 'uppercase'
  },
  titleDocument: {
    fontSize: 16,
    fontWeight: 900,
    marginVertical: 10
  },
  section: {
    margin: 10,
    padding: 10,
    gap: 4
  },
  horiSection: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  boxContent: {
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
    marginTop: 20
  }
})
