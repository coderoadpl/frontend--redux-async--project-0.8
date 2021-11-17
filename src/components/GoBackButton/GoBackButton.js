import React from 'react'
import PropTypes from 'prop-types'

import { Typography, List, ListItemButton } from '@mui/material'
import { ChevronLeftSharp as GoBackIcon } from '@mui/icons-material'

export const GoBackButton = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  return (
    <List>
      <ListItemButton
        {...otherProps}
      >
        <Typography
          variant={'button'}
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <GoBackIcon /> GO BACK
        </Typography>
      </ListItemButton>
    </List>
  )
}

GoBackButton.propTypes = {
  sx: PropTypes.object
}

export default GoBackButton
