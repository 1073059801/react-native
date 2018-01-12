import Home from "./Screens/Home/Home"
import Detail from "./Screens/Detail/Detail"
import Cart from "./Screens/Cart/Cart"
import SortList from "./Screens/SortList/SortList"
import User from "./Screens/User/User"
import User from "./Screens/User/User"
import User from "./Screens/User/User"
import User from "./Screens/User/User"



import { StackNavigator,TabNavigator  } from "react-navigation"
import HeaderTitle from "react-navigation/src/views/Header/HeaderTitle";

const Tabs = TabNavigator ({
  Home:{
    screen:Home
  },
  SortList:{
    screen:SortList,
    navigationOptions :{
      title:"分类列表"
    }
  },
  Cart:{
    screen:Cart,
    navigationOptions :{
      title:"购物车"
    }
  },
  User:{
    screen:User,
    navigationOptions :{
      title:"我的"
    }
  },
  // Detail:{
  //   screen:Detail
  // },
}, {
  initialRouteName : 'Home',
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
    labelStyle: {
      fontSize: 12,
    },
    tabStyle: {
      width: 100,    
    },
    style: {
      backgroundColor: '#666',
    },
  },
  navigationOptions:({navigation})=>({
    title:navigation.state.routeName,
    headerTitleStyle:{alignSelf:'center'} //让标题居中
  })
})

const App = StackNavigator({
  Tabs:{
    screen:Tabs
  },
  Detail:{
    screen:Detail
  }
})

export default App