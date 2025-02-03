import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logotipoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingTop: 40
    },
    cpsLogotipo: {
        height: 150,
        width: 150
    },
    cpsLabelContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cpsLabel: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: '300'
    },
    loginTitle: {
        color: '#000000',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    textInput: { 
        backgroundColor: '#FFFFFF',
        marginBottom: 20
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30
    },
    passwordContainer: {
        position: 'relative'
    },
    hidePassButtonContainer: {
        position: 'absolute',
        right: 20,
        bottom: 30
    },
    submitButton: {
        backgroundColor: '#B70E0E',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: '100%',
        borderRadius: 12,
        marginBottom: 50
    },
    submitButtonLabel: {
        color: '#FFFFFF',
        fontSize: 16
    },
    solutionsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginBottom: 80
    },
    solutionsButtonLabel: {
        color: '#B70E0E'
    },
    button: {
        backgroundColor: 'red',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    loginImage: {
        width: '100%',
        height: 400,
    },
    loginFormContainer: {
        backgroundColor: 'white',
        padding: 40,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        elevation: 5,
    }
})