import React, {useState} from "react"
import {connect} from "react-redux"
import {addComment} from "../store/actions/posts"
import {
    View, 
    Text,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback as TWF
} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"

const AddComment = props => {
    const [comment, setComment] = useState("")
    const [editMode, setEditMode] = useState(false)
    
    handleAddComment = () => {
        props.onAddComment({
            postId: props.postId,
            comment: {
                nickname: props.name,
                comment
            }
        })

        setComment("")
        setEditMode(false)
    }
    
    let commentArea = null
    if(editMode){
        commentArea = (
            <View style={styles.container}>
                <TextInput 
                    placeholder="Pode Comentar." 
                    style={styles.input} 
                    value={comment} 
                    autoFocus={true}
                    onChangeText={comment => setComment(comment)}
                    onSubmitEditing={handleAddComment}
                />
                <TWF onPress={() => setEditMode(false)}>
                    <Icon name="times" size={15} color="#555"/>
                </TWF>
            </View>
        )
    }else{
        commentArea = (
            <TWF onPress={() => setEditMode(true)}>
                <View style={styles.container}>
                    <Icon name="comment-o" size={25} color="#555"/>
                    <Text style={styles.caption} >Adicione um comentário...</Text>
                </View>
            </TWF>
        )
    }
    return (
        <View style={{flex: 1}}>
            {commentArea}
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        margin: 10
    },
    caption : {
        marginLeft: 10,
        fontSize: 12,
        color: "#ccc"
    },
    input: {
        width: "90%"
    }
})

const MapStateToProps = state => {
    return {
        name: state.user.name
    }
}

const MapDispatchToProps = dispatch => {
    return {
        onAddComment: payload => dispatch(addComment(payload))
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(AddComment)