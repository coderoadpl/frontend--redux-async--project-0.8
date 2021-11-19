import React from 'react'
import PropTypes from 'prop-types'

import { useForm, FormProvider } from 'react-hook-form'

import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { Box, Typography } from '@mui/material'

import FormCourse from '../../components/FormCourse/FormCourse'

import { actionCreatorCreate } from '../../state/courses'

export const PageAdminCoursesNew = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const methods = useForm()
  const { handleSubmit } = methods

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
            await dispatch(actionCreatorCreate(data))
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
