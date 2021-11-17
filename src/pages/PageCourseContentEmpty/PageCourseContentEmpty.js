import React from 'react'
import PropTypes from 'prop-types'

import { useMediaQuery, useTheme, Box } from '@mui/material'

export const PageCourseContentEmpty = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        ...sx
      }}
      {...otherProps}
    >
      Chose lesson form {isXs ? 'the bottom' : 'right side'} to play video
    </Box>
  )
}

PageCourseContentEmpty.propTypes = {
  sx: PropTypes.object
}

export default PageCourseContentEmpty
