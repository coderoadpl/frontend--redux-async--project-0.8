import React from 'react'
import PropTypes from 'prop-types'

import CourseLayout from '../../templates/CourseLayout/CourseLayout'

import { useParams, useNavigate, Outlet } from 'react-router-dom'

import { Tooltip, Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Videocam as VideocamIcon } from '@mui/icons-material'

import { CoursePropType } from '../../components/CourseCard'

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
  const { lessons: lessonsIds } = currentCourse

  React.useEffect(() => {
    if (!lessonsIds) return
    fetchLessonsByIds(lessonsIds)
  }, [fetchLessonsByIds, lessonsIds])

  return (
    <CourseLayout
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
                <Tooltip
                  key={lesson.id}
                  title={lesson.title}
                  enterDelay={500}
                >
                  <ListItem
                    disablePadding={true}
                  >
                    <ListItemButton
                      sx={{ width: '100%' }}
                      onClick={() => navigate(lesson.id)}
                    >
                      <ListItemIcon>
                        <VideocamIcon/>
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{
                          noWrap: true
                        }}
                        primary={`${i + 1}. ${lesson.title}`}
                      />
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              )
            })
          }
        </List>
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
  courses: PropTypes.arrayOf(CoursePropType),
  lessons: PropTypes.arrayOf(PropTypes.object),
  fetchLessonsByIds: PropTypes.func
}

export default PageCourse
