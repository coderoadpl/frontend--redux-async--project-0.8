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
          (!courses || courses.length === 0) ?
            'No courses found'
            :
            courses.map((course, i) => {
              const isThirdLeft = i === 0 || (i) % 3 === 0
              const isThirdRight = (i + 1) % 3 === 0

              return (
                <div
                  key={course.id}
                  className={
                [
                  classes.courseCardWrapper,
                  isThirdLeft ? classes.isThirdLeft : null,
                  isThirdRight ? classes.isThirdRight : null
                ]
                  .filter((className) => className)
                  .join(' ')
              }
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
