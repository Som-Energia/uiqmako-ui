import { React, useEffect, useState, useContext } from 'react'
import TemplateEditInfo from 'components/TemplateEditInfo'
import { getTemplatesEditsList, getSingleTemplate } from 'services/api'
import { makeStyles } from '@material-ui/core/styles'
import SingleTemplate from './SingleTemplate'
import Modal from '@material-ui/core/Modal'
import { useAlert } from 'context/alertDetails'
//import { useAuth } from 'context/currentUser'
import { useAuth } from 'context/sessionContext'
import SearchContext from 'context/searchContext'

const useStyles = makeStyles((theme) => ({
  modal: {
    width: '80%',
    height: '90%',
    overflow: 'hidden',
    padding: '2%',
    margin: '2% auto',
  },
  modalContainer: {
    backgroundColor: '#f2f2f2',
    maxHeight: '90%',
    minHeight: '90%',
    overflow: 'auto',
  },
  searchFieldContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '1% auto',
    width: '80%',
  },
  templateEditList: {},
  provaMenu: {
    backgroundColor: 'none',
  },
}))

function TemplateEditList(props) {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { searchText } = useContext(SearchContext)
  const [openId, setOpenId] = useState(false)
  const [open, setOpen] = useState(false)
  const [sigleTemplate, setSingleTemplate] = useState({})
  const classes = useStyles()
  const { setAlertInfo } = useAlert()
  const { currentUser, setCurrentUser } = useAuth()

  useEffect(() => {
    getTemplatesEditsList()
      .then((response) => {
        setData(response)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    if (searchText && searchText !== '') {
      const filtered = data.filter(
        (item) =>
          item.template.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.template.model
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          item.template.xml_id.toLowerCase().includes(searchText.toLowerCase())
      )
      setFilteredData(filtered)
    } else {
      setFilteredData(data)
    }
  }, [searchText, data])
  useEffect(() => {
    if (openId !== false) {
      getSingleTemplate(openId)
        .then((response) => {
          setSingleTemplate(response)
          setOpen(true)
          setIsLoading(false)
        })
        .catch((error) => {
          setIsLoading(false)
          setOpenId(!openId)
          setAlertInfo({
            open: true,
            message: "Error de connexió amb l'ERP",
            severity: 'error',
          })
        })
    }
  }, [openId])

  const handleClose = () => {
    setOpen(false)
    setOpenId(false)
  }
  return (
    <div style={{ paddingTop: '2em' }}>
      <div className={classes.templateEditList}>
        {filteredData?.map((item, index) => (
          <TemplateEditInfo key={index} item={item} setClicked={setOpenId} />
        ))}
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          disableScrollLock={true}
          className={classes.modal}
        >
          <div className={classes.modalContainer}>
            <SingleTemplate data={sigleTemplate} templateId={openId} />
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default TemplateEditList
