import React from 'react'
import PropTypes from 'prop-types'

import LessonListItem, { LessonPropType } from '../LessonListItem'

import { List } from '@mui/material'

export const LessonsList = (props) => {
  const {
    sx,
    lessons,
    onClickLesson,
    ...otherProps
  } = props

  return (
    <List
      sx={{
        ...sx
      }}
      {...otherProps}
    >
      {
            lessons && lessons.map((lesson, i) => {
              return (
                <LessonListItem
                  key={lesson.id}
                  index={i}
                  lesson={lesson}
                  onClick={() => onClickLesson(lesson.id)}
                />
              )
            })
          }
    </List>
  )
}

LessonsList.propTypes = {
  sx: PropTypes.object,
  onClickLesson: PropTypes.func,
  lessons: PropTypes.arrayOf(LessonPropType)
}

export default LessonsList
