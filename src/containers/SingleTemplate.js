import { React, Component, useEffect, useState } from 'react'
import TemplateInfo from 'components/TemplateInfo'
import RichTextEditor from 'components/RichTextEditor'
import SimpleEditor from 'components/SimpleEditor'
import { getSingleTemplate } from '../services/api'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { Link, useParams } from 'react-router-dom'
import { Paper, Tabs, Tab, Box } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  editor: {
    textAlign: 'left',
  },
  editorContainer: {
    textAlign: 'left',
    margin: '0 auto',
    padding: '2% 10%',
  },
}))

function SingleTemplate(props) {
  const { id } = useParams()
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const classes = useStyles()
  const [editorText, setText] = useState('')
  const [editorSimple, setEditor] = useState(false)
  const history = useHistory()

  useEffect(() => {
    //const { match: { id } } = props;
    getSingleTemplate(id)
      .then((response) => {
        setData(response)
        setIsLoading(false)
        console.log('eeoo', response)
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }, [id])
  //console.log(data['def_body_text'])
  console.log('dataqui', data && data.length > 0)
  const tabs = [
    {
      title: 'Editor HTML',
      content: <RichTextEditor data={data['template']} />,
    },
    {
      title: 'Editor Simple',
      content: <SimpleEditor data={data['template']} />,
    },
  ]
  const handleChange = () => {
    console.log('hola')
  }
  const [activeTab, setActiveTab] = useState(0)
  const activeTabContent = () => tabs[activeTab]?.content

  return (
    <div className={classes.editorContainer}>
      <Paper>
        <Button
          color="primary"
          variant="contained"
          onClick={(event) => history.push('/editSimple/1')}
        >
          Editor Simple
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={(event) => history.push('/editComplex/1')}
        >
          Editor HTML
        </Button>
      </Paper>
    </div>
  )
}

export default SingleTemplate
