import { View, Picker } from '@tarojs/components'
// import { AtIndexes } from 'taro-ui'
import React, { useState, useEffect } from 'react'

import RoomItem from './roomItem/index'
import './index.scss'
import { RoomValBtn } from './indexSty'

const Index = () => {
  const [weekListValue, setweekListValue] = useState('4')
  const [roomSelectArr, setRoomSelectArr] = useState([0,0])
  const [roomSelectArrValue, setRoomSelectArrValue] = useState('')

  const weekList = [
    {
      label: '日',
      value: '2',
      disable: true,
    },
    {
      label: '一',
      value: '3',
      disable: true,
    },
    {
      label: '二',
      value: '4',
      // disable: true,
    },
    {
      label: '三',
      value: '5',
      // disable: true,
    },
    {
      label: '四',
      value: '6',
      // disable: true,
    },
    {
      label: '五',
      value: '7',
      // disable: true,
    },
    {
      label: '六',
      value: '8',
      // disable: true,
    },
  ]

  const meetingRoomRange = [
    ['保税区职场', '荣超职场', '南塔职场'],
    ['2楼', '3楼', '4楼'],
  ]

  const roomList = [
    {
      sum: '20',
      numb: '308',
      features: '智能语音',
      functionDetails: '投影/电视/电话/白板/视频',
      statusOfUseArr: [
        '4',
        '4',
        '4',
        '4',
        '4',
        '4',
        '4',
        '4',
        '4',
        '4',
        '4',
        '4',
        '4',
        '4',
        '4',
        '4',
        '2',
        '2',
        '1',
        '1',
        '2',
        '2',
        '1',
        '1',
        '1',
        '1',
        '2',
        '2',
        '1',
        '1',
        '2',
      ], // 1选中-蓝 2已预约-橙 3可预约-绿 4不可预约-灰 
    },
    {
      sum: '20',
      numb: '406',
      features: '智能语音',
      functionDetails: '投影/电视/电话/白板/视频',
      statusOfUseArr: [
        '4',
        '4',
        '4',
        '4',
        '4',
        '4',
        '4',
        '4',
        '4',
        '4',
        '4',
        '4',
        '4',
        '4',
        '4',
        '4',
        '2',
        '2',
        '1',
        '1',
        '2',
        '2',
        '1',
        '1',
        '1',
        '1',
        '2',
        '2',
        '1',
        '1',
        '2',
      ], // 1选中-蓝 2已预约-橙 3可预约-绿 4不可预约-灰 
    }
  ]

  useEffect(()=>{
    console.log('weekListValue======'+weekListValue)
  },[weekListValue])

  useEffect(()=>{
    let roomselectText = ''
    roomSelectArr.map((v, i) => {
      roomselectText += (meetingRoomRange[i][v] + ' ')
    })
    setRoomSelectArrValue(roomselectText)
  },[roomSelectArr])

  function roomValBtnClick(item) {
    if(!item.disable){
      setweekListValue(item.value)
    }
  }

  function roomSelect(e) {
    console.log('e', e)
    setRoomSelectArr(e.detail.value)
  }

  const meetingWeekList = weekList.map((_item, i) => {
    const active = weekListValue === _item.value
    const disable = _item.disable || false
    return (
      <View className='at-col' key={i}>
        <View key={i + 'label'} className='meeting-room-label'>{_item.label}</View>
        <RoomValBtn
          active={active}
          disable={disable}
          onClick={roomValBtnClick.bind(this, _item)}
        >{_item.value}</RoomValBtn>
      </View>
    )
  })

  const roomItemList = roomList.map((_item, i) => {
    return (
      <RoomItem
        item={_item}
        key={i}
      ></RoomItem>
    )
  })

  return (
    <View className="meeting-room-page">
      {/* 日期选择 */}
      <View className="meeting-room-date">
        <View className="meeting-room-years">
          <View className="meeting-room-year">8月</View>
          <View className="meeting-room-mouth">2020年</View>
        </View>
        <View className="meeting-room-week at-row">
          {meetingWeekList}
        </View>
      </View>
      {/* end 日期选择 */}
      {/* 会议室选择 */}
      <View className="meeting-room-select">
        <Picker
          mode="multiSelector"
          range={meetingRoomRange}
          onChange={roomSelect.bind(this)}
        >
          <view className="meeting-room-select-title">
            <view className="meeting-room-select-title-l">会议室</view>
            <view className="meeting-room-select-title-r"
            >  
              {roomSelectArrValue}
              <View className='at-icon at-icon-chevron-right'></View>
            </view>
          </view>
        </Picker>
      </View>
      {/* end 会议室选择 */}
      {/* 会议室详情 */}
        <view className="meeting-room-detail">
          {roomItemList}
        </view>
      {/* end 会议室详情 */}
    </View>
  )
}

export default Index