import { makeAuthorizedRequest } from '../../auth'

import { makeApiUrl } from '../../api'

import { LESSONS_KEY } from './const'

export const update = async (lessonId, data) => {
  const lesson = await makeAuthorizedRequest(makeApiUrl(LESSONS_KEY + '/' + lessonId), {
    method: 'PUT',
    body: JSON.stringify(data)
  })
  return lesson
}

export default update
