import React from 'react'
import PropTypes from 'prop-types'

import GoBackButton from '../../components/GoBackButton'
import LessonListItem, { LessonPropType } from '../../components/LessonListItem'
import { CoursePropType } from '../../components/CourseCard'
import CourseLayout from '../../templates/CourseLayout'

import { useParams, useNavigate, Outlet } from 'react-router-dom'

import { Box, Typography, List } from '@mui/material'

export const PageCourse = (props) => {
  const {
    sx,
    courses,
    lessons,
    fetchLessonsByIds,
    ...otherProps
  } = props

  const { courseId } = useParams()
  const navigate = useNavigate()

  const currentCourse = courses && courses.find((course) => {
    return course.id === courseId
  })
  const lessonsIds = currentCourse && currentCourse.lessons

  React.useEffect(() => {
    if (!lessonsIds) {
      navigate('/')
      return
    }
    fetchLessonsByIds(lessonsIds)
  }, [fetchLessonsByIds, lessonsIds, navigate])

  return (
    <CourseLayout
      slotGoBackButton={
        <GoBackButton
          onClick={() => navigate('/')}
        />
      }
      slotContent={
        <Box
          sx={{
            color: 'white',
            backgroundColor: 'black',
            width: '100%',
            height: '100%'
          }}
        >
          <Outlet />
        </Box>
      }
      slotSidebar={
        <List>
          {
            lessons && lessons.map((lesson, i) => {
              return (
                <LessonListItem
                  key={lesson.id}
                  index={i}
                  lesson={lesson}
                  onClick={() => navigate(lesson.id)}
                />
              )
            })
          }
        </List>
      }
      slotTitle={
        currentCourse ?
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
          :
          null
      }
      {...otherProps}
    />
  )
}

PageCourse.propTypes = {
  sx: PropTypes.object,
  courses: PropTypes.arrayOf(CoursePropType),
  lessons: PropTypes.arrayOf(LessonPropType),
  fetchLessonsByIds: PropTypes.func
}

export default PageCourse
