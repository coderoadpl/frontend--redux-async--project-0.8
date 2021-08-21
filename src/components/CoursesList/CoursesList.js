import React from 'react'
import PropTypes from 'prop-types'

import CourseCard, { CoursePropType } from '../CourseCard'

import classes from './styles.module.css'

export const CoursesList = (props) => {
  const {
    className,
    courses,
    ...otherProps
  } = props

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      {
        courses && courses.map((course) => {
          return (
            <div
              key={course.id}
              className={classes.courseCardWrapper}
            >
              <CourseCard
                course={course}
              />
            </div>
          )
        })
      }
    </div>
  )
}

CoursesList.propTypes = {
  className: PropTypes.string,
  courses: PropTypes.arrayOf(CoursePropType)
}

export default CoursesList
