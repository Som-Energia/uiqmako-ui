import { React, useEffect, useState } from 'react'
import TemplateInfo from 'components/TemplateInfo'
import { getTemplateList, getSingleTemplate } from 'services/api'
import { makeStyles } from '@material-ui/core/styles'
import SingleTemplate from './SingleTemplate'
import Modal from '@material-ui/core/Modal'
import { useAlert } from 'context/alertDetails'

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
  templateList: {},
  provaMenu: {
    backgroundColor: 'none',
  },
}))

function TemplateList(props) {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { search } = props
  const [openId, setOpenId] = useState(false)
  const [open, setOpen] = useState(false)
  const [sigleTemplate, setSingleTemplate] = useState({})
  const classes = useStyles()
  const { setAlertInfo } = useAlert()
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
    <div>
      <div className={classes.templateList}>
        {filteredData?.map((item, index) => (
          <TemplateInfo key={index} item={item} setClicked={setOpenId} />
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

export default TemplateList
