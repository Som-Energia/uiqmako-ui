import { React, useEffect, useState } from 'react'
import TemplateInfo from 'components/TemplateInfo'
import { getTemplateList } from 'services/api'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  newTemplateButtom: {
    borderRadius: '50%',
    fontSize: '2rem',
    position: 'fixed',
    right: '5%',
    bottom: '5%',
  },
}))

function TemplateList(props) {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const classes = useStyles()
  const history = useHistory()
  useEffect(() => {
    getTemplateList()
      .then((response) => {
        setData(response)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    if (search && search !== '') {
      const filtered = data.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.model.toLowerCase().includes(search.toLowerCase()) ||
          item.xml_id.toLowerCase().includes(search.toLowerCase())
      )
      setFilteredData(filtered)
    } else {
      setFilteredData(data)
    }
  }, [search, data])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <Box my="2">
        <TextField onChange={handleSearch} variant="outlined" />
      </Box>

      <ul className="list-template">
        {filteredData?.map((item, index) => (
          <TemplateInfo key={index} item={item} />
        ))}
      </ul>
      <Button
        color="primary"
        variant="contained"
        className={classes.newTemplateButtom}
        onClick={(event) => history.push('/newTemplate')}
      >
        +
      </Button>
    </div>
  )
}

export default TemplateList
