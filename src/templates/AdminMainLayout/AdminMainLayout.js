import React from 'react'
import PropTypes from 'prop-types'

import { Box, Container, Drawer, AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'

export const AdminMainLayout = (props) => {
  const {
    sx,
    drawerOpen,
    setDrawerOpen,
    slotMainContent,
    slotAppBarTitle,
    slotDrawerContent,
    slotAppBarRight,
    ...otherProps
  } = props

  return (
    <Box
      sx={{
        ...sx
      }}
      {...otherProps}
    >
      <AppBar
        position={'sticky'}
        sx={{ backgroundColor: 'white' }}
      >
        <Toolbar>
          <IconButton
            size={'large'}
            edge={'start'}
            sx={{ marginRight: 2 }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant={'h6'}
            component={'div'}
            sx={{ flexGrow: 1 }}
            color={'primary'}
          >
            {slotAppBarTitle}
          </Typography>
          {slotAppBarRight}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor={'left'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{ width: 250 }}
        >
          {slotDrawerContent}
        </Box>
      </Drawer>
      <Container
        maxWidth={'md'}
      >
        {slotMainContent}
      </Container>
    </Box>
  )
}

AdminMainLayout.propTypes = {
  sx: PropTypes.object,
  drawerOpen: PropTypes.bool.isRequired,
  setDrawerOpen: PropTypes.func.isRequired,
  slotMainContent: PropTypes.node,
  slotAppBarTitle: PropTypes.node,
  slotDrawerContent: PropTypes.node,
  slotAppBarRight: PropTypes.node
}

export default AdminMainLayout
