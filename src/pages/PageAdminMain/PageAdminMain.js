import React from 'react'
import PropTypes from 'prop-types'

import { Outlet } from 'react-router-dom'

import { Box } from '@mui/material'

import AdminMainLayout from '../../templates/AdminMainLayout/AdminMainLayout'

export const PageAdminMain = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  const [drawerOpen, setDrawerOpen] = React.useState(false)

  return (
    <Box
      sx={{
        ...sx
      }}
      {...otherProps}
    >
      <AdminMainLayout
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        slotMainContent={<Outlet />}
        slotAppBarTitle={'Admin panel'}
        slotDrawerContent={'Drawer'}
      />
    </Box>
  )
}

PageAdminMain.propTypes = {
  sx: PropTypes.object
}

export default PageAdminMain
