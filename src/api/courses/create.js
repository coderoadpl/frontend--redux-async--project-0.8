import { makeAuthorizedRequest } from '../../auth'

import { makeApiUrl } from '../../api'

import { COURSES_KEY } from './const'

export const create = async (data) => {
  const lesson = await makeAuthorizedRequest(makeApiUrl(COURSES_KEY), {
    method: 'POST',
    body: JSON.stringify(data)
  })
  return lesson
}

export default create
