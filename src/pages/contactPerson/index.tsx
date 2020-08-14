import { View, ScrollView } from "@tarojs/components";
// import { AtIndexes } from 'taro-ui'
import React, { useState, useEffect } from "react";
import Taro, { useDidShow } from "@tarojs/taro";
import { AtInput, AtCheckbox, AtButton } from "taro-ui";
// import { gennerateTaroNavigateParams } from "@/utils/urlParam";

import LetterList from "./letterList/index";
import "./index.scss";

const Index = () => {
  const [name, setName] = useState<string>(""); // 搜索值
  const arrPlaceholder: any = "";
  const [checkedList, setCheckedList] = useState(arrPlaceholder); // 选中的key
  const [checkedAllList, setCheckedAllListx] = useState(['']); // 全选的key
  const [listScrollHeight, setListScrollHeight] = useState<string>("0px"); // 联系人列表的高度
  const [tolistScrollView, setTolistScrollView] = useState(""); // 点击右侧索引列表要跳至的key

  const list = [
    {
      title: "A",
      key: "A",
      items: [
        {
          name: "阿丹",
          value: "alist1",
          label: "阿丹",
          // 此处可加其他业务字段
        },
        {
          name: "阿瑶",
          value: "alis2",
          label: "阿瑶",
        },
      ],
    },
    {
      title: "B",
      key: "B",
      items: [
        {
          name: "白百合",
          value: "blist1",
          label: "白百合",
        },
        {
          name: "白举纲",
          value: "blist2",
          label: "白举纲",
        },
      ],
    },
    {
      title: "D",
      key: "D",
      items: [
        {
          name: "迪丽热巴",
          value: "dlist1",
          label: "迪丽热巴",
        },
        {
          name: "邓紫棋",
          value: "dlist2",
          label: "邓紫棋",
        },
      ],
    },
    {
      title: "E",
      key: "E",
      items: [
        {
          name: "Eason ",
          value: "elist1",
          label: "Eason ",
        },
        {
          name: "EXO",
          value: "elist2",
          label: "EXO",
        },
      ],
    },
    {
      title: "F",
      key: "F",
      items: [
        {
          name: "范冰冰",
          value: "flist1",
          label: "范冰冰",
        },
        {
          name: "冯绍峰",
          value: "flist2",
          label: "冯绍峰",
        },
      ],
    },
    {
      title: "G",
      key: "G",
      items: [
        {
          name: "高圆圆",
          value: "glist1",
          label: "高圆圆",
        },
        {
          name: "郭德纲",
          value: "glist2",
          label: "郭德纲",
        },
      ],
    },
    {
      title: "H",
      key: "H",
      items: [
        {
          name: "黄晓明",
          value: "hlist1",
          label: "黄晓明",
        },
        {
          name: "胡歌",
          value: "hlist2",
          label: "胡歌",
        },
      ],
    },
    {
      title: "J",
      key: "J",
      items: [
        {
          name: "井柏然",
          value: "jlist1",
          label: "井柏然",
        },
        {
          name: "金秀贤",
          value: "jlist2",
          label: "金秀贤",
        },
      ],
    },
    {
      title: "K",
      key: "K",
      items: [
        {
          name: "孔连顺",
          value: "klist1",
          label: "孔连顺",
        },
        {
          name: "昆凌",
          value: "klist2",
          label: "昆凌",
        },
      ],
    },
    {
      title: "N",
      key: "N",
      items: [
        {
          name: "那英",
          value: "nlist1",
          label: "那英",
        },
        {
          name: "宁静",
          value: "nlist2",
          label: "宁静",
        },
      ],
    },
    {
      title: "O",
      key: "O",
      items: [
        {
          name: "欧豪",
          value: "olist1",
          label: "欧豪",
        },
        {
          name: "欧阳娜娜",
          value: "olist2",
          label: "欧阳娜娜",
        },
      ],
    },
    {
      title: "S",
      key: "S",
      items: [
        {
          name: "宋仲基",
          value: "slist1",
          label: "宋仲基",
        },
        {
          name: "孙俪",
          value: "slist2",
          label: "孙俪",
        },
      ],
    },
    {
      title: "W",
      key: "W",
      items: [
        {
          name: "吴亦凡",
          value: "wlist1",
          label: "吴亦凡",
        },
        {
          name: "王俊凯",
          value: "wlist2",
          label: "王俊凯",
        },
      ],
    },
    {
      title: "Y",
      key: "Y",
      items: [
        {
          name: "杨超越",
          value: "ylist1",
          label: "杨超越",
        },
        {
          name: "杨洋",
          value: "ylist2",
          label: "杨洋",
        },
      ],
    },
  ];

  const [searchList, setSearchList] = useState(list);
  const [allSelectListValue, setAllSelectListValue] = useState<any>([]); // 存储所有的联系人的选中值value
  let allListKey: Array<string> = []; // 存储所有的联系人所在的key分类
  const [allValueInItem, setAllValueInItem] = useState({}); // 存储所有的选中联系人value所在的item
  const allSelectList = [
    {
      title: "ALL",
      key: "ALL",
      items: [
        {
          name: "全选",
          value: "all",
          label: "全选",
          key: "all",
        },
      ],
    },
  ];
  const listContact = searchList.map((_item, i) => {
    return (
      <View className="contact-item-name" key={i}>
        <View key={i + "title"} className="contact-item-title" id={_item.key}>
          {_item.key}
        </View>
        <AtCheckbox
          options={_item.items}
          key={i + "name"}
          selectedList={checkedList}
          onChange={(val) => setCheckedList(val)}
        />
      </View>
    );
  });

  useEffect(() => {
    setTimeout(() => {
      Taro.createSelectorQuery()
        .selectAll(".contact-list-name")
        .boundingClientRect(function (rects) {
          setListScrollHeight(`${rects[0].height}px`);
        })
        .exec();
    }, 100);
  }, [searchList]);

  // 其他页面过来判断是否带参
  useDidShow(() => {
    const pages = Taro.getCurrentPages();
    const prevPage = pages[pages.length - 2]; //上一个页面
    const prevPageName = prevPage.data.query ? (prevPage.data.query.takePartInPerson || '') : ''
    const prevPageNameArr = prevPageName.split('，')
    let getCheckedList:Array<string> = []
    const allValueInItemObj = {}
    const allSelectListValueObj:Array<string> = []
    let checkLen = 0
    list.map((allItem) => {
      allListKey.push(allItem.key);
      if (allItem.items.length) {
        allItem.items.forEach((v) => {
          allSelectListValueObj.push(v.value);
          allValueInItemObj[v.value] = v
          if(prevPageNameArr.indexOf(v.label) > -1){
            getCheckedList.push(v.value)
            checkLen = checkLen+=1
          }
        });
      }
    });
    setAllValueInItem(allValueInItemObj) // 存储所有的选中联系人value所在的item
    setAllSelectListValue(allSelectListValueObj) // 存储所有的联系人的选中值value
    setCheckedList(getCheckedList) // 设置联系人列表选中
    if(allSelectListValueObj.length === checkLen){ // 设置联系人是否全选
      setCheckedAllListx(['all']);
    }
  })

  // 联系人全选
  function setCheckedAllList(val) {
    setCheckedList(val.length ? allSelectListValue : []);
    setCheckedAllListx(val);
  }

  // 搜索联系人
  function searchName(val) {
    setName(val);
    const filItemList = list
      .map((filItem, filIndex) => {
        const arr = filItem.items.filter((secItem, secIndex) => {
          if (secItem.label.search(val) === -1) {
            return false;
          }
          return true;
        });
        filItem.items = arr;
        return filItem;
      })
      .filter((v, i) => {
        return !!v.items.length;
      });
    setSearchList(filItemList);
  }

  // 点击完成返回预约会议
  function goMeetingReserve() {
    var pages = Taro.getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    let nameText = ''
    checkedList.forEach((it, id) => {
      const pot = id ? '，' : ''
      nameText += (pot + allValueInItem[it].label)
    })
    //直接使用上一个页面的data，把数据存到上一个页面中去
    prevPage.data.query = {
      takePartInPerson: nameText,
    };
    Taro.navigateBack({
      delta: 1,
    });
    // Taro.navigateTo(gennerateTaroNavigateParams("meetingReserve", {}));
  }

  // 点击展示key所对应的联系人
  function toShowViewOfKey(e) {
    setTolistScrollView(e);
  }

  return (
    <View className="contact-page">
      {/* 联系人搜索栏 */}
      <View className="contact-input-name">
        <AtInput
          name="value"
          type="text"
          placeholder="搜索联系人"
          placeholderClass="placeholder-class"
          // placeholderStyle="color: red;font-size:12px;"
          value={name}
          onChange={(val) => searchName(val)}
        />
      </View>
      {/* end 联系人搜索栏 */}
      {/* 联系人全选栏 */}
      <View className="contact-all-name">
        {allSelectList.map((_item, i) => {
          return (
            <AtCheckbox
              options={_item.items}
              key={i + "all"}
              selectedList={checkedAllList}
              onChange={(val) => setCheckedAllList(val)}
            />
          );
        })}
        <View className="contact-all-name-title">
          已选（{checkedList.length}）
        </View>
      </View>
      {/* end 联系人全选栏 */}
      {/* 联系人滚动列表 */}
      <View className="contact-list-name" id="contactScrollView">
        <ScrollView
          className="contact-list-name-scroll_view"
          scrollY
          scrollIntoView={tolistScrollView}
          style={{ height: listScrollHeight }}
        >
          {listContact}
        </ScrollView>
      </View>
      {/* end 联系人滚动列表 */}
      {/* 右侧索引列 */}
      <View className="contact-leter-name">
        <LetterList allListKey={allListKey} showViewOfKey={toShowViewOfKey} />
      </View>
      {/* end 右侧索引列 */}
      {/* 选择联系人完成按钮 */}
      <View className="contact-leter-btn">
        <AtButton
          type="primary"
          disabled={!checkedList.length}
          onClick={goMeetingReserve}
        >
          完成
        </AtButton>
      </View>
      {/* end 选择联系人完成按钮 */}
    </View>
  );
};

export default Index;
