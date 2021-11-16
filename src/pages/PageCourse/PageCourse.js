import React from 'react'
import PropTypes from 'prop-types'

import { Outlet } from 'react-router-dom'

import { Box } from '@mui/material'

export const PageCourse = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  return (
    <Box
      sx={{
        ...sx
      }}
      {...otherProps}
    >
      PageCourse
      <Outlet />
    </Box>
  )
}

PageCourse.propTypes = {
  sx: PropTypes.object
}

export default PageCourse
