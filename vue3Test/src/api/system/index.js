import { postRequest } from '../../util/request'

export function getSearchList(data) {
  return postRequest('law/search', data)
}
