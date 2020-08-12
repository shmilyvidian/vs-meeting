import React from 'react'
import { View } from '@tarojs/components'

import './index.scss'

function letterList(props: propsType) {
  const { item } = props

  const list = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 
    'H', 'I', 'J', 'K', 'L', 'M', 'N', 
    'O', 'P', 'Q', 'R', 'S', 'T', 
    'U', 'V', 'W', 'X', 'Y', 'Z', '#'
  ]

  return (
    <View className="lette-list">
      {
        list.map((_item, i) => {
          return <View key={i} className="lette-list-item">
            {_item}
          </View>
        })
      }
    </View>
  )
}

export default letterList

