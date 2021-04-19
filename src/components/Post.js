import React from "react"
import {    
    StyleSheet,
    Image,
    Dimensions,
    View
} from "react-native"
import {connect} from "react-redux"
import Author from "./Author"
import Comments from "./Comments"
import AddComment from "./AddComment"

const Post = props => {
    const addComment = props.name ? <AddComment postId={props.id}/> : null
    return (
        <View style={styles.container}>
            <Image source={props.image} style={styles.image}/>
            <Author email={props.email} nickname={props.nickname} />
            <Comments comments={props.comments} />
            {addComment}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image : {
        width : Dimensions.get('window').width,
        height: Dimensions.get('window').width * 3 / 4,
        resizeMode: "contain"
    }
})

const MapStateToProps = state => {
    return {
        name: state.user.name
    }
}

export default connect(MapStateToProps)(Post)