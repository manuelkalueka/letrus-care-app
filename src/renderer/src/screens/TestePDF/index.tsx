import React from 'react'
import { EnrollmentPDF } from '@renderer/reports/models/EnrollmentPDF'
import { BlobProvider } from '@react-pdf/renderer'

export const TestePDF: React.FC = () => (
  <>
    <BlobProvider document={<EnrollmentPDF />}>
      {({ url }) =>
        url ? (
          <iframe src={url} style={{ width: '100%', height: '100vh' }} />
        ) : (
          <p>Gerando PDF...</p>
        )
      }
    </BlobProvider>
  </>
)
