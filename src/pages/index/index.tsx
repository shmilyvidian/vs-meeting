import React, { useState } from 'react'
import { Image, View, Button } from '@tarojs/components'

import './index.scss'

import LastestMeetingListItem from './item/index'

import manHeadPortrait from '@/asstes/images/headPortrait/man.svg'
import more from '@/asstes/images/more.svg'


function Index() {
  const [userName] = useState('张宏兵')

  const [meetingList] = useState([{
    title: '同业需求评审',
    date: '09:30-10:00',
    user: 'Rain',
    status: 'meeting'
  }, {
    title: '经分需求评审',
    date: '09:30-10:00',
    user: '艾杰',
    status: 'wait'
  }])


  // 渲染最近会议列表
  const meetingListView = meetingList.map((item, index) => {
    return (
      <LastestMeetingListItem item={item} key={index}></LastestMeetingListItem>
    )
  })

  return (
    <View className="index-main">
      {/* 用户 */}
      <View className="bg-fff">
        <View className="user-wrapper">
          <Image className="user-img" src={manHeadPortrait}></Image>
          <View className="user-name">嗨，{userName}</View>
        </View>
        <View className="appointment-button">预约会议</View>
      </View>
      {/* end of 用户 */}
      {/* 最近会议 */}
      <View className="bg-fff lastest-meeting">
        <View className="lastest-meeting-flex">
          <View className="lastest-meeting-title">最近会议</View>
          <View className="lastest-meeting-more">全部
            <Image src={more} className="lastest-meeting-more-icon">
            </Image>
          </View>
        </View>
        <View className="lastest-meeting-list">
          {meetingListView}
        </View>
      </View>
      {/* end of 最近会议 */}
    </View>
  )
}

export default Index