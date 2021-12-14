import { createContext, useContext, useEffect, useReducer } from 'react'
import {
  initialState,
  reducer,
  fetchDataUsers,
} from '../reducer/issueTrackerReducer'
import axios from 'axios'

const issueTrackerContext = createContext()

const IssueTrackerContextProvider = ({ children }) => {
  const [{ users, user, deleteUser, isLoading, isDelete }, dispatch] =
    useReducer(reducer, initialState)

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios({
          method: 'get',
          url: 'https://tony-json-server.herokuapp.com/api/todos',
        })

        dispatch(fetchDataUsers(res.data.data))
      }
      fetchData()
    } catch (error) {
      throw new Error(error)
    }
  }, [])

  useEffect(() => {
    try {
      if (Object.keys(user).length === 0) return
      const fetchData = async () => {
        await axios({
          method: 'post',
          url: 'https://tony-json-server.herokuapp.com/api/todos',
          data: user,
        })
      }

      fetchData()
    } catch (error) {
      throw new Error(error)
    }
  }, [user])

  useEffect(() => {
    try {
      if (Object.keys(deleteUser).length === 0) return
      const user = deleteUser.find((item) => item.id)
      const fetchData = async () => {
        await axios({
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'delete',
          url: `https://tony-json-server.herokuapp.com/api/todos/${user.id}`,
        })
      }

      fetchData()
    } catch (error) {
      throw new Error(error)
    }
  }, [deleteUser])

  return (
    <issueTrackerContext.Provider
      value={[{ users, user, isLoading, isDelete }, dispatch]}
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
