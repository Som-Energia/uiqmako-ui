import TemplateList from './TemplateList'

function Main(props) {
  props.setSearchVisible(true)
  return (
    <div style={{ paddingTop: '2em' }}>
      <TemplateList search={props.search} />
    </div>
  )
}

export default Main
