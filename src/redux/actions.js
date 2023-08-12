import { types } from "./types"

function preloaderOn() {
   return {
      type: types.PRELOADER_ON
   }
}

function preloaderOff() {
   return {
      type: types.PRELOADER_OFF
   }
}

function getUsersSuccess(users) {
   return {
      type: types.GET_USERS_ON,
      payload: users
   }

}

function getUsersFail(error) {
   return {
      type: types.GET_USERS_OFF,
      payload: error
   }
}

export function addUserAction(user) {
   return async function (dispatch) {

      dispatch(preloaderOn())

      const options = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(user)
      }
      const response = await fetch('https://jsonplaceholder.typicode.com/users', options)

      if (response.status === 201) {
         dispatch(preloaderOff())
      }
      else if (response.status === 404) {
         dispatch(preloaderOff())
      }
   }
}
export function getUsersAction() {
   return async function (dispatch) {
      dispatch(preloaderOn())
      try {
         const response = await fetch('https://jsonplaceholder.typicode.com/users')
         const data = await response.json()
         if (response.ok) {
            dispatch(getUsersSuccess(data))
         } else {
            dispatch(getUsersFail('Проверьте пожалуйтста свою запись'))
         }
      } catch (error) {
         dispatch(getUsersFail('Проверьте пожалуйтста свою запись', error))
      } finally {
         dispatch(preloaderOff())
      }
   }
}