import React, { memo, useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import PropTypes from "prop-types"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

function TableRowDeaggable({ row, index }) {
  return (
    <Draggable draggableId={row.name} index={index}>
      {(provided) => (
        <TableRow
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TableCell width="100px" component="th" scope="row">
            {index + 1}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.email}
          </TableCell>
          <TableCell align="right" component="th" scope="row">
            {row.potatos}
          </TableCell>
        </TableRow>
      )}
    </Draggable>
  )
}

TableRowDeaggable.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    potatos: PropTypes.number,
  }),
  index: PropTypes.number,
}

const TableRowsDeaggable = memo(({ rows }) => {
  return rows.map((row, index) => (
    <TableRowDeaggable row={row} index={index} key={row.name} />
  ))
})

TableRowsDeaggable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      potatos: PropTypes.number,
    })
  ),
}

const AnimatedDnD = ({ userList, onChangeStatus, sortStarted }) => {
  const [rows, setRows] = useState([])

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    if (!sortStarted) return

    const users = reorder(rows, result.source.index, result.destination.index)
    let i = 0
    for (i; i < users.length - 1; i += 1) {
      if (users[i].potatos < users[i + 1].potatos) {
        onChangeStatus(false)
        break
      }
    }
    if (i === users.length - 1) {
      onChangeStatus(true)
    }

    setRows(users)
  }

  useEffect(() => {
    setRows(userList)
  }, [userList])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>SL</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell width="75px" align="right">
              Potatos
            </TableCell>
          </TableRow>
        </TableHead>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                <TableRowsDeaggable rows={rows} />
                {provided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </DragDropContext>
      </Table>
    </TableContainer>
  )
}

AnimatedDnD.propTypes = {
  userList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      potatos: PropTypes.number,
    })
  ),
  onChangeStatus: PropTypes.func,
  sortStarted: PropTypes.bool,
}

export default AnimatedDnD
