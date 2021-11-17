import React from 'react'
import PropTypes from 'prop-types'

import { CoursePropType } from '../CourseCard'

import { Box, Typography } from '@mui/material'

export const CourseTitle = (props) => {
  const {
    sx,
    course,
    ...otherProps
  } = props

  return (
    <Box
      sx={{
        margin: 2,
        ...sx
      }}
      {...otherProps}
    >
      <Typography
        variant={'h4'}
      >
        {course.title}
      </Typography>
      <Typography
        variant={'body1'}
      >
        {course.description}
      </Typography>
    </Box>
  )
}

CourseTitle.propTypes = {
  sx: PropTypes.object,
  course: CoursePropType
}

export default CourseTitle
