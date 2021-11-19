import React from 'react'
import PropTypes from 'prop-types'

import { useForm, FormProvider } from 'react-hook-form'

import { useNavigate, useParams, useLocation } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { Box, Typography } from '@mui/material'

import FormCourse from '../../components/FormCourse/FormCourse'

import {
  getSelector as getSelectorCourse,
  actionCreatorGet as actionCreatorGetCourse,
  actionCreatorUpdate as actionCreatorUpdateCourse
} from '../../state/courses'

import {
  getAllSelector as getAllSelectorLessons,
  actionCreatorGetAll as actionCreatorGetAllLessons
} from '../../state/lessons'

export const PageAdminCoursesEdit = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  const navigate = useNavigate()
  const { courseId } = useParams()
  const { pathname } = useLocation()
  const coursesListPath = pathname.replace(`/${courseId}`, '')

  const dispatch = useDispatch()

  const getCourseState = useSelector(getSelectorCourse)
  const getAllLessonsState = useSelector(getAllSelectorLessons)

  const methods = useForm({
    defaultValues: {
      lessons: []
    }
  })
  const { handleSubmit, reset } = methods

  React.useEffect(() => {
    reset(getCourseState.value)
  }, [getCourseState.value, reset])

  React.useEffect(() => {
    dispatch(actionCreatorGetCourse(courseId))
    dispatch(actionCreatorGetAllLessons())
  // mount only
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (getCourseState.loading) return
    if (getCourseState.value !== null) return
    navigate(coursesListPath)
  }, [coursesListPath, getCourseState, navigate])

  return (
    <Box
      sx={{
        paddingTop: 4,
        paddingBottom: 2,
        ...sx
      }}
      {...otherProps}
    >
      <Typography
        sx={{ width: '100%', marginBottom: 2, textAlign: 'center' }}
        variant={'h4'}
      >
        Edit course
      </Typography>
      <FormProvider
        {...methods}
      >
        <FormCourse
          lessons={getAllLessonsState.value || []}
          onSubmit={handleSubmit(async (data) => {
            await dispatch(actionCreatorUpdateCourse(courseId, data))
            navigate(-1)
          })}
        />
      </FormProvider>
    </Box>
  )
}

PageAdminCoursesEdit.propTypes = {
  sx: PropTypes.object
}

export default PageAdminCoursesEdit
