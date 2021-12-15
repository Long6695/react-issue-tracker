const FETCH_DATA_USERS = 'ISSUES_TRACKER/DATA_USERS'
const ADD_USER = 'ISSUES_TRACKER/ADD_USER'
const DELETE_USER = 'ISSUES_TRACKER/DELETE_USER'
const SHOW_LOADING = 'ISSUES_TRACKER/SHOW_LOADING'
const HIDE_LOADING = 'ISSUES_TRACKER/HIDE_LOADING'
const SHOW_DELETE = 'ISSUES_TRACKER/SHOW_DELETE'
const HIDE_DELETE = 'ISSUES_TRACKER/HIDE_DELETE'
const SEARCH_USER = 'ISSUES_TRACKER/SEARCH_USER'
const STATUS_USER = 'ISSUES_TRACKER/STATUS_USER'
const fetchDataUsers = (users) => {
  return {
    type: FETCH_DATA_USERS,
    payload: users,
  }
}

const addUser = (user) => {
  return {
    type: ADD_USER,
    payload: user,
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

const searchUser = (user) => {
  return {
    type: SEARCH_USER,
    payload: user,
  }
}

const filteredCloseStatus = (status) => {
  return {
    type: STATUS_USER,
    payload: status,
  }
}

let initialState = {
  url: 'https://tony-json-server.herokuapp.com/api/todos',
  method: 'get',
  users: [],
  user: {},
  filteredText: '',
  deleteUser: {},
  status: '',
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
        method: 'post',
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
        method: 'delete',
        url: `https://tony-json-server.herokuapp.com/api/todos/${action.payload}`,
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

    case SEARCH_USER:
      return {
        ...state,
        method: 'get',
        filteredText: action.payload,
      }

    case STATUS_USER:
      return {
        ...state,
        method: 'get',
        status: action.payload,
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
  searchUser,
  filteredCloseStatus,
}
