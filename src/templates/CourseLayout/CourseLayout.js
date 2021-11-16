import React from 'react'
import PropTypes from 'prop-types'

import Ratio16x9 from '../../components/Ratio16x9'

import { useTheme, Box } from '@mui/material'

export const CourseLayout = (props) => {
  const {
    sx,
    slotContent,
    slotSidebar,
    slotTitle,
    ...otherProps
  } = props

  const theme = useTheme()

  return (
    <Box
      sx={{
        height: '100vh',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
          overflow: 'auto'
        },
        ...sx
      }}
      {...otherProps}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          [theme.breakpoints.down('sm')]: {
            height: 'auto',
            minHeight: '100vh',
            flexDirection: 'column'
          }
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.down('sm')]: {
              flexGrow: 0
            }
          }}
        >
          <Ratio16x9>
            <Box
              sx={{
                backgroundColor: 'black',
                width: '100%',
                height: '100%'
              }}
            >
              {slotContent}
            </Box>
          </Ratio16x9>
          <Box
            sx={{
              flexGrow: 1,
              overflowX: 'hidden',
              overflowY: 'auto'
            }}
          >
            {slotTitle}
          </Box>
        </Box>
        <Box
          sx={{
            width: 320,
            height: '100%',
            overflowX: 'hidden',
            overflowY: 'auto',
            [theme.breakpoints.down('sm')]: {
              width: '100%',
              height: 'auto',
              flexGrow: 1
            }
          }}
        >
          <Box
            sx={{
              backgroundColor: 'gray',
              width: '100%'
            }}
          >
            {slotSidebar}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

CourseLayout.propTypes = {
  sx: PropTypes.object,
  slotContent: PropTypes.node,
  slotSidebar: PropTypes.node,
  slotTitle: PropTypes.node
}

export default CourseLayout
