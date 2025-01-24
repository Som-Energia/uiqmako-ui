import { useContext } from 'react'
import TemplateList from './TemplateList'
import SearchContext from 'context/searchContext'

function Main(props) {
  const { searchText } = useContext(SearchContext)
  props.setSearchVisible(true)
  return (
    <div>
      <TemplateList search={searchText} />
    </div>
  )
}

export default Main
