import { makeAuthorizedRequest } from '../../auth'

import { makeApiUrl } from '../../api'

import { ADMINS_KEY } from './const'

export const isAdmin = async (userId) => {
  const adminValue = await makeAuthorizedRequest(makeApiUrl(ADMINS_KEY + '/' + userId))
  return adminValue === true
}

export default isAdmin
