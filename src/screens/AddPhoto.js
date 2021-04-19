import React, { useState, useEffect } from "react"
import {
    View,
    Text, StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    Platform,
    ScrollView,
    Alert,
    DrawerLayoutAndroidComponent
} from "react-native"
import {connect} from "react-redux"
import {addPost} from "../store/actions/posts"
import * as ImagePicker from "react-native-image-picker"

const noUser = "Você precisa estar logado para adicionar imagens"

const AddPhoto = (props) => {
    const [image, setImage] = useState(null)
    const [comment, setComment] = useState("")

    const pickImage = () => {
        if(!props.name){
            Alert.alert("Falha!", noUser)
            return
        }
        ImagePicker.launchImageLibrary({
            mediaType: "photo",
            maxWidth: 600,
            maxHeight: 800,
            includeBase64:true
        }, res => {
            if (!res.didCancel) {
                setImage({ uri: res.uri, body: res.base64 })
            }
        })
    }

    const save = async () => {
        if(!props.name){
            Alert.alert("Falha!", noUser)
            return
        }
        props.onAddPost({
            id: Math.random(),
            nickname: props.name,
            email: props.email,
            image,
            comments: [{
                nickname: props.name,
                comment
            }]
        })

        setComment("")
        setImage(null)
        props.navigation.navigate("Feed")
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Compartilhe uma imagem</Text>
                <View style={styles.imageContainer}>
                    <Image source={image} style={styles.image} />
                </View>
                <TouchableOpacity onPress={pickImage} style={styles.button}>
                    <Text style={styles.buttomText}>Escolha a foto</Text>
                </TouchableOpacity>
                <TextInput
                    placeholder="Algum comentario para a foto?"
                    style={styles.input}
                    value={comment}
                    editable={props.name != null}
                    onChangeText={comment => setComment(comment)}
                />
                <TouchableOpacity style={styles.button} onPress={save}>
                    <Text style={styles.buttomText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container :{
        flex: 1,
        alignItems: "center",
    },
    title : {
        fontSize: 20,
        marginTop: Platform.OS === "ios" ? 30 : 10,
        fontWeight: "bold"
    },
    imageContainer : {
        width: "90%",
        height: Dimensions.get("window").width / 2,
        backgroundColor: "#EEE",
        marginTop: 10
    },
    image: {
        width: "100%",
        height: Dimensions.get("window").width / 2,
        resizeMode : "center"
    },
    button : {
        marginTop: 30,
        padding: 10,
        backgroundColor: "#4286f4"
    },
    buttomText: {
        fontSize: 20,
        color: "#FFF",
    },
    input : {
        marginTop: 20,
        width: "90%"
    }
})

const MapStateToProps = state => {
    return {
        email: state.user.email,
        name: state.user.name,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPost: post => dispatch(addPost(post))
    }
}

export default connect(MapStateToProps, mapDispatchToProps)(AddPhoto)