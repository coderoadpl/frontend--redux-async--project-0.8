import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export const PageAdminCoursesNew = (props) => {
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
      PageAdminCoursesNew
    </Box>
  )
}

PageAdminCoursesNew.propTypes = {
  sx: PropTypes.object
}

export default PageAdminCoursesNew
