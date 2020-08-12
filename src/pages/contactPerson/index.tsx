import { View } from '@tarojs/components'
// import { AtIndexes } from 'taro-ui'
import React, { useState } from 'react'
import { AtInput, AtCheckbox } from 'taro-ui'

import LetterList from './letterList/index'
import './index.scss'

const Index = () => {
  const [name, setName] = useState<string>('')
  const [checkedList, setCheckedList] = useState([])
  const [checkedAllList, setCheckedAllListx] = useState([])
  // function onClick() {

  // }
  const list = [
    {
      title: 'A',
      key: 'A',
      items: [
        {
          'name': '阿坝',
          'value': 'alist1',
          'label': '阿坝1',
          'key': 'akey1',
          // 此处可加其他业务字段
        },
        {
          'name': '阿拉善',
          'value': 'alis2',
          'label': '阿坝2',
          'key': 'akey2',
        }
      ]
    },
    {
      title: 'B',
      key: 'B',
      items: [
        {
          'name': '北京',
          'value': 'blist1',
          'label': 'b阿坝1',
          'key': 'bkey1',
        },
        {
          'name': '保定',
          'value': 'blist2',
          'label': 'b阿坝2',
          'key': 'bkey2',
        }
      ]
    }
  ]
  const [searchList, setSearchList] = useState(list)
  let allSelectListValue = []
  list.map((allItem, allIndex) => {
    if(allItem.items.length) {
      allItem.items.map((v, i) =>{
        allSelectListValue.push(v.value)
      })
    }
  })
  const allSelectList = [
    {
      title: 'ALL',
      key: 'ALL',
      items: [
        {
          'name': '全选',
          'value': 'all',
          'label': '全选',
          'key': 'all',
        }]
    }
  ]
  const listContact = searchList.map((_item, i) => { 
    return(
      <View className='contact-item-name' key={i}>
        <View key={i+'title'} className='contact-item-title'>{_item.key}</View>
        <AtCheckbox
          options={_item.items}
          key={i+'name'}
          selectedList={checkedList}
          onChange={(val)=>setCheckedList(val)}
        />
      </View>
    )
  })
  
  function setCheckedAllList(val) {
    setCheckedList(val.length ? allSelectListValue : [])
    setCheckedAllListx(val)
  }

  function searchName(val) {
    setName(val)
    const filItemList = list.map((filItem, filIndex) => {
      const arr = filItem.items.filter((secItem, secIndex) => {
        if(secItem.label.search(val) === -1) {
          return false
        }
        return true
      })
      filItem.items = arr
      return filItem
    }).filter((v,i) => {
      return !!v.items.length
    })
    setSearchList(filItemList)
  }

  return (
    <View className="contact-page">
      {/* <AtIndexes
        list={list}
        onClick={onClick}
      > */}
        <View className='contact-input-name'>
          <AtInput
            name='value'
            type='text'
            placeholder='搜索联系人'
            placeholderClass="placeholder-class"
            // placeholderStyle="color: red;font-size:12px;"
            value={name}
            onChange={(val)=>searchName(val)}
          />
        </View>
        <View className='contact-all-name'>
          {
            allSelectList.map((_item, i) => {
              return (<AtCheckbox
                options={_item.items}
                key={i+'all'}
                selectedList={checkedAllList}
                onChange={(val)=>setCheckedAllList(val)}
              />)
            })
          }
          <View className='contact-all-name-title'>已选（{checkedList.length}）</View>
        </View>
        <View className='contact-list-name'>
          {
            listContact
          }
        </View>
        <View className='contact-leter-name'>
          <LetterList />
        </View>
      {/* </AtIndexes> */}
    </View>
  )
}

export default Index