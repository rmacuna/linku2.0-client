import React from 'react'
import PropTypes from 'prop-types'
// import ReactPDF from '@react-pdf/renderer'
// import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer'
import { tableRows } from '../../../components/Table/constants'
import styled from 'styled-components'
import SchedulesContext from '../../../context/schedules-context'
import {
  Document,
  Page,
  GlobalStyle,
  SubjectsWrapper,
  Title,
  ViewSubject,
  ViewSubjectHeader,
  ViewSubjectBody,
} from './Conversor.styles'
import Table from '../../../components/Table/Table'
import { Row, Col } from 'react-flexbox-grid'

// Font.register({
//   family: 'Manrope',
//   fonts: [
//     { src: '../../../../public/fonts/manrope-regular.woff2', fontStyle: 'normal', fontWeight: 400 },
//     {
//       src: '../../../../public/fonts/manrope-semibold.woff2',
//       fontStyle: 'normal',
//       fontWeight: 600,
//     },
//   ],
// })

const renderTableData = currentSchedule => {
  return tableRows.data.map((row, index) => {
    const { id, hour } = row
    return (
      <tr key={id}>
        <td>{hour}</td>
        {new Array(6).fill(null).map((_, pos) => (
          <td key={pos} className="ui-widget">
            {currentSchedule.matrix[pos][index] === null ||
            currentSchedule.matrix[pos][index] === 'blocked'
              ? ''
              : currentSchedule.matrix[pos][index]}
          </td>
        ))}
      </tr>
    )
  })
}

const pxToMm = px => {
  return Math.floor(px / document.getElementById('myMm').offsetHeight)
}

const mmToPx = mm => {
  return document.getElementById('myMm').offsetHeight * mm
}

const range = (start, end) => {
  return Array(end - start)
    .join(0)
    .split(0)
    .map(function(val, id) {
      return id + start
    })
}

const Conversor = (currentSchedule, subjects) => {
  return (
    <>
      <GlobalStyle />
      <Document>
        <Page>
          <Row center="xs">
            <Col xs={12} sm={12} md={12} lg={12}>
              <Title>Tu horario</Title>
            </Col>
          </Row>
          <Table />
          <SubjectsWrapper>
            <h1>Materias a matricular</h1>
            <Row>
              <Col xs={2} sm={2} md={2} lg={2}>
                <ViewSubject>
                  <ViewSubjectHeader>subject</ViewSubjectHeader>
                  <ViewSubjectBody>
                    <p>
                      Nrc: <strong>3021</strong>
                    </p>
                    Julio Velverde lorem
                  </ViewSubjectBody>
                </ViewSubject>
              </Col>
              <Col xs={2} sm={2} md={2} lg={2}>
                <ViewSubject>
                  <ViewSubjectHeader>subject</ViewSubjectHeader>
                  <ViewSubjectBody>
                    <p>
                      Nrc: <strong>3021</strong>
                    </p>
                    Julio Velverde lorem
                  </ViewSubjectBody>
                </ViewSubject>
              </Col>
              <Col xs={2} sm={2} md={2} lg={2}>
                <ViewSubject>
                  <ViewSubjectHeader>
                    <h1>subject</h1>
                  </ViewSubjectHeader>
                  <ViewSubjectBody>
                    <p>
                      Nrc: <strong>3021</strong>
                    </p>
                    Julio Velverde lorem
                  </ViewSubjectBody>
                </ViewSubject>
              </Col>
            </Row>
          </SubjectsWrapper>
        </Page>
      </Document>
    </>
  )
}

Conversor.propTypes = {
  currentSchedule: PropTypes.object.isRequired,
}

export default Conversor
