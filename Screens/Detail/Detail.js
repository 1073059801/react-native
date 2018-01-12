
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    Dimensions,
    Image
} from 'react-native';

import { Button, Carousel} from 'antd-mobile';
const width = Dimensions.get("window").width

export default class Detail extends Component<{}> {
    // static navigationOptions = ({navigation})=>(
    //     {
    //         title: navigation.state.params.title
    //     }
    // )
    static navigationOptions = {
        title:"详情"
      }
    constructor(props){
        super(props)
        this.state = {
            pic:[],
            text:[],
            pics:[]
        }
    }
    render() {
        // Alert.alert(
        //     "navigation state",
        //     JSON.stringify(this.props.navigation),
        //     [{text:"按钮",onPress: () => console.log('OK Pressed!')}]
        //     )
        const { pic, text, pics } = this.state
        return (
            <View>
               
                <Carousel
                    autoplay={false}
                    infinite
                    selectedIndex={1}
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                    >
                    {this.state.pic.map(val => (
                        <View
                        key={val}
                        style={{width:width,height:300 }}
                        >
                        <Image
                            source={{uri:`${val}`}}
                            style={{width:width,height:300 }}
                        />
                        </View>
                    ))}
                </Carousel>
                <Text>{text.title}</Text>
                <Text>生产地址：{text.shipping_origin}</Text>
                <Text style={styles.text}>￥{text.cprice}</Text>
                <View>
                    {
                        this.state.pics.map((ele,index)=>{
                            <Image 
                                source={{uri:{ele}}}
                                style={{width:width,height:300 }}
                            />
                        })
                    }
                </View>
            </View>
        )
    }
    componentDidMount(){
        const id = this.props.navigation.state.params.id
        //获取数据
        fetch("https://webservice.juanpi.com/api/getDetailFirst?goods_id="+id).then(res=>res.json()).then(data=>{
            var pic = data.goodImages
            var text = data.baseInfo
            var pics = data.goodsDetail.images
            this.setState({
                pic,
                text,
                pics
            })
        })
      }
}

const styles = StyleSheet.create({
    text:{
        color:'red',
    }
})

// 获取窗口宽度，实现百分比布局  const width = Dimensions.get("window").width;
// antd-mobile 使用  "https://github.com/ant-design/antd-mobile-samples/tree/master/create-react-native-app"
// (注意：antd-mobile部分组件不支持react-native，需要对demo里面的 标签进行修改  )
// 轮播组件  react-native-swiper


// 窗口管理 (react-navigation)
// StackNavigator({Home:{screen:Home}}，{配置项（设置默认窗口，header,样式）})
// TabNavigator({Home:{screen:Home}},{配置项}) //实现tab切换
//const App =   StackNavigator({Tabs{screen:Home}}) //嵌套 Tabs
//路由参数获取  this.props.navigator ：{state(状态，参数),navigate(跳转的方法)}