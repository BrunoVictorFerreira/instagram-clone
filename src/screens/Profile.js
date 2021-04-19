import React from "react"
import {connect} from "react-redux"
import {logout} from "./../store/actions/user"
import {
    View,
    Text, 
    StyleSheet,
    TouchableOpacity
} from "react-native"

import {Gravatar} from "react-native-gravatar"

const Profile = (props) => {
    const logout = () => {
        props.onLogout()
        props.navigation.replace("Auth")
    }

    const options = {email : props.email,name: props.name, secure: true}

    return (
        <View style={styles.container}>
            <Gravatar options={options} style={styles.avatar} />
            <Text style={styles.nickname}>{options.name}</Text>
            <Text style={styles.email}>{options.email}</Text>
            <TouchableOpacity onPress={logout} style={styles.button}>
                <Text style={styles.buttomText}>Sair</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: "center"
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: 100,

    }, 
    nickname: {
        marginTop: 30,
        fontSize: 30,
        fontWeight: "bold"
    },
    email: {
        marginTop: 20,
        fontSize: 25
    },
    button : {
        marginTop: 30,
        padding: 10,
        backgroundColor: "#4289f4"
    },
    buttomText: {
        fontSize: 20,
        color: "#FFF"
    }
})

const MapStateToProps = state => {
    return {
        email: state.user.email,
        name: state.user.name
    }
}

const MapDispatchToProps = dispatch => {
    return {
        onLogout : () => dispatch(logout())
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(Profile)