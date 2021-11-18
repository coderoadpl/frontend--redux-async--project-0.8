import React from 'react'
import PropTypes from 'prop-types'

import { useParams, useNavigate, Outlet } from 'react-router-dom'

import { Box } from '@mui/material'

import GoBackButton from '../../components/GoBackButton'
import LessonsList from '../../components/LessonsList'
import CourseTitle from '../../components/CourseTitle'

import CourseLayout from '../../templates/CourseLayout'

import { getMultiple as getMultipleLessons } from '../../api/lessons'
import { get as getCourse } from '../../api/courses'

import { handleAsyncAction } from '../../handleAsyncAction'

export const PageCourse = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  const { courseId } = useParams()
  const navigate = useNavigate()
  // we want to memoize `navigate` as we only navigating absolute paths
  // and we do not want to trigger use effect on avery `navigate` changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const navigateMemoized = React.useMemo(() => navigate, [])

  const [course, setCourse] = React.useState(null)
  const fetchCourse = React.useCallback(async (courseId) => {
    handleAsyncAction(async () => {
      const course = await getCourse(courseId)
      setCourse(() => course)
    }, 'Loading course...')
  }, [])

  const [lessons, setLessons] = React.useState(null)
  const fetchLessonsByIds = React.useCallback((lessonsIds) => {
    handleAsyncAction(async () => {
      const lessons = await getMultipleLessons(lessonsIds)
      setLessons(() => lessons)
    }, 'Loading lessons...')
  }, [])

  const lessonsIds = course && course.lessons

  React.useEffect(() => {
    if (!course) return
    if (!lessonsIds) {
      navigateMemoized('/')
      return
    }
    fetchLessonsByIds(lessonsIds)
  }, [course, fetchLessonsByIds, lessonsIds, navigateMemoized])

  React.useEffect(() => {
    fetchCourse(courseId)
  }, [courseId, fetchCourse])

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
        course ?
          <CourseTitle
            course={course}
          />
          :
          null
      }
      {...otherProps}
    />
  )
}

PageCourse.propTypes = {
  sx: PropTypes.object
}

export default PageCourse
