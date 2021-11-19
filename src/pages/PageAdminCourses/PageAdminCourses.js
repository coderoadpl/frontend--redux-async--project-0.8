import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { Box, Button, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip } from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material'

import YesNoDialog from '../../components/YesNoDialog/YesNoDialog'

import { getAllSelector, actionCreatorGetAll, actionCreatorRemove } from '../../state/courses'

export const PageAdminCourses = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  const [courseIdToDelete, setCourseIdToDelete] = React.useState(null)

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const getAllCoursesState = useSelector(getAllSelector)

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
      <Button
        variant={'contained'}
        sx={{ width: '100%', marginBottom: 2 }}
        onClick={() => navigate('new')}
        startIcon={<AddIcon />}
      >
        ADD NEW COURSE
      </Button>
      <TableContainer component={Paper}>
        <Table
          sx={{ width: '100%' }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Title</TableCell>
              <TableCell align={'right'}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getAllCoursesState.value && getAllCoursesState.value.map((course) => (
              <TableRow
                key={course.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  {course.category}
                </TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell align={'right'}>
                  <Tooltip title={'Edit'}>
                    <IconButton
                      color={'primary'}
                      onClick={() => navigate(course.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={'Delete'}>
                    <IconButton
                      color={'primary'}
                      onClick={() => setCourseIdToDelete(course.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <YesNoDialog
        open={courseIdToDelete !== null}
        onAccept={async () => {
          await dispatch(actionCreatorRemove(courseIdToDelete))
          setCourseIdToDelete(null)
          await dispatch(actionCreatorGetAll())
        }}
        onClose={() => setCourseIdToDelete(null)}
        slotTitle={'Confirm deletion'}
        slotText={'After successful deletion item cant be recovered!'}
        yesText={'Confirm'}
        noText={'Cancel'}
      />
    </Box>
  )
}

PageAdminCourses.propTypes = {
  sx: PropTypes.object
}

export default PageAdminCourses
