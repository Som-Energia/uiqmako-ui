import TemplateList from './TemplateList'

function Main(props) {
  props.setSearchVisible(true)
  return (
    <div>
      <TemplateList search={props.search} />
    </div>
  )
}

export default Main
