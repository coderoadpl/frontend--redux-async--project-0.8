import React from 'react'
import PropTypes from 'prop-types'

import { Outlet, useNavigate } from 'react-router-dom'

import { Box, List, ListItem, ListItemButton, ListItemText, Button } from '@mui/material'

import AdminMainLayout from '../../templates/AdminMainLayout/AdminMainLayout'

export const PageAdminMain = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const navigate = useNavigate()

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
        slotAppBarRight={<Button onClick={() => navigate('/')}>Go back</Button>}
        slotMainContent={<Outlet />}
        slotAppBarTitle={'Admin panel'}
        slotDrawerContent={
          <List>
            <ListItem
              disablePadding={true}
            >
              <ListItemButton
                onClick={() => {
                  navigate('lessons')
                  setDrawerOpen(false)
                }}
              >
                <ListItemText primary={'Lessons'} />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding={true}
            >
              <ListItemButton
                onClick={() => {
                  navigate('courses')
                  setDrawerOpen(false)
                }}
              >
                <ListItemText primary={'Courses'} />
              </ListItemButton>
            </ListItem>
          </List>
        }
      />
    </Box>
  )
}

PageAdminMain.propTypes = {
  sx: PropTypes.object
}

export default PageAdminMain
