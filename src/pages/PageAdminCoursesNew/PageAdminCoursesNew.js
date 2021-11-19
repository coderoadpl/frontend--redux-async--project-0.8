import React from 'react'
import PropTypes from 'prop-types'

import { useForm, FormProvider } from 'react-hook-form'

import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { Box, Typography } from '@mui/material'

import FormCourse from '../../components/FormCourse/FormCourse'

import { actionCreatorCreate as actionCreatorCreateCourse } from '../../state/courses'
import {
  getAllSelector as getAllSelectorLessons,
  actionCreatorGetAll as actionCreatorGetAllLessons
} from '../../state/lessons'

export const PageAdminCoursesNew = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const getAllLessonsState = useSelector(getAllSelectorLessons)

  const methods = useForm({
    defaultValues: {
      lessons: []
    }
  })
  const { reset, handleSubmit } = methods

  React.useEffect(() => {
    if (!getAllLessonsState.value) return
    reset({ lessons: getAllLessonsState.value })
  }, [getAllLessonsState.value, reset])

  React.useEffect(() => {
    dispatch(actionCreatorGetAllLessons())
  // mount only
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        Add new course
      </Typography>
      <FormProvider
        {...methods}
      >
        <FormCourse
          onSubmit={handleSubmit(async (data) => {
            await dispatch(actionCreatorCreateCourse(data))
            navigate(-1)
          })}
        />
      </FormProvider>
    </Box>
  )
}

PageAdminCoursesNew.propTypes = {
  sx: PropTypes.object
}

export default PageAdminCoursesNew
