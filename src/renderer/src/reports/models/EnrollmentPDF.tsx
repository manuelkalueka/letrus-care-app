import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import { formatDateWithTime } from '@renderer/utils/format'
export const EnrollmentPDF: React.FC<{ enrollment: object }> = ({ enrollment }) => {
  return (
    <Document>
      <Page size={'A5'} style={styles.page} orientation="landscape">
        <View style={styles.header}>
          <Text style={styles.titleCenter}>[CENTRO de ALFABETIZAÇÃO FERNANDO]</Text>
          <Text>Secretaria Geral</Text>
          <Text style={styles.titleDocument}>Confirmação de Matrícula - Ano Lectivo [2024]</Text>
        </View>
        <View style={styles.section}>
          <View style={[styles.horiSection, styles.textMin]}>
            <Text>Ficha de Confirmação de Matrícula nº[001/[CAF]/[2024]]</Text>

            <Text>Data de Inscrição: {formatDateWithTime(enrollment?.enrollmentDate)}</Text>
          </View>
          <View style={styles.boxContent}>
            <View>
              <Text>
                <Text style={styles.label}>Nome do Estudante:</Text>{' '}
                {enrollment?.studentId?.name?.fullName}
              </Text>
              <Text>
                <Text style={styles.label}>Código:</Text> {enrollment?.studentId?.studentCode}
              </Text>
              <Text>
                <Text style={styles.label}>Telefone:</Text> {enrollment?.studentId?.phoneNumber}
              </Text>
              <Text>
                <Text style={styles.label}>Turma:</Text> AL03
              </Text>
            </View>
            <View>
              <Text>
                <Text style={styles.label}>Curso:</Text> {enrollment?.courseId?.name}
              </Text>
              <Text>
                <Text style={styles.label}>Nível:</Text> {enrollment?.grade?.grade}
              </Text>
              <Text>
                <Text style={styles.label}>Turno:</Text> 7h-10h
              </Text>
              <Text>
                <Text style={styles.label}>Professor:</Text> Fernando
              </Text>
            </View>
          </View>
          <View style={[styles.horiSection, { marginTop: 15 }]}>
            <View>
              <Text>O (a) Encarregado (a)</Text>
              <Text style={styles.signBar}></Text>
              <Text>{enrollment?.studentId?.parents.mother}</Text>
            </View>
            <View>
              <Text>O (a) Responsável (a)</Text>
              <Text style={styles.signBar}></Text>
              <Text>Pedro Manuel Kalueka</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontSize: 12,
    margin: 10,
    padding: 10,
    flex: 1
  },
  header: {
    alignItems: 'center',
    gap: 10
  },
  textMin: {
    fontSize: 10,
    fontWeight: 900
  },
  titleCenter: {
    fontSize: 14,
    textTransform: 'uppercase'
  },
  titleDocument: {
    fontSize: 18,
    fontWeight: 900,
    marginTop: 10,
    marginBottom: 20
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
    flexDirection: 'row'
  },
  label: {
    fontWeight: 'bold'
  },
  signBar: {
    width: '100%',
    borderWidth: 1,
    marginTop: 20
  }
})
