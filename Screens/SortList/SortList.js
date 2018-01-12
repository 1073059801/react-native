
import React, { Component } from 'react';
import {
  Text,
  View,
  Alert,
  Dimensions,
  Image
} from 'react-native';

import { Button, Carousel} from 'antd-mobile';
const width = Dimensions.get("window").width

export default class SortList extends Component<{}> {
    state = {
        data: ['1', '2', '3'],
        imgHeight: 176,
        slideIndex: 0,
      }
      componentDidMount() {
        // simulate img loading
        setTimeout(() => {
          this.setState({
            data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
          });
        }, 100);
      }
    render(){
        return(
            <View>
                <Text>list</Text>
                <Button>antd-mobile button</Button>
                <Carousel
                    autoplay={false}
                    infinite
                    selectedIndex={1}
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                    >
                    {this.state.data.map(val => (
                        <View
                        key={val}
                        style={{width:width,height:300 }}
                        >
                        <Image
                            source={{uri:`https://zos.alipayobjects.com/rmsportal/${val}.png`}}
                            style={{width:width,height:300 }}
                        />
                        </View>
                    ))}
                </Carousel>
            </View>
        );
    }
}