import React from 'react'
import { Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const TableHeader: React.FC = () => {
  return (
    <View style={styles.tableRowStyle} fixed>
      <View style={styles.firstTableColHeaderStyle}>
        <Text style={styles.tableCellHeaderStyle}>Column</Text>
      </View>

      <View style={styles.tableColHeaderStyle}>
        <Text style={styles.tableCellHeaderStyle}>Column</Text>
      </View>

      <View style={styles.tableColHeaderStyle}>
        <Text style={styles.tableCellHeaderStyle}>Column</Text>
      </View>

      <View style={styles.tableColHeaderStyle}>
        <Text style={styles.tableCellHeaderStyle}>Column</Text>
      </View>

      <View style={styles.tableColHeaderStyle}>
        <Text style={styles.tableCellHeaderStyle}>Column</Text>
      </View>
    </View>
  )
}
const TableRow: React.FC = () => {
  return (
    <View style={styles.tableRowStyle}>
      <View style={styles.firstTableColStyle}>
        <Text style={styles.tableCellStyle}>Element</Text>
      </View>

      <View style={styles.tableColStyle}>
        <Text style={styles.tableCellStyle}>Element</Text>
      </View>

      <View style={styles.tableColStyle}>
        <Text style={styles.tableCellStyle}>Element</Text>
      </View>

      <View style={styles.tableColStyle}>
        <Text style={styles.tableCellStyle}>Element</Text>
      </View>

      <View style={styles.tableColStyle}>
        <Text style={styles.tableCellStyle}>Element</Text>
      </View>
    </View>
  )
}

const TableDocument: React.FC = () => {
  return (
      <Page style={styles.pageStyle} size="A4" orientation="portrait">
        <View style={styles.tableStyle}>
          <TableHeader />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
        </View>
      </Page>
  )
}
const styles = StyleSheet.create({
  pageStyle: {
    paddingTop: 16,
    paddingHorizontal: 40,
    paddingBottom: 56
  },
  tableStyle: {
    display: 'flex',
    width: 'auto'
  },
  tableRowStyle: {
    flexDirection: 'row'
  },
  firstTableColHeaderStyle: {
    width: '20%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderBottomColor: '#000',
    borderWidth: 1,
    backgroundColor: '#bdbdbd'
  },
  tableColHeaderStyle: {
    width: '20%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    backgroundColor: '#bdbdbd'
  },
  firstTableColStyle: {
    width: '20%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderTopWidth: 0
  },
  tableColStyle: {
    width: '20%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCellHeaderStyle: {
    textAlign: 'center',
    margin: 4,
    fontSize: 12,
    fontWeight: 'bold'
  },
  tableCellStyle: {
    textAlign: 'center',
    margin: 5,
    fontSize: 10
  }
})

export default TableDocument
