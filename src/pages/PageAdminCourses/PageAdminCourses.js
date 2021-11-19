import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export const PageAdminCourses = (props) => {
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
      PageAdminCourses
    </Box>
  )
}

PageAdminCourses.propTypes = {
  sx: PropTypes.object
}

export default PageAdminCourses
