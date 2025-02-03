import React, { useState, useRef } from "react";

import {
    SafeAreaView,
    View,
    Text,
    ImageBackground,
    Image,
    Switch,
    TouchableOpacity,
    StatusBar,
    ScrollView
} from 'react-native';

// Styles
import { Styles } from "./Login,style";

import { TextInput } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

export function Login({navigation, route}){

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [hidePassword, setHidePassword] = useState(true);

    const passwordRef = useRef();

    const [rememberMe, setRememberMe] = useState(false);

    const loginImage = require('../../assets/loginImage.jpg');
    const cpsLogo = require('../../assets/cpsIcon.png');

    function submitCredentials(email, password){
        console.log('submit credencials');
        console.log('Email: ', email);
        console.log('Password: ', password);
    }

    return(
        <SafeAreaView style = {{ backgroundColor: 'red', flex: 1 }}>
            <StatusBar translucent backgroundColor="transparent" />
            <ImageBackground
                source = { loginImage } // Caminho da imagem
                style = { Styles.background }
                resizeMode = "cover"
            >
                <View
                    style = { Styles.logotipoContainer }
                >
                    
                    <View
                        style = {{flex: 1, borderColor: '#FFFFFF', borderRightWidth: 2, justifyContent: 'center', alignItems: 'center'}}
                    >
                        <Image source = { cpsLogo } style = { Styles.cpsLogotipo }/>
                    </View>
                    <View 
                        style = { Styles.cpsLabelContainer }
                    >
                        <Text
                            style = { Styles.cpsLabel }
                        >
                            Centro{'\n'}
                            Paula Souza
                        </Text>
                    </View>
                </View>
                <View style = { Styles.loginFormContainer }>
                <ScrollView>
                    <Text style = { Styles.loginTitle }>Login</Text>
                    <TextInput
                        activeUnderlineColor="#690000"
                        style = { Styles.textInput }
                        label = { "Email" }
                        value = { emailInput }
                        onChangeText = { text => setEmailInput(text) }
                        returnKeyType="next"
                        onSubmitEditing = { () => passwordRef.current.focus() }
                        blurOnSubmit = { false }
                    />
                    <View
                        style = { Styles.passwordContainer }
                    >
                        <TextInput
                            ref = { passwordRef }
                            secureTextEntry = { hidePassword }
                            activeUnderlineColor="#690000"
                            style = { Styles.textInput }
                            contentStyle = {{ paddingRight: 70 }}
                            label = { "Senha" }
                            value = { passwordInput }
                            onChangeText = { text => setPasswordInput(text) }
                            onSubmitEditing = { () => submitCredentials(emailInput, passwordInput) }
                        />
                        <TouchableOpacity
                            onPress = { () => {
                                setHidePassword( prev => !prev );
                            }}
                            style = { Styles.hidePassButtonContainer }
                        >
                            <Text>O</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style = { Styles.rememberMeContainer }
                    >
                        <Switch
                            trackColor = {{ false: '#A49C9C', true: '#B70E0E' }}
                            thumbColor = { rememberMe ? '#F4F3F4' : '#F4F3F4' }
                            onValueChange = { () => setRememberMe( prev => !prev ) }
                            value = { rememberMe }
                        />
                        <Text>Lembrar de mim</Text>
                    </View>
                    <TouchableOpacity
                        style = { Styles.submitButton }
                        onPress = { () => {
                            submitCredentials(emailInput, passwordInput);
                        }}
                    >
                        <Text
                            style = { Styles.submitButtonLabel }
                        >Entrar</Text>
                    </TouchableOpacity>
                    <View
                        style = { Styles.solutionsContainer }
                    >
                        <TouchableOpacity
                            onPress = { () => {
                                console.log("soluções");
                            }}
                        >
                            <Text
                                style = { Styles.solutionsButtonLabel }
                            >soluções </Text>
                        </TouchableOpacity>
                        <Text>para problemas de acesso</Text>
                    </View>
                    </ScrollView>
                </View>
            </ImageBackground>  
        </SafeAreaView>
    )
}