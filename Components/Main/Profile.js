import React from 'react'
import { StyleSheet, View, Text, Image, FlatList } from 'react-native'
import { connect } from 'react-redux'


function Profile(props) {
    const { currentUser, posts } = props
    console.log('FROM PROFILE: ', { currentUser, posts })
    return (
        <View style={styles.container}>
            <Text style={styles.containerInfo}>
                {currentUser.name}
            </Text>
            <Text style={styles.containerInfo}>
                {currentUser.email}
            </Text> 
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item }) => (
                        <View style={styles.containerImage}>
                            <Image
                                style={styles.image}
                                source={{ uri: item.downloadURL }}
                            />
                        </View>

                    )}
                />
            </View>
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
        flex: 1/3
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts
})

export default connect(mapStateToProps, null)(Profile) 