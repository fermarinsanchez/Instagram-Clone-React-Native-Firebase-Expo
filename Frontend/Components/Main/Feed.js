import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
require('firebase/firestore')


function Feed(props) {

    const [posts, setPosts] = useState([])


    useEffect(() => {

        if (props.usersFollowingLoaded === props.following.length && props.following.length !== 0) {

            props.feed.sort((x, y) => {
                return x.creation - y.creation
            })
            setPosts(props.feed)
        }

    }, [props.usersFollowingLoaded, props.feed])

    const onLikePress = (user.id, postId) => {
        firebase.firestore()
            .collection('posts')
            .doc(uid)
            .collection('userPosts')
            .doc(postId)
            .collection('likes')
            .doc(firebase.auth().currentUser.uid)
            .set({})
    }

    const onDislikeLikePress = (user.id, postId) => {
        firebase.firestore()
            .collection('posts')
            .doc(uid)
            .collection('userPosts')
            .doc(postId)
            .collection('likes')
            .doc(firebase.auth().currentUser.uid)
            .delete()
    }

    return (
        <View style={styles.container}>
            <FlatList
                numColumns={1}
                horizontal={false}
                data={posts}
                renderItem={({ item }) => (
                    <View style={styles.containerImage}>
                        <Text style={styles.container}>{item.user.name}</Text>
                        <Image
                            style={styles.image}
                            source={{ uri: item.downloadURL }}
                        />
                        {item.currentUSerLike ?
                            (
                                <Button
                                    title='Dislike'
                                    onPress={() => onDislikeLikePress(item.user.uid, id)}
                                />
                            )
                            :
                            <Button
                                title='Like'
                                onPress={() => onLikePress(item.user.uid, id)}
                            />
                        }
                        <Text onPress={() => props.navigation.navigate('Comment', { postId: item.id, uid: item.user.uid })}>View Comments...</Text>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1
    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1
    },
    containerImage: {
        flex: 1 / 3
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    feed: store.usersState.feed,
    usersFollowingLoaded: store.usersState.usersFollowingLoaded
})

export default connect(mapStateToProps, null)(Feed) 