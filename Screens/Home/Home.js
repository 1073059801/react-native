/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppRegistry,
  Image,
  ScrollView,
  ListView,
  Alert,
  RefreshControl,
  navigationOptions,
  TouchableOpacity,
  Button,
  Dimensions
} from 'react-native';
const {width,height} = Dimensions.get('window')

  // var thisData = [
  //   {
  //     'img':require('../images/desktop_1.jpg'),
  //     'name':'one'
  //   },
  //   {
  //      'img':require('../images/desktop_2.jpg'),
  //      'name':'two'
  //   },
  //   {
  //      'img':require('../images/desktop_3.jpg'),
  //      'name':'three'
  //   },
  //   {
  //      'img':require('../images/desktop_4.jpg'),
  //      'name':'four'
  //   }
  // ]

export default class App extends Component<{}> {
  static navigationOptions = {
    title:"首页",
    headerRight: (
      <Button
        title="hello"
        onPress={() => {Alert.alert("跳转","hello woder")}}
      />
    )
  }
   constructor(props){
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    this.state = {
      dataSource:ds.cloneWithRows([]), //ds 数据
      listData:[], //后端数据
      refreshing:false 
    }
  }
    
  render() {
      const {listData,refreshing} = this.state
      const {navigate} = this.props.navigation;
      //用 ds 数据 对后端数据进行包装
      const dataSource = this.state.dataSource.cloneWithRows(listData)
    return (    
      <View style={styles.body}>
        {/* <View style={styles.header}>
            <Text style={styles.header_text}>头部</Text>
          </View> */}
         
         <View style={styles.content}>
          <ListView
         contentContainerStyle={styles.commodity}
          dataSource={dataSource}
          onEndReached={()=>{Alert.alert("提示","加载更多",[{text: 'OK', onPress: () => console.log('OK Pressed!')}])}}
          refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={()=>{
              //下拉刷新，先让刷的loading 显示
              this.setState({
                refreshing:true
              })
              setTimeout(()=>{
                //5秒后，loading隐藏
                this.setState({
                  refreshing:false
                })
              },2000)
            }}
           />}
          renderRow={(rowData)=>{
            return (
            <View style={styles.juanpi}>
                  <TouchableOpacity onPress={()=>{
                    navigate("Detail",{id:rowData.goods_id,title:rowData.title})
                    }}>
                    <Image 
                      source={{uri:rowData.pic_url}}
                      style={styles.img} 
                    />
                    <Text style={styles.con_text}>{rowData.title_long}</Text>
                  </TouchableOpacity>
            </View>
            )
           
          }}
          />
         {/* <View style={styles.commodity}>
         循环数据， 输出数据
           {
              listData.map((ele, index)=>{
                return (
                  <View style={styles.juanpi} key={ele.goods_id}>
                      <Image 
                       source={{uri:ele.pic_url}}
                       style={styles.img} 
                      />
                      <Text style={styles.con_text}>{ele.title_long}</Text>
                  </View>
                )
              })
            }
          </View> */}
          {/* <Image source={{uri:'http://img.taopic.com/uploads/allimg/120727/201995-120HG1030762.jpg'}} style={styles.img} />
          <Image source={require('./images/desktop_2.jpg')} style={styles.img}/> */}
            {/* {
              thisData.map((ele,index)=>{
               return (
                  <View key={ele.name}>
                      <Image source={ele.img} style={styles.img}/>
                      <Text style={styles.content_text}>{ele.name}</Text>
                  </View> 
                  )            
              })
            }
          <Text style={styles.content_text}>内容</Text> */}
          </View>
        <View style={styles.footer} >

          <View style={styles.footer1}>
            <Text style={styles.footer_text}>首页</Text>
          </View>

           <View style={styles.footer1}>
            <Text style={styles.footer_text}>分类</Text>
          </View>

           <View style={styles.footer1}>
            <Text style={styles.footer_text}>购物车</Text>
          </View>

           <View style={styles.footer1}>
            <Text style={styles.footer_text}>我的</Text>
          </View>
        </View>
      </View>
      
    );
  }
  //https://webservice.juanpi.com/api/getGoods?page=1&zy_ids=p8_c4_l4_0&app_name=zhe&catname=newest_zhe_jingxuandanpin&flag=tab_hpdp
 //接口处
  componentDidMount(){
    //宽 高
    // Alert.alert("title",width+"+"+height)
    fetch("https://webservice.juanpi.com/api/getGoods?page=1&zy_ids=p8_c4_l4_0&app_name=zhe&catname=newest_zhe_jingxuandanpin&flag=tab_hpdp").then(res=>res.json()).then(data=>{
      this.setState({
        // 接收数据
        listData:data.data.goods
      })
      //打印数据
      // Alert.alert(
      //   '标题',
      //   JSON.stringify(data),
      //   [
      //     {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
      //     {text: 'OK', onPress: () => console.log('OK Pressed!')},
      //   ]
      // )
    })
  }
}

const styles = StyleSheet.create({
  body:{
    height:567,
    width:384,
    display:'flex',
  },
  img:{
    width:width/2,
    height:150,
  },
  header:{
    width: 384,
    height: 40,
    backgroundColor: '#f66',
    
  },
  header_text:{
    color:'#fff',
    fontSize:30,
    textAlign:'center',
  },
  content:{
    flex:1,
    width: 384, 
    height: 100, 
    backgroundColor: '#eee',
  },
  commodity:{
    width:384,
    // backgroundColor:'red',
    display:'flex',
    flexDirection:"row",
    justifyContent: 'center',
    flexWrap:"wrap",
    alignItems: 'center',
  },
  con_text:{
    color:'#999',
    fontSize:16,
  },
  juanpi:{
    backgroundColor:'#fff',
    width:width/2,
    height:250,
    marginTop:10,
    borderColor:'#f66',
    borderWidth:1,
    borderStyle:'solid',
  },
  content_text:{
    color:'#333',
    fontSize:30,
  },
  footer:{
    height:50,
    width:384,
    backgroundColor:'#999',
    display:'flex',
    justifyContent:'space-around',
    flexDirection: 'row',
  },
  footer1:{
    width:96,
    height:50,
    
    backgroundColor:'#f66',

  },
  footer_text:{
   color:'#333',
    fontSize:16,
    textAlign:'center',
    lineHeight:50,
  }
});
