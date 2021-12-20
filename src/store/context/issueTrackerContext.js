import { createContext, useContext, useEffect, useReducer } from 'react'
import {
  initialState,
  reducer,
  fetchDataUsers,
} from '../reducer/issueTrackerReducer'
import axios from 'axios'

const issueTrackerContext = createContext()

const IssueTrackerContextProvider = ({ children }) => {
  const [
    { api, users, user, filters, isAddSuccess, isDeleteSuccess },
    dispatch,
  ] = useReducer(reducer, initialState)
  const { url, method } = api
  const { status, search } = filters

  // get post delete api
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios({
          method: method,
          url: url,
          data:
            (method === 'post' && user) || (method === 'patch' && { status }),
        })

        // get users
        if (method === 'get') {
          dispatch(
            fetchDataUsers(
              res.data.data.sort((a, b) => {
                return a.description > b.description ? 1 : -1
              })
            )
          )
        }

        // filter by search bar
        if (method === 'get' && search.length > 0) {
          dispatch(
            fetchDataUsers(
              res.data.data.filter((item) => item.description.includes(search))
            )
          )
        }
        // add user
        if (method === 'post' && Object.keys(user).length === 0) return

        // filter by status
        if (method === 'get' && status === 'close') {
          dispatch(
            fetchDataUsers(
              res.data.data.filter((item) => item.status === 'close')
            )
          )
        }

        if (method === 'get' && status === 'open') {
          dispatch(
            fetchDataUsers(
              res.data.data.filter((item) => item.status === 'open')
            )
          )
        }

        if (method === 'get' && status === 'all') {
          dispatch(fetchDataUsers(res.data.data))
        }
      }
      fetchData()
    } catch (error) {
      throw new Error(error)
    }
  }, [url, user, method, search, status])

  return (
    <issueTrackerContext.Provider
      value={[{ users, isAddSuccess, isDeleteSuccess }, dispatch]}
    >
      {children}
    </issueTrackerContext.Provider>
  )
}

const useIssueTrackerContext = () => useContext(issueTrackerContext)

export {
  issueTrackerContext,
  IssueTrackerContextProvider,
  useIssueTrackerContext,
}
