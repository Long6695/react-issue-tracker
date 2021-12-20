const FETCH_DATA_USERS = 'ISSUES_TRACKER/DATA_USERS'
const ADD_USER = 'ISSUES_TRACKER/ADD_USER'
const DELETE_USER = 'ISSUES_TRACKER/DELETE_USER'
const SHOW_LOADING = 'ISSUES_TRACKER/SHOW_LOADING'
const HIDE_LOADING = 'ISSUES_TRACKER/HIDE_LOADING'
const SHOW_DELETE = 'ISSUES_TRACKER/SHOW_DELETE'
const HIDE_DELETE = 'ISSUES_TRACKER/HIDE_DELETE'
const SEARCH_USER = 'ISSUES_TRACKER/SEARCH_USER'
const STATUS_USER = 'ISSUES_TRACKER/STATUS_USER'
const ORDERBY_USER = 'ISSUES_TRACKER/ORDERBY_USER'
const UPDATE_USER = 'ISSUES_TRACKER/UPDATE_USER'

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

const filteredStatus = (status) => {
  return {
    type: STATUS_USER,
    payload: status,
  }
}

const orderByCharacter = (payload) => {
  return {
    type: ORDERBY_USER,
    payload,
  }
}

const updateStatusUser = (status, id) => {
  return {
    type: UPDATE_USER,
    payload: status,
    id,
  }
}

const initialState = {
  api: {
    url: 'https://tony-json-server.herokuapp.com/api/todos',
    method: 'get',
  },
  users: [],
  user: {},
  filters: {
    search: '',
    orderby: '',
    status: '',
  },
  isAddSuccess: false,
  isDeleteSuccess: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_DATA_USERS:
      return {
        ...state,
        api: {
          ...state.api,
          url: 'https://tony-json-server.herokuapp.com/api/todos',
          method: 'get',
        },
        users: action.payload,
      }
    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
        user: action.payload,
        api: {
          ...state.api,
          method: 'post',
          url: 'https://tony-json-server.herokuapp.com/api/todos',
        },
      }

    case DELETE_USER:
      const newUser = [...state.users]
      const currentIndex = newUser.findIndex(
        (item) => item.id === action.payload
      )
      newUser.splice(currentIndex, 1)
      return {
        ...state,
        users: newUser,
        api: {
          ...state.api,
          method: 'delete',
          url: `https://tony-json-server.herokuapp.com/api/todos/${action.payload}`,
        },
      }

    case UPDATE_USER:
      const newUsersUpdate = [...state.users]
      const currentIndexUserUpdate = newUsersUpdate.findIndex(
        (item) => item.id === action.id
      )

      newUsersUpdate[currentIndexUserUpdate].status =
        action.payload === 'new' || action.payload === 'close'
          ? 'open'
          : 'close'

      return {
        ...state,
        api: {
          ...state.api,
          method: 'patch',
          url: `https://tony-json-server.herokuapp.com/api/todos/${action.id}`,
        },
        filters: {
          ...state.filters,
          status:
            action.payload === 'new' || action.payload === 'close'
              ? 'open'
              : 'close',
        },
        users: newUsersUpdate,
      }

    case SHOW_LOADING:
      return {
        ...state,
        isAddSuccess: true,
      }

    case HIDE_LOADING:
      return {
        ...state,
        isAddSuccess: false,
      }
    case SHOW_DELETE:
      return {
        ...state,
        isDeleteSuccess: true,
      }

    case HIDE_DELETE:
      return {
        ...state,
        isDeleteSuccess: false,
      }

    case SEARCH_USER:
      return {
        ...state,
        api: {
          ...state.api,
          method: 'get',
          url: 'https://tony-json-server.herokuapp.com/api/todos',
        },
        filters: {
          ...state.filters,
          search: action.payload,
        },
      }

    case STATUS_USER:
      return {
        ...state,
        api: {
          ...state.api,
          method: 'get',
          url: 'https://tony-json-server.herokuapp.com/api/todos',
        },
        filters: {
          ...state.filters,
          status: action.payload,
        },
      }
    case ORDERBY_USER:
      let sortedUsers = [...state.users]
      if (action.payload === 'asc') {
        sortedUsers.sort((a, b) => {
          return action.payload === 'asc' && a.description > b.description
            ? 1
            : -1
        })
      }
      if (action.payload === 'desc') {
        sortedUsers.sort((a, b) => {
          return action.payload === 'desc' && a.description > b.description
            ? -1
            : 1
        })
      }
      return {
        ...state,
        users: sortedUsers,
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
  filteredStatus,
  orderByCharacter,
  updateStatusUser,
}
