import { React, useEffect, useState, useRef } from 'react'
import { getUsers, updateUser } from 'services/api'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import TableContainer from '@material-ui/core/TableContainer'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import Checkbox from '@material-ui/core/Checkbox'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import SimpleSnackbar from 'components/SimpleSnackbar'

const useStyles = makeStyles((theme) => ({
  table: {
    padding: '2rem',
    margin: '0 auto',
    marginTop: '1.5rem',
    textAlign: 'center',
  },
  container: {
    width: '90%',
    margin: '0 auto',
  },
}))

function TemplateList(props) {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const { search } = props
  const [reload, setReload] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const classes = useStyles()
  const history = useHistory()
  const [value, setValue] = useState({})
  const [changedUser, setChangedUser] = useState({})
  const [showAlert, setShowAlert] = useState()

  props.setSearchVisible(true)

  useEffect(() => {
    getUsers()
      .then((response) => {
        setData(response)
        setValue(response)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }, [reload])

  useEffect(() => {
    if (search && search !== '') {
      const filtered = data.filter((item) =>
        item?.username?.toLowerCase().includes(search.toLowerCase())
      )
      setFilteredData(filtered)
    } else {
      setFilteredData(data)
    }
  }, [search, data])

  useEffect(() => {
    if (changedUser && Object.keys(changedUser).length !== 0) {
      updateUser(
        changedUser.id,
        changedUser.username,
        changedUser.category,
        changedUser.disabled
      )
        .then((response) => {
          //setData(response)
          //setValue(response)
          setIsLoading(false)
          setReload(!reload)
          setShowAlert(true)
        })
        .catch((error) => {
          setIsLoading(false)
        })
    }
  }, [changedUser])

  return (
    <div style={{ paddingTop: '2em' }}>
      <TableContainer component={Paper} className={classes.container}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
          stickyHeader={true}
        >
          <TableHead stickyHeader={true}>
            <TableRow>
              <TableCell>Usuari</TableCell>
              <TableCell align="center">Permisos</TableCell>

              <TableCell align="left">Deshabilitat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.map((row, index) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell align="center">
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      name="category"
                      defaultValue={row.category}
                      value={value[index]['category']}
                      onChange={(e) => {
                        setValue((oldValues) => {
                          oldValues[index]['category'] = e.target.value
                          return [...oldValues]
                        })
                        setChangedUser(row)
                      }}
                    >
                      <FormControlLabel
                        value="basic_user"
                        control={<Radio />}
                        label="Bàsic"
                      />
                      <FormControlLabel
                        value="python_user"
                        control={<Radio />}
                        label="Python"
                      />
                      <FormControlLabel
                        value="admin"
                        control={<Radio />}
                        label="Admin"
                      />
                    </RadioGroup>
                  </FormControl>
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={value[index]['disabled']}
                    onChange={(e) => {
                      setValue((oldValues) => {
                        oldValues[index]['disabled'] = e.target.checked
                        return [...oldValues]
                      })
                      setChangedUser(row)
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SimpleSnackbar
        open={showAlert}
        setOpen={setShowAlert}
        message={'Canvis guardats'}
      />
    </div>
  )
}

export default TemplateList

/*
      <List>
        {filteredData?.map((item, index) => (
          <User item={item} key={index} />
        ))}
      </List>

      return (
      <ListItem button>
        <ListItemText primary={item.username} />
        <TextField
          className={classes.input}
          id="outlined-basic"
          label="Categoria"
          variant="outlined"
          onChange={(e) => {}}
          defaultValue={item.category}
          helperText="Categoria"
        />
        <ListItemText primary={item.category} />
        <ListItemText primary={item.disabled} />
      </ListItem>
    )
*/
