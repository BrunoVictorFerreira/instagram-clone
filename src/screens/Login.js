import React, {useState} from "react"
import {
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from "react-native"
import {connect} from "react-redux"
import {login, logout} from "../store/actions/user"

const Login = props => {
    const [name, setName] = useState("Temporario")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = () => {
        props.onLogin({name, email, password})
        props.navigation.replace("Profile")
    }

    return (
        <View style={styles.container}>
            <TextInput placeholder="Email" 
            style={styles.input} 
            autoFocus={true}
            keyboardType="email-address"
            value={email}
            onChangeText={email => setEmail(email)}
            />
            <TextInput placeholder="Senha" 
            style={styles.input} 
            secureTextEntry={true}
            value={password}
            onChangeText={password => setPassword(password)} />

            <TouchableOpacity onPress={() => {login()}} style={styles.button} >
                <Text style={styles.buttomText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate("Register")
            }} style={styles.button} >
                <Text style={styles.buttomText}>Criar nova conta...</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        marginTop: 30,
        padding: 10,
        backgroundColor: "#4286f4"
    },
    buttomText: {
        fontSize: 20,
        color: "#FFF"
    },
    input : {
        marginTop: 20,
        width: "90%",
        backgroundColor: "#EEE",
        height: 40,
        borderWidth: 1,
        borderColor: "#333"
    },
})

const MapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch(login(user))
    }
}

export default connect(null, MapDispatchToProps)(Login)