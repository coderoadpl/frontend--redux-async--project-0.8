import React from 'react'
import PropTypes from 'prop-types'

import CourseLayout from '../../templates/CourseLayout/CourseLayout'

import { useParams, Outlet } from 'react-router-dom'

import { Box, Typography } from '@mui/material'

import { CoursePropType } from '../../components/CourseCard'

export const PageCourse = (props) => {
  const {
    sx,
    courses,
    ...otherProps
  } = props

  const { courseId } = useParams()

  const currentCourse = courses && courses.find((course) => {
    return course.id === courseId
  })
  const { lessons } = currentCourse

  console.log(lessons)

  return (
    <CourseLayout
      slotContent={
        <Outlet />
      }
      slotSidebar={
        (new Array(111)).fill(<p>SIDEBAR</p>)
      }
      slotTitle={
        <Box
          sx={{
            margin: 2
          }}
        >
          <Typography
            variant={'h4'}
          >
            {currentCourse.title}
          </Typography>
          <Typography
            variant={'body1'}
          >
            {currentCourse.description}
          </Typography>
        </Box>
      }
      {...otherProps}
    />
  )
}

PageCourse.propTypes = {
  sx: PropTypes.object,
  courses: PropTypes.arrayOf(CoursePropType)
}

export default PageCourse
