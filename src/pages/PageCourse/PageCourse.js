import React from 'react'
import PropTypes from 'prop-types'

import CourseLayout from '../../templates/CourseLayout/CourseLayout'
import GoBackButton from '../../components/GoBackButton/GoBackButton'

import { useParams, useNavigate, Outlet } from 'react-router-dom'

import { useMediaQuery, useTheme, Tooltip, Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
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

  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))

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
      slotContent={
        <>
          {
            isXs ?
              <GoBackButton
                onClick={() => navigate('/')}
              />
              :
              null
          }
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
        </>
      }
      slotSidebar={
        <>
          {
            isXs ?
              null
              :
              <GoBackButton
                onClick={() => navigate('/')}
              />
          }
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
        </>
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
  lessons: PropTypes.arrayOf(PropTypes.object),
  fetchLessonsByIds: PropTypes.func
}

export default PageCourse
