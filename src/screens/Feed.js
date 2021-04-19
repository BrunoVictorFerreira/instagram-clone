import React, { useState } from "react"
import {
    StyleSheet,
    FlatList,
    View
} from "react-native"
import {connect} from "react-redux"
import Header from "./../components/Header"
import Post from "./../components/Post"

const Feed = props => {
    return (
        <View style={styles.container}>
            <Header />
            <FlatList 
                data={props.posts}
                keyExtractor={item => `${item.id}`}
                renderItem={({item}) => 
                    <Post key={item.id} {...item} />
                }
                />
        </View>
    )
}


const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff"
    }
})

const MapStateToProps = state => {
    return {
        posts: state.posts.posts
    }
}

export default connect(MapStateToProps)(Feed)