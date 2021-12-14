const FETCH_DATA_USERS = 'ISSUES_TRACKER/DATA_USERS'
const ADD_USER = 'ISSUES_TRACKER/ADD_USER'
const DELETE_USER = 'ISSUES_TRACKER/DELETE_USER'
const SHOW_LOADING = 'ISSUES_TRACKER/SHOW_LOADING'
const HIDE_LOADING = 'ISSUES_TRACKER/HIDE_LOADING'
const SHOW_DELETE = 'ISSUES_TRACKER/SHOW_DELETE'
const HIDE_DELETE = 'ISSUES_TRACKER/HIDE_DELETE'
const fetchDataUsers = (users) => {
  return {
    type: FETCH_DATA_USERS,
    payload: users,
  }
}

const addUser = (users) => {
  return {
    type: ADD_USER,
    payload: users,
  }
}

const deleteUser = (userID) => {
  return {
    type: DELETE_USER,
    payload: userID,
  }
}

const isShowLoadingUser = () => {
  return {
    type: SHOW_LOADING,
  }
}

const isHideLoadingUser = () => {
  return {
    type: HIDE_LOADING,
  }
}

const isShowDeleteUser = () => {
  return {
    type: SHOW_DELETE,
  }
}

const isHideDeleteUser = () => {
  return {
    type: HIDE_DELETE,
  }
}

let initialState = {
  users: [],
  user: {},
  deleteUser: {},
  isLoading: false,
  isDelete: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_DATA_USERS:
      return {
        ...state,
        users: action.payload,
      }
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
        user: action.payload,
      }

    case DELETE_USER:
      const newUser = [...state.users]
      const currentIndex = newUser.findIndex(
        (item) => item.id === action.payload
      )
      const removeUser = newUser.splice(currentIndex, 1)
      return {
        ...state,
        users: newUser,
        deleteUser: removeUser,
      }

    case SHOW_LOADING:
      return {
        ...state,
        isLoading: true,
      }

    case HIDE_LOADING:
      return {
        ...state,
        isLoading: false,
      }
    case SHOW_DELETE:
      return {
        ...state,
        isDelete: true,
      }

    case HIDE_DELETE:
      return {
        ...state,
        isDelete: false,
      }
    default:
      return state
  }
}

export {
  initialState,
  reducer,
  fetchDataUsers,
  addUser,
  deleteUser,
  isShowLoadingUser,
  isHideLoadingUser,
  isShowDeleteUser,
  isHideDeleteUser,
}
