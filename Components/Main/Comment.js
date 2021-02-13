import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Button, TextInput } from 'react-native'

import firebase from 'firebase'
require('firebase/firestore')


export default function Comment(props) {
    const [customElements, setComments] = useState([])
    const [postId, setPostId] = useState('')
    const [text, setText] = useState('')

    useEffect(() => {

        if (props.routes.params.postId !== postId) {
            firebase.firestore
                .collection('posts')
                .doc(props.routeparams.uid)
                .collection('userPost')
                .doc(props.routes.params.postId)
                .collection('comments')
                .get()
                .then(snapshot => {
                    let comments = snapshot.docs.map(doc => {
                        const data = doc.data()
                        const id = doc.id
                        return { id, ...data }
                    })
                    setComments(comments)
                })
                setPostId(props.routes.params.postId)
        }

    }, [props.routes.params.postId])

    const onCommentSend = () => {
        firebase.firestore
                .collection('posts')
                .doc(props.routeparams.uid)
                .collection('userPost')
                .doc(props.routes.params.postId)
                .collection('comments')
                .add({
                    crerator: firebase.auth().currentUser.uid,
                    text
                })
    }


    return (
        <View>
            <FlatList
                num={1}
                horizontal={false}
                data={comments}
                renderItem={({item}) => (
                    <View>
                        <Text>
                            {item.text}
                        </Text>
                    </View>

                )}
            />
            <View>
                <TextInput
                    placeholder='Write a comment...'
                    onChangeText={(text) => setText(text)}
                />
                <Button
                    onPress={() => onCommentSend()}
                    title='Send'
                />
            </View>
        </View>
    )
}
