import { makeAuthorizedRequest } from '../../auth'

import { makeApiUrl } from '../../api'

import { COURSES_KEY } from './const'

export const remove = async (coursesId) => {
  const lesson = await makeAuthorizedRequest(makeApiUrl(COURSES_KEY + '/' + coursesId), {
    method: 'DELETE'
  })
  return lesson
}

export default remove
