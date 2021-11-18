import { makeAuthorizedRequest } from '../../auth'

import { makeApiUrl } from '../../api'

import { COURSES_KEY } from './const'

export const get = async (courseId) => {
  const lesson = await makeAuthorizedRequest(makeApiUrl(COURSES_KEY + '/' + courseId))
  return {
    id: courseId,
    ...lesson
  }
}

export default get
