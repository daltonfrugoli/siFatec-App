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
    TextInput,
    ActivityIndicator,
    Alert
} from 'react-native';

// Styles
import { styles } from "./Login.style";

// Components
import { CustomModal } from "../../compenents/CustomModal"; 

// Plugins
import Ionicons from "react-native-vector-icons/Ionicons";
import SwitchToggle from "react-native-switch-toggle";
import Toast from 'react-native-toast-message';

// Https 
import { login } from "../../services/Https";

// Local storage
import { db } from "../../App";

export function Login({ navigation, route }){

    // Spinner 
    const [spinnerState, setSpinnerState] = useState(false);

    // Modal
    const [solutionsModalIsVisible, setSolutionsModalIsVisible] = useState(false);

    // Email input
    const [emailInput, setEmailInput] = useState("");
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);

    // Password input
    const [passwordInput, setPasswordInput] = useState("");
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);
    const passwordRef = useRef();
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    // Remember me input 
    const [rememberMe, setRememberMe] = useState(false);

    // Top image
    const loginImage = require('../../assets/loginImage.jpg');
    const cpsLogo = require('../../assets/cpsIcon.png');

    function submitCredentials(email, password, rememberMe){
        setSpinnerState(true);
        // API request
        login(email, password)
        .then((res) => { 
            if (res.status == 404 || res.status == 401){
                setTimeout(() => {
                    setSpinnerState(false);
                    showToast();
                }, 500);
            } else if (res.status == 200){
                if (rememberMe){
                    db.transaction((tx) => {
                        tx.executeSql( // adicionar select anntes do insert par não duplicar o token
                            'INSERT INTO logged_user (token) VALUES (?);',
                            [res.data.access_token],
                            () => {
                                setTimeout(() => {
                                    navigation.replace('Home');
                                    setSpinnerState(false);
                                }, 500);
                            },
                            (tx, error) => {
                                console.log('Erro ao inserir:', error);
                                setSpinnerState(false);
                                Alert.alert('Atenção', 'Houve um erro inesperado. Por favor, tente novamente. Se o erro persistir, reinicie o aplicativo.' + error)
                            }
                        );
                    });
                } else {
                    setTimeout(() => {
                        navigation.replace('Home');
                        setSpinnerState(false);
                    }, 500);
                }
            } else {
                console.log('erro desconhecido')
                setSpinnerState(false);
            }
        })
        .catch((error) => {
            console.log('Error: ', error);
            setSpinnerState(false);
            Alert.alert('Atenção', 'Houve um erro inesperado. Por favor, tente novamente. Se o erro persistir, reinicie o aplicativo.' + error)
        })


    }

    const showToast = () => {
        Toast.show({
            type: 'error',
            text1: 'Credenciais incorretas',
            text2: 'Verifique e tente novamente!',
            position: 'bottom',
            text1Style: { color: "#000000", fontWeight: 'bold', fontSize: 14 },
            text2Style: { color: "#000000", fontSize: 14, opacity: 0.6 }
        });
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

    const credentialsPreValidator = () => {
        let hasError = false;

        if (!emailInput.includes('@') || !emailInput.includes('.')){
            setIsEmailValid(false);
            hasError = true;
        }

        if (passwordInput.length < 8){
            setIsPasswordValid(false);
            hasError = true;
        }

        if (hasError){
            return false;
        } else return true;
    }
    

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
                            style = {[ styles.textInput, { borderColor: isEmailFocused ? "#B70E0E" : "#A49C9C", marginBottom: isEmailValid ? 20 : 5 }]}
                            placeholder = "usuario2025@email.com"
                            placeholderTextColor = { "#AFAFAF" }
                            onFocus = { () => setIsEmailFocused(true) }
                            onBlur = { () => setIsEmailFocused(false) }
                            value = { emailInput }
                            onChangeText = {(text) => {
                                setEmailInput(text);
                                setIsEmailValid(true);
                            }}
                            returnKeyType = "next"
                            onSubmitEditing = { () => passwordRef.current.focus() } 
                            editable = { !spinnerState }
                        />
                        { !isEmailValid ? <Text style = {{ color: '#B70E0E', marginBottom: 20 }}>Insira um email válido!</Text> : null }
                        <View style = { styles.passwordContainer }>
                            <View>
                                <Text style = { styles.textInputLabel }>Senha</Text> 
                                <TextInput
                                    style = {[ styles.textInput, { paddingRight: 70, borderColor: isPasswordFocused ? "#B70E0E" : "#A49C9C", marginBottom: isPasswordValid ? 20 : 5 }]}
                                    placeholder = "***********"
                                    placeholderTextColor = { "#AFAFAF" }
                                    ref = { passwordRef }
                                    onFocus = { () => setIsPasswordFocused(true) }
                                    onBlur = { () => setIsPasswordFocused(false) }
                                    secureTextEntry = { hidePassword }
                                    label = { "Senha" }
                                    value = { passwordInput }
                                    onChangeText = {(text) => {
                                        setPasswordInput(text);
                                        setIsPasswordValid(true);
                                    }}
                                    returnKeyType = "done"
                                    onSubmitEditing = { () => {
                                        submitCredentials(emailInput, passwordInput, rememberMe);
                                        setSpinnerState(true);
                                    }}
                                    editable = { !spinnerState }
                                />
                            </View>
                            <TouchableOpacity
                                onPress = { () => setHidePassword(prev => !prev) }
                                style = { styles.hidePassButtonContainer }
                            >
                                <Ionicons name = { hidePassword ? "eye" : "eye-off" } style = { styles.hidePassButton }/>
                            </TouchableOpacity>
                        </View>
                        { !isPasswordValid ? <Text style = {{ color: '#B70E0E', marginBottom: 20 }}>Insira uma senha válida!</Text> : null }
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
                                if (credentialsPreValidator()) submitCredentials(emailInput, passwordInput, rememberMe);
                            }}
                        >
                            <Text style = { styles.submitButtonLabel }>Entrar</Text>
                        </TouchableOpacity>
                        <View style = { styles.solutionsContainer }>
                            <TouchableOpacity
                                onPress = { () => {
                                    console.log("soluções");
                                    setSolutionsModalIsVisible(true);
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
            <CustomModal isVisible = { solutionsModalIsVisible } closeModal = { () => setSolutionsModalIsVisible(false) }>
                <View style = { styles.solutionsModalContainer }>
                    <View style = { styles.solutionsModalContentContainer }>
                        <View style = {{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15,}}>
                            <Text style = { styles.modalTitleLabel }>Não consegue fazer login?</Text>
                            <TouchableOpacity
                                onPress = { () => setSolutionsModalIsVisible(false) }
                            >
                                <Ionicons style = {{ color: '#747474', marginTop: 2, fontSize: 22, padding: 5 }} name="close-circle-outline"/>
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
            { spinnerState == true ? 
                <>
                    <View style = {[ styles.spinner, { backgroundColor: "#000000", opacity: 0.3 } ]}>
                    </View>
                    <View style = {[ styles.spinner, ]}>
                        <ActivityIndicator size="large" color={ '#B70E0E' } />
                        <Text style = {{ color: '#FFFFFF', fontStyle: 'italic', marginTop: 3, fontWeight:'bold' }}>Carregando...</Text>
                    </View>
                </>
            : null } 
        </SafeAreaView>
    )
}