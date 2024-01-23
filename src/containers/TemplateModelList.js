import { React, useEffect, useState } from 'react'
import { getTemplateList } from 'services/api'
import TemplateModel from 'components/TemplateModel'

function TemplateModelList() {
  const [data, setData] = useState([])
  const [templateModelData, setTemplateModelData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getTemplateModelData = (response) => {
    let dict = {} // create an empty array
    for (let i = 0; i < response.length; i++) {
      dict[response[i].model] =
        response[i].model in dict ? dict[response[i].model] + 1 : 1
    }
    setTemplateModelData(dict)
  }

  useEffect(() => {
    getTemplateList()
      .then((response) => {
        setData(response)
        setIsLoading(false)
        getTemplateModelData(response)
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }, [])

  return (
    <div>
      {Object.entries(templateModelData)?.map(([model, quantity]) => (
        <div>
          <TemplateModel
            key={model.indexOf(model)}
            item={{ model: model, quantity: quantity }}
          />
        </div>
      ))}
    </div>
  )
}

export default TemplateModelList
