import React, { useEffect, useState } from 'react'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { makeStyles } from '@material-ui/core/styles'
import { useParams, useHistory } from 'react-router-dom'
import { getTemplateCases } from 'services/api'
import TemplateHeaders from 'components/TemplateHeaders'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'

const useStyles = makeStyles((theme) => ({
  editor: {
    width: '100%',
  },
  container: {
    margin: '1% 10%',
    textAlign: 'center',
  },
}))

function CaseList(props) {
  const classes = useStyles()
  const { open, onClose, template_id } = props
  const [data, setData] = useState('')

  useEffect(() => {
    if (open) {
      getTemplateCases(template_id)
        .then((response) => {
          setData(response)
        })
        .catch((error) => {})
    }
  }, [open])
  console.log('dis', data)
  return (
    <Dialog aria-labelledby="case-dialog-title" open={open}>
      <DialogTitle id="case-dialog-title">Tria el cas</DialogTitle>
      <List>
        {data?.cases?.map((item, index) => (
          <ListItem
            button
            onClick={(e) => {
              console.log('ap', item)
              onClose(item.id)
            }}
            key={item.case_id}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
        <ListItem button onClick={() => onClose('')} key={-1}>
          <ListItemText primary={'Tancar'} inset />
          <ListItemText primary={'Afegir'} inset />
        </ListItem>
      </List>
    </Dialog>
  )
}

export default CaseList
