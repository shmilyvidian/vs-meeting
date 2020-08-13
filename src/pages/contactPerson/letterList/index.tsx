import React from 'react'
import { View } from '@tarojs/components'
// import Taro from "@tarojs/taro";

import './index.scss'

function letterList(props) {
  const { allListKey } = props

  const list = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 
    'H', 'I', 'J', 'K', 'L', 'M', 'N', 
    'O', 'P', 'Q', 'R', 'S', 'T', 
    'U', 'V', 'W', 'X', 'Y', 'Z', '#'
  ]

  // 跳转至对应的key
  function showContactOfKey(key, index) {
    console.log('key', key)
    const kI = allListKey.indexOf(key)
    const lI = list.indexOf(key)
    switch(kI){
      case -1:
        const queryI = lI-1 > 0 ? lI-1 : 0
        props.showViewOfKey(list[queryI]) 
      break;
      default:
        props.showViewOfKey(key)
      break
    }
  }

  return (
    <View className="lette-list">
      {
        list.map((_item, i) => {
          return <View key={i} className="lette-list-item" onClick={showContactOfKey.bind(this, _item)}>
            {_item}
          </View>
        })
      }
    </View>
  )
}

export default letterList

