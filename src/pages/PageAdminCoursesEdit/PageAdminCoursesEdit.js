import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export const PageAdminCoursesEdit = (props) => {
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
      PageAdminCoursesEdit
    </Box>
  )
}

PageAdminCoursesEdit.propTypes = {
  sx: PropTypes.object
}

export default PageAdminCoursesEdit
