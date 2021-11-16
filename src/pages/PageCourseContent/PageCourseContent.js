import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export const PageCourseContent = (props) => {
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
      PageCourseContent
    </Box>
  )
}

PageCourseContent.propTypes = {
  sx: PropTypes.object
}

export default PageCourseContent
