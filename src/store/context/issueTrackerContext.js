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
    { url, method, users, user, isLoading, isDelete, filteredText, status },
    dispatch,
  ] = useReducer(reducer, initialState)
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
        if (method === 'get' && filteredText.length > 0) {
          dispatch(
            fetchDataUsers(
              res.data.data.filter((item) =>
                item.description.includes(filteredText)
              )
            )
          )
        }
        // update user
        if (method === 'patch' && status === '') return
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
  }, [url, user, method, filteredText, status])

  return (
    <issueTrackerContext.Provider
      value={[{ users, isLoading, isDelete }, dispatch]}
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
