import React, { useState, useRef } from "react";

import {
    SafeAreaView,
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Linking,
    TextInput
} from 'react-native';

// Styles
import { styles } from "./Login.style";

// Components
import { CustomModal } from "../../compenents/CustomModal"; 

// Plugins
import Ionicons from "react-native-vector-icons/Ionicons";
import SwitchToggle from "react-native-switch-toggle";

export function Login({ navigation, route }){

    // Modal
    const [modalIsVisible, setModalIsVisible] = useState(false);

    // Email input
    const [emailInput, setEmailInput] = useState("");
    const [isEmailFocused, setIsEmailFocused] = useState(false);

    // Password input
    const [passwordInput, setPasswordInput] = useState("");
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);
    const passwordRef = useRef();

    // Remember me input 
    const [rememberMe, setRememberMe] = useState(false);

    // Top image
    const loginImage = require('../../assets/loginImage.jpg');
    const cpsLogo = require('../../assets/cpsIcon.png');

    function submitCredentials(email, password, rememberMe){
        console.log('Email: ', email);
        console.log('Password: ', password);
        navigation.navigate('Home', { email: email, password: password, rememberMe: rememberMe })
    }

    const ModalInstructionTile = (props) => {

        return(
            <View style = { styles.modalInstructionContainer }>
                <Text style = { styles.modalInstructionNumber }>{ props.number }</Text>
                <View style = { styles.modalInstructionBox }>
                    <Text style = {{ color: '#000000' }}>
                        { props.instructionLabel }
                    </Text>
                </View>
            </View>
        )
    }

    const handleEmailPress = () => {
        const email = 'daltonfrugoli7@gmail.com';
        const subject = 'Teste';
        const body = 'Olá, estou com um problema e gostaria de ajuda.';
        const mailtoUrl = `mailto:${ email }?subject=${ encodeURIComponent(subject) }&body=${ encodeURIComponent(body) }`;
        
        Linking.openURL(mailtoUrl).catch( err => console.error('Erro ao abrir e-mail:', err));
    };

    return(
        <SafeAreaView style = {{ flex: 1 }}>
            <StatusBar translucent backgroundColor = "transparent"/>
            <ImageBackground
                source = { loginImage } 
                style = { styles.background }
                resizeMode = "cover"
            >
                <View style = {{ width:'100%', flex: 1 }}>
                    <View style = { styles.headerContainer }>
                        <View style = { styles.cpsLogotipoContainer }>
                            <Image source = { cpsLogo } style = { styles.cpsLogotipo }/>
                        </View>
                        <View style = { styles.cpsLabelContainer }>
                            <Text style = { styles.cpsLabel }>
                                Centro{'\n'}
                                Paula Souza
                            </Text>
                        </View>
                    </View>
                <View style = { styles.loginFormContainer }>
                    <ScrollView showsVerticalScrollIndicator = { false }>
                        <Text style = { styles.titleLabel }>Login</Text>
                        <Text style = { styles.textInputLabel }>Email</Text>
                        <TextInput
                            style = {[ styles.textInput, isEmailFocused && { borderBottomColor: '#B70E0E' }]}
                            placeholder = "usuario2025@email.com"
                            onFocus = { () => setIsEmailFocused(true) }
                            onBlur = { () => setIsEmailFocused(false) }
                            value = { emailInput }
                            onChangeText = { setEmailInput }
                            returnKeyType = "next"
                            onSubmitEditing = { () => passwordRef.current.focus() } 
                        />
                        <View style = { styles.passwordContainer }>
                            <View>
                                <Text style = { styles.textInputLabel }>Senha</Text> 
                                <TextInput
                                    style = {[ styles.textInput, { paddingRight: 70 }, isPasswordFocused && { borderBottomColor: '#B70E0E' }]}
                                    placeholder = "***********"
                                    ref = { passwordRef }
                                    onFocus = { () => setIsPasswordFocused(true) }
                                    onBlur = { () => setIsPasswordFocused(false) }
                                    secureTextEntry = { hidePassword }
                                    label = { "Senha" }
                                    value = { passwordInput }
                                    onChangeText = { setPasswordInput }
                                    returnKeyType = "done"
                                    onSubmitEditing = { () => submitCredentials(emailInput, passwordInput, rememberMe) }
                                />
                            </View>
                            <TouchableOpacity
                                onPress = { () => setHidePassword(prev => !prev) }
                                style = { styles.hidePassButtonContainer }
                            >
                                <Ionicons name = { hidePassword ? "eye" : "eye-off" } style = { styles.hidePassButton }/>
                            </TouchableOpacity>
                        </View>
                        <View style = { styles.rememberMeContainer }>
                            <SwitchToggle 
                                switchOn = { rememberMe } 
                                onPress = { () => setRememberMe(!rememberMe) }
                                backgroundColorOn = '#B70E0E'
                                backgroundColorOff = '#747474'
                                circleColorOff = '#FFFFFF'
                                circleColorOn = '#FFFFFF'
                                containerStyle = {{
                                    width: 34,
                                    height: 18,
                                    borderRadius: 25,
                                    padding: 4,
                                }}
                                circleStyle={{
                                    width: 11,
                                    height: 11,
                                    borderRadius: 20,
                                }}
                            />
                            <Text style = {{ marginLeft: 10, color: '#747474' }}>Lembrar de mim</Text>
                        </View>
                        <TouchableOpacity
                            style = { styles.submitButton }
                            onPress = { () => {
                                submitCredentials(emailInput, passwordInput, rememberMe);
                            }}
                        >
                            <Text style = { styles.submitButtonLabel }>Entrar</Text>
                        </TouchableOpacity>
                        <View style = { styles.solutionsContainer }>
                            <TouchableOpacity
                                onPress = { () => {
                                    console.log("soluções");
                                    setModalIsVisible(true);
                                }}
                            >
                                <Text style = { styles.solutionsButtonLabel }>soluções </Text>
                            </TouchableOpacity>
                            <Text style = {{ color: '#747474' }}>para problemas de acesso</Text>
                        </View>
                    </ScrollView>
                </View>
                </View>
            </ImageBackground> 
            <CustomModal isVisible = { modalIsVisible } closeModal = { () => setModalIsVisible(false) }>
                <View style = { styles.solutionsModalContainer }>
                    <View style = { styles.solutionsModalContentContainer }>
                        <View style = {{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 15 }}>
                            <Text style = { styles.modalTitleLabel }>Não consegue fazer login?</Text>
                            <TouchableOpacity
                                onPress = { () => setModalIsVisible(false) }
                            >
                                <Ionicons style = {{ color: '#747474', marginLeft: 8, fontSize: 22 }} name="close-circle-outline"/>
                            </TouchableOpacity>
                        </View>
                        <ModalInstructionTile instructionLabel = { 'Verifique sua conexão.' } number = { '1' }/>
                        <ModalInstructionTile instructionLabel = { 'Verifique suas credenciais (email e senha). ' } number = { '2' }/>
                        <View style = {{ flexDirection :'row', alignItems: 'center', marginVertical: 8 }}>
                            <Text style = {{ color: '#6B6B6B', fontSize: 20, fontWeight: 'bold' }}>3</Text>
                            <View style = {{ marginLeft: 8, paddingHorizontal: 8, paddingVertical: 5, borderColor: '#000000', borderLeftWidth: 1 }}>
                                <Text style = {{ color: '#000000' }}>
                                    Se o problema persistir,{' '}
                                    <Text
                                        onPress = {handleEmailPress}
                                        style = {{ color: '#000000', fontWeight: '600' }}
                                    >
                                        clique aqui
                                    </Text>{' '}
                                    para em contato com a coordenação da sua unidade.
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </CustomModal> 
        </SafeAreaView>
    )
}