import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export const PageAdminLessons = (props) => {
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
      PageAdminLessons
    </Box>
  )
}

PageAdminLessons.propTypes = {
  sx: PropTypes.object
}

export default PageAdminLessons
