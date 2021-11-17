import React from 'react'
import PropTypes from 'prop-types'

import GoBackButton from '../../components/GoBackButton'
import LessonsList from '../../components/LessonsList'
import CourseTitle from '../../components/CourseTitle'
import { LessonPropType } from '../../components/LessonListItem'
import { CoursePropType } from '../../components/CourseCard'

import CourseLayout from '../../templates/CourseLayout'

import { useParams, useNavigate, Outlet } from 'react-router-dom'

import { Box } from '@mui/material'

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
  // we want to memoize `navigate` as we only navigating absolute paths
  // and we do not want to trigger use effect on avery `navigate` changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const navigateMemoized = React.useMemo(() => navigate, [])

  const currentCourse = courses && courses.find((course) => {
    return course.id === courseId
  })
  const lessonsIds = currentCourse && currentCourse.lessons

  React.useEffect(() => {
    if (!lessonsIds) {
      navigateMemoized('/')
      return
    }
    console.log('fetchLessonsByIds')
    fetchLessonsByIds(lessonsIds)
  }, [fetchLessonsByIds, lessonsIds, navigateMemoized])

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
        <LessonsList
          lessons={lessons}
          onClickLesson={(lessonId) => navigate(lessonId)}
        />
      }
      slotTitle={
        currentCourse ?
          <CourseTitle
            course={currentCourse}
          />
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
