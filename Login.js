import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput } from 'react-native'



const styles = StyleSheet.create({
    input: {
      margin: 20,
      height: 40,
      borderColor: 'black',
      borderWidth: 1, 
      paddingLeft: 10
    },
  });

const Login = ({ navigation }) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        if (username === 'elias' && password === '1234') {
            navigation.navigate('Home');
        }
    }

    return (
        <View>
            <Text>Login Page</Text>

            <TextInput
                style={styles.input}
                value={username}
                placeholder='Enter your Username'
                onChangeText={text => setUserName(text)}
            />

            <TextInput
                style={styles.input}
                value={password}
                secureTextEntry={true}
                placeholder='Enter your Password'
                onChangeText={text => setPassword(text)}
            />

            <Button title="Login" onPress={login}/>
        </View>
    )
}

export default Login
