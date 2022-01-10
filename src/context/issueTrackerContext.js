import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

// service
import httpRequest from 'services/httpRequest'

const IssuesContext = createContext()

const IssueProvider = ({ children }) => {
  const [issues, setIssues] = useState([])
  const [isFilteredIssues, setIsFilteredIssues] = useState([])
  const [isAddSuccess, setAddIsSuccess] = useState(null)
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(null)
  const [isFilterBy, setIsFilterBy] = useState('all')
  const [isOrderBy, setIsOrderBy] = useState('')
  const [searchText, setSearchText] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(10)
  // fetch api
  const fetchData = async (page, limitItem = 3) => {
    
    if(issues.length === totalCount) {
      setLoading(false);
      return;
    };

    const res = await httpRequest.get(
      `https://tony-json-server.herokuapp.com/api/todos?_page=${page}&_limit=${limitItem}`
    )

    const data = res.data.data

    setIssues((issues) => [...issues, ...data])
    setTotalCount(res.data.pagination.totalCount)
  }


  useEffect(() => {
    try {
      fetchData(pageNumber)
    } catch (error) {
      throw new Error(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber])

  // filter && search
  useEffect(() => {
    if (issues.length === 0) return
    let newIssues = issues.length > 0 ? issues : []

    // filter
    isFilterBy === 'open' &&
      (newIssues = newIssues.filter((issue) => issue.status === isFilterBy))

    isFilterBy === 'close' &&
      (newIssues = newIssues.filter((issue) => issue.status === isFilterBy))

    // search
    newIssues = newIssues
      .filter((issue) =>
        issue.description.toLowerCase().includes(searchText.toLowerCase())
      )
      
    if(isOrderBy !== '') {
      newIssues = newIssues.sort((a, b) => {
        if (isOrderBy === 'asc') {
          return a.description > b.description ? 1 : -1
        }
        return a.description > b.description ? -1 : 1
      })
    }
    

    setIsFilteredIssues(newIssues)
  }, [isFilterBy, issues, isOrderBy, searchText])

  //Add issues
  const addIssue = async (issue) => {
    try {
      const res = await httpRequest.post(
        'https://tony-json-server.herokuapp.com/api/todos',
        issue
      )
      const data = res.data.data

      setIssues((prev) => [data, ...prev])

      setAddIsSuccess(true)

      setTimeout(() => {
        setAddIsSuccess(false)
      }, 1000)
    } catch {}
  }
  // Delete issues
  const deleteIssue = async (issueId) => {
    try {
      httpRequest.delete(
        `https://tony-json-server.herokuapp.com/api/todos/${issueId}`
      )

      const copyIssues = [...issues]
      const currentIndex = copyIssues.findIndex((issue) => issue.id === issueId)
      copyIssues.splice(currentIndex, 1)
      setIssues(copyIssues)

      setIsDeleteSuccess(true)

      setTimeout(() => {
        setIsDeleteSuccess(false)
      }, 1000)
    } catch (error) {}
  }
  // Update status issue
  const updateStateIssue = async (issueStatus, issueId) => {
    httpRequest.patch(
      `https://tony-json-server.herokuapp.com/api/todos/${issueId}`,
      { status: issueStatus }
    )

    const copyIssues = [...issues]
    const currentIndex = copyIssues.findIndex((issue) => issue.id === issueId)
    copyIssues[currentIndex].status =
      copyIssues[currentIndex].status === 'new' ||
      copyIssues[currentIndex].status === 'close'
        ? 'open'
        : 'close'

    setIssues(copyIssues)
  }

  return (
    <IssuesContext.Provider
      value={{
        issues,
        addIssue,
        deleteIssue,
        isAddSuccess,
        isDeleteSuccess,
        isFilteredIssues,
        updateStateIssue,
        setIsFilterBy,
        isOrderBy,
        setIsOrderBy,
        setSearchText,
        searchText,
        setPageNumber,
        loading,
      }}
    >
      {children}
    </IssuesContext.Provider>
  )
}

const useIssueContext = () => useContext(IssuesContext)

export { useIssueContext }
export default IssueProvider
