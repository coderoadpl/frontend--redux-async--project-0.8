import React from 'react'
import PropTypes from 'prop-types'

import CourseLayout from '../../templates/CourseLayout/CourseLayout'

import { Outlet } from 'react-router-dom'

export const PageCourse = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  return (
    <CourseLayout
      slotContent={
        <Outlet />
      }
      slotSidebar={
        (new Array(111)).fill(<p>SIDEBAR</p>)
      }
      slotTitle={
        (new Array(111)).fill(<p>TITLE</p>)
      }
      {...otherProps}
    />
  )
}

PageCourse.propTypes = {
  sx: PropTypes.object
}

export default PageCourse
