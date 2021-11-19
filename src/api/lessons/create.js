import { makeAuthorizedRequest } from '../../auth'

import { makeApiUrl } from '../../api'

import { LESSONS_KEY } from './const'

export const create = async (data) => {
  const lesson = await makeAuthorizedRequest(makeApiUrl(LESSONS_KEY), {
    method: 'POST',
    body: JSON.stringify(data)
  })
  return lesson
}

export default create
