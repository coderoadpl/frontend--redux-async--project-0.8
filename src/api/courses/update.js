import { makeAuthorizedRequest } from '../../auth'

import { makeApiUrl } from '../../api'

import { COURSES_KEY } from './const'

export const update = async (courseId, data) => {
  const lesson = await makeAuthorizedRequest(makeApiUrl(COURSES_KEY + '/' + courseId), {
    method: 'PUT',
    body: JSON.stringify(data)
  })
  return lesson
}

export default update
