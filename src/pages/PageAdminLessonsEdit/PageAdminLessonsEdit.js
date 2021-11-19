import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export const PageAdminLessonsEdit = (props) => {
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
      PageAdminLessonsEdit
    </Box>
  )
}

PageAdminLessonsEdit.propTypes = {
  sx: PropTypes.object
}

export default PageAdminLessonsEdit
