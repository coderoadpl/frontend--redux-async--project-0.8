import React from 'react'
import PropTypes from 'prop-types'

import { useParams, useNavigate, useLocation } from 'react-router-dom'

import ReactPlayer from 'react-player'

import { Box } from '@mui/material'

export const PageCourseContent = (props) => {
  const {
    sx,
    lessons,
    ...otherProps
  } = props

  const { lessonId } = useParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const courseMainPath = pathname.replace(`/${lessonId}`, '')

  const currentLesson = lessons && lessons.find((lesson) => {
    return lesson.id === lessonId
  })
  const videoSrc = currentLesson && currentLesson.content

  React.useEffect(() => {
    if (currentLesson) return
    navigate(courseMainPath)
  }, [courseMainPath, currentLesson, navigate])

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        ...sx
      }}
      {...otherProps}
    >
      <ReactPlayer
        width={'100%'}
        height={'100%'}
        url={videoSrc}
      />
    </Box>
  )
}

PageCourseContent.propTypes = {
  sx: PropTypes.object,
  lessons: PropTypes.arrayOf(PropTypes.object)
}

export default PageCourseContent
