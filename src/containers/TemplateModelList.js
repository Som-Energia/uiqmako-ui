import { React, useEffect, useState } from 'react'
import { getTemplateList } from 'services/api'
import TemplateModel from 'components/TemplateModel'

function TemplateModelList() {
  const [data, setData] = useState([])
  const [templateModelData, setTemplateModelData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let dict = {} // create an empty array

    for (let i = 0; i < data.length; i++) {
      dict[data[i].model] = data[i].model in dict ? dict[data[i].model] + 1 : 1
    }

    setTemplateModelData(dict)
  }, [data])

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
