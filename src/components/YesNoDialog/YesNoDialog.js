import React from 'react'
import PropTypes from 'prop-types'

import { Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'

export const YesNoDialog = (props) => {
  const {
    sx,
    open,
    onClose,
    onAccept,
    slotTitle,
    slotText,
    noText,
    yesText,
    ...otherProps
  } = props

  return (
    <Box
      sx={{
        ...sx
      }}
      {...otherProps}
    >
      <Dialog
        open={open}
        onClose={onClose}
      >
        <DialogTitle>
          {slotTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {slotText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{noText || 'No'}</Button>
          <Button onClick={onAccept}>{yesText || 'Yes'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

YesNoDialog.propTypes = {
  sx: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  slotTitle: PropTypes.node,
  slotText: PropTypes.node,
  noText: PropTypes.string,
  yesText: PropTypes.string
}

export default YesNoDialog
