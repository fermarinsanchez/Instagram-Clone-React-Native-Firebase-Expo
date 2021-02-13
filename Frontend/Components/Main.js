import React, { Component } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { View } from 'react-native'
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'firebase'


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, fetchUserPost,fetchUserFollowing, clearData } from '../redux/actions/index'

import FeedScreen from './Main/Feed'
import ProfileScreen from './Main/Profile'
import SearchScreen from './Main/Search'

const Tab = createMaterialBottomTabNavigator()

const EmptyScreen = () => {
    return (null)
}

export class Main extends Component {

    componentDidMount() {
        this.props.clearData()
        this.props.fetchUser()
        this.props.fetchUserPost()
        this.props.fetchUserFollowing()
    }

    render() {
        const { currentUser } = this.props
        if (currentUser == undefined) {
            return (
                <View></View>
            )
        }
        return (
            <Tab.Navigator initialRouteName='Feed' labeled={false} >
                <Tab.Screen
                    name='Feed'
                    component={FeedScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialComunityIcons name='home' color={color} size={26} />
                        )
                    }}
                />
                <Tab.Screen
                    name='Search'
                    component={SearchScreen}
                    navigation={this.props.navigation}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialComunityIcons name='magnify' color={color} size={26} />
                        )
                    }}
                />
                <Tab.Screen
                    name='AddContainer'
                    component={EmptyScreen}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault()
                            navigation.navigate('Add')
                        }
                    })}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialComunityIcons name='plus-box' color={color} size={26} />
                        )
                    }}
                />
                <Tab.Screen
                    name='Profile'
                    component={ProfileScreen}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault()
                            navigation.navigate('Profile', { uid: firebase.auth().currentUser.uid })
                        }
                    })}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialComunityIcons name='account-circle' color={color} size={26} />
                        )
                    }}
                />
            </Tab.Navigator>
        )
    }

}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchUserPost, fetchUserFollowing, clearData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
