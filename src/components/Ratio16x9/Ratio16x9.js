import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export const Ratio16x9 = (props) => {
  const {
    sx,
    children,
    ...otherProps
  } = props

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        paddingTop: '56.25%'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          ...sx
        }}
        {...otherProps}
      >
        {children}
      </Box>
    </Box>
  )
}

Ratio16x9.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node
}

export default Ratio16x9
