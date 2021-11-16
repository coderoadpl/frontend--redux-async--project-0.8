import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export const PageCourseContentEmpty = (props) => {
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
      PageCourseContentEmpty
    </Box>
  )
}

PageCourseContentEmpty.propTypes = {
  sx: PropTypes.object
}

export default PageCourseContentEmpty
