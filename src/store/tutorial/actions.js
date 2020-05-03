import { $axios } from 'boot/axios'
export function fetchTutorial ({
  state,
  commit
}) {
  return $axios.get('/tutorials')
    .then(async response => {
      if (response) {
        commit('updateTutorialList', response)
        return response
      } else {
        commit('updateTutorialList', [])
        return []
      }
    }).catch(error => error)
}
export function deleteTutorial ({
  state,
  commit
}, payload) {
  return $axios.delete(`/tutorials/${payload}`)
    .then(response => {
      if (response) {
        return true
      } else {
        return false
      }
    }).catch(error => error)
}
export function addTutorial ({
  state,
  commit
}, payload) {
  return $axios.post('/tutorials', payload)
    .then(response => {
      if (response) {
        return response
      } else {
        return false
      }
    }).catch(error => error)
}
export function updateTutorial ({
  state,
  commit
}, payload) {
  return $axios.put(`/tutorials/${payload.id}`, payload)
    .then(response => {
      if (response) {
        return response
      } else {
        return false
      }
    }).catch(error => error)
}
