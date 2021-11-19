import React from 'react'
import PropTypes from 'prop-types'

import { useForm, FormProvider } from 'react-hook-form'

import { useNavigate, useParams, useLocation } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { Box, Typography } from '@mui/material'

import FormLesson from '../../components/FormLesson/FormLesson'

import {
  getSelector, actionCreatorGet,
  actionCreatorUpdate
} from '../../state/lessons'

export const PageAdminLessonsEdit = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  const navigate = useNavigate()
  const { lessonId } = useParams()
  const { pathname } = useLocation()
  const lessonsListPath = pathname.replace(`/${lessonId}`, '')

  const dispatch = useDispatch()

  const getLessonState = useSelector(getSelector)

  const methods = useForm({
    defaultValues: {
      type: 'video'
    }
  })
  const { handleSubmit, reset } = methods

  React.useEffect(() => {
    reset(getLessonState.value)
  }, [getLessonState.value, reset])

  React.useEffect(() => {
    dispatch(actionCreatorGet(lessonId))
  // mount only
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (getLessonState.loading) return
    if (getLessonState.value !== null) return
    navigate(lessonsListPath)
  }, [lessonsListPath, getLessonState, navigate])

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
        Edit lesson
      </Typography>
      <FormProvider
        {...methods}
      >
        <FormLesson
          onSubmit={handleSubmit(async (data) => {
            await dispatch(actionCreatorUpdate(lessonId, data))
            navigate(-1)
          })}
        />
      </FormProvider>
    </Box>
  )
}

PageAdminLessonsEdit.propTypes = {
  sx: PropTypes.object
}

export default PageAdminLessonsEdit
