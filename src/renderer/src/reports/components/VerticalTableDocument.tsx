import React from 'react'
import { Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const TableRow = (
  headerName: string,
  value: string,
  headerCellWidth: number,
  valueCellWidth: number
) => {
  const tableRowStyle = StyleSheet.create({
    tableColHeaderStyle: {
      width: `${headerCellWidth}%`,
      borderStyle: 'solid',
      borderColor: '#000',
      borderBottomColor: '#000',
      borderWidth: 1,
      backgroundColor: '#bdbdbd'
    },
    tableColStyle: {
      width: `${valueCellWidth}%`,
      borderStyle: 'solid',
      borderColor: '#000',
      borderWidth: 1
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
    },
    tableRowStyle: {
      flexDirection: 'row'
    },
    pageStyle: {
      paddingTop: 16,
      paddingHorizontal: 40,
      paddingBottom: 56
    },
    tableStyle: {
      display: 'flex',
      width: 'auto'
    }
  })

  return (
    <View style={tableRowStyle.tableRowStyle} fixed>
      <View style={tableRowStyle.tableColHeaderStyle}>
        <Text style={tableRowStyle.tableCellHeaderStyle}>{headerName}</Text>
      </View>

      <View style={tableRowStyle.tableColStyle}>
        <Text style={tableRowStyle.tableCellStyle}>{value}</Text>
      </View>
    </View>
  )
}

const VerticalTableDocument: React.FC = () => {
  return (
    <Page style={styles.pageStyle} size="A4" orientation="portrait">
      <View style={styles.tableStyle}>
        {TableRow('Height', '1,78m', 20, 20)}
        {TableRow('Shoulder', '21cm', 20, 20)}
        {TableRow('Arms', '36cm', 20, 20)}
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
  }
})

export default VerticalTableDocument
