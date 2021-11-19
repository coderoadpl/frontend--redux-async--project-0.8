import React from 'react'
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux'

import { Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip } from '@mui/material'
import { Videocam as VideocamIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'

import { getAllSelector, actionCreatorGetAll } from '../../state/lessons'

export const PageAdminLessons = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  const dispatch = useDispatch()
  const getAllLessonsState = useSelector(getAllSelector)

  React.useEffect(() => {
    dispatch(actionCreatorGetAll())
  // mount only
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      sx={{
        paddingTop: 2,
        paddingBottom: 2,
        ...sx
      }}
      {...otherProps}
    >
      <TableContainer component={Paper}>
        <Table
          sx={{ width: '100%' }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Title</TableCell>
              <TableCell align={'right'}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getAllLessonsState.value && getAllLessonsState.value.map((lesson) => (
              <TableRow
                key={lesson.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  {
                    lesson.type === 'video' ?
                      <VideocamIcon color={'primary'} />
                      :
                      lesson.type
                  }
                </TableCell>
                <TableCell>{lesson.title}</TableCell>
                <TableCell align={'right'}>
                  <Tooltip title={'Edit'}>
                    <IconButton color={'primary'}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={'Delete'}>
                    <IconButton color={'primary'}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

PageAdminLessons.propTypes = {
  sx: PropTypes.object
}

export default PageAdminLessons
