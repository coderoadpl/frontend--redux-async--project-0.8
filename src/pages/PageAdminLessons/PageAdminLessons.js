import React from 'react'
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux'

import { Box } from '@mui/material'

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
        ...sx
      }}
      {...otherProps}
    >
      {JSON.stringify(getAllLessonsState)}
    </Box>
  )
}

PageAdminLessons.propTypes = {
  sx: PropTypes.object
}

export default PageAdminLessons
