import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export const LessonsSelect = (props) => {
  const {
    sx,
    onChange,
    value,
    ...otherProps
  } = props

  return (
    <Box
      sx={{
        ...sx
      }}
      {...otherProps}
    >
      {JSON.stringify(value)}
    </Box>
  )
}

LessonsSelect.propTypes = {
  sx: PropTypes.object,
  onChange: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })).isRequired
}

export default LessonsSelect
