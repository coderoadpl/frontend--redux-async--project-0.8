import React from 'react'
import PropTypes from 'prop-types'

import { Outlet } from 'react-router-dom'

import Ratio16x9 from '../../components/Ratio16x9'

import { Box } from '@mui/material'

export const PageCourse = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  return (
    <Box
      sx={{
        height: '100vh',
        overflow: 'hidden',
        '@media (max-width: 599.95px)': {
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
          '@media (max-width: 599.95px)': {
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
            '@media (max-width: 599.95px)': {
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
              <Outlet />
            </Box>
          </Ratio16x9>
          <Box
            sx={{
              flexGrow: 1,
              overflowX: 'hidden',
              overflowY: 'auto'
            }}
          >
            TITLE
            {
              (new Array(111)).fill(<p>TITLE</p>)
            }
          </Box>
        </Box>
        <Box
          sx={{
            width: 320,
            height: '100%',
            '@media (max-width: 599.95px)': {
              width: '100%',
              height: 'auto',
              flexGrow: 1
            },
            backgroundColor: 'gray',
            overflowX: 'hidden',
            overflowY: 'auto'
          }}
        >
          SIDEBAR
          {
            (new Array(111)).fill(<p>SIDEBAR</p>)
          }
        </Box>
      </Box>
    </Box>
  )
}

PageCourse.propTypes = {
  sx: PropTypes.object
}

export default PageCourse
