import { View, ScrollView } from '@tarojs/components'
// import { AtIndexes } from 'taro-ui'
import React, { useState, useEffect } from 'react'
import Taro from "@tarojs/taro";
import { AtInput, AtCheckbox, AtButton } from 'taro-ui'
import { gennerateTaroNavigateParams } from "@/utils/urlParam";

import LetterList from './letterList/index'
import './index.scss'

const Index = () => {
  const [name, setName] = useState<string>('') // 搜索值
  const [checkedList, setCheckedList] = useState([]) // 选中的key
  const [checkedAllList, setCheckedAllListx] = useState([]) // 全选的key
  const [listScrollHeight, setListScrollHeight] = useState<string>('0px') // 联系人列表的高度
  const [tolistScrollView, setTolistScrollView] = useState('') // 点击右侧索引列表要跳至的key
  
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
    },
    {
      title: 'D',
      key: 'D',
      items: [
        {
          'name': '北京',
          'value': 'dlist1',
          'label': 'd阿坝1',
          'key': 'bkey1',
        },
        {
          'name': '保定',
          'value': 'dlist2',
          'label': 'd阿坝2',
          'key': 'bkey2',
        }
      ]
    },
    {
      title: 'E',
      key: 'E',
      items: [
        {
          'name': '北京',
          'value': 'elist1',
          'label': 'e阿坝1',
          'key': 'bkey1',
        },
        {
          'name': '保定',
          'value': 'elist2',
          'label': 'e阿坝2',
          'key': 'bkey2',
        }
      ]
    },
    {
      title: 'F',
      key: 'F',
      items: [
        {
          'name': '北京',
          'value': 'flist1',
          'label': 'f阿坝1',
          'key': 'bkey1',
        },
        {
          'name': '保定',
          'value': 'flist2',
          'label': 'f阿坝2',
          'key': 'bkey2',
        }
      ]
    },
    {
      title: 'G',
      key: 'G',
      items: [
        {
          'name': '北京',
          'value': 'glist1',
          'label': 'g阿坝1',
          'key': 'bkey1',
        },
        {
          'name': '保定',
          'value': 'glist2',
          'label': 'g阿坝2',
          'key': 'bkey2',
        }
      ]
    }
  ]

  const [searchList, setSearchList] = useState(list)
  let allSelectListValue = [] // 存储所有的联系人的选中值value
  let allListKey = [] // 存储所有的联系人所在的key分类
  list.map((allItem, allIndex) => {
    allListKey.push(allItem.key)
    if (allItem.items.length) {
      allItem.items.map((v, i) => {
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
    return (
      <View className='contact-item-name' key={i}>
        <View key={i + 'title'} className='contact-item-title' id={_item.key}>{_item.key}</View>
        <AtCheckbox
          options={_item.items}
          key={i + 'name'}
          selectedList={checkedList}
          onChange={(val) => setCheckedList(val)}
        />
      </View>
    )
  })
  
  useEffect(() => {
    console.log('useEffect-')
    setTimeout(() => {
      Taro.createSelectorQuery().selectAll('.contact-list-name').boundingClientRect(function(rects){
        setListScrollHeight(`${rects[0].height}px`)
      }).exec()
    }, 100)
  }, [searchList]);

  // 联系人全选
  function setCheckedAllList(val) {
    setCheckedList(val.length ? allSelectListValue : [])
    setCheckedAllListx(val)
  }

  // 搜索联系人
  function searchName(val) {
    setName(val)
    const filItemList = list.map((filItem, filIndex) => {
      const arr = filItem.items.filter((secItem, secIndex) => {
        if (secItem.label.search(val) === -1) {
          return false
        }
        return true
      })
      filItem.items = arr
      return filItem
    }).filter((v, i) => {
      return !!v.items.length
    })
    setSearchList(filItemList)
  }

  // 点击完成返回预约会议
  function goMeetingReserve() {
    Taro.navigateTo(gennerateTaroNavigateParams("meetingReserve", {}));
  }

  // 点击展示key所对应的联系人
  function toShowViewOfKey(e) {
    setTolistScrollView(e)
  }

  return (
    <View className="contact-page">
      {/* 联系人搜索栏 */}
      <View className='contact-input-name'>
        <AtInput
          name='value'
          type='text'
          placeholder='搜索联系人'
          placeholderClass="placeholder-class"
          // placeholderStyle="color: red;font-size:12px;"
          value={name}
          onChange={(val) => searchName(val)}
        />
      </View>
      {/* end 联系人搜索栏 */}
      {/* 联系人全选栏 */}
      <View className='contact-all-name'>
        {
          allSelectList.map((_item, i) => {
            return (<AtCheckbox
              options={_item.items}
              key={i + 'all'}
              selectedList={checkedAllList}
              onChange={(val) => setCheckedAllList(val)}
            />)
          })
        }
        <View className='contact-all-name-title'>已选（{checkedList.length}）</View>
      </View>
      {/* end 联系人全选栏 */}
      {/* 联系人滚动列表 */}
      <View className='contact-list-name' id='contactScrollView'>
        <ScrollView
          scrollY
          scrollIntoView={tolistScrollView}
          style={
            {height: listScrollHeight}
          }
        >
          {
            listContact
          }
        </ScrollView>
      </View>
      {/* end 联系人滚动列表 */}
      {/* 右侧索引列 */}
      <View className='contact-leter-name'>
        <LetterList
          allListKey={allListKey}
          showViewOfKey={toShowViewOfKey}
        />
      </View>
      {/* end 右侧索引列 */}
      {/* 选择联系人完成按钮 */}
      <View className='contact-leter-btn'>
        <AtButton type='primary' disabled={!checkedList.length} onClick={goMeetingReserve}>完成</AtButton>
      </View>
      {/* end 选择联系人完成按钮 */}
    </View>
  )
}

export default Index