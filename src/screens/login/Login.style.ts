import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 50
    },
    cpsLogotipoContainer: {
        flex: 1, 
        borderColor: '#FFFFFF', 
        borderRightWidth: 2, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 40 
    },
    cpsLogotipo: {
        height: 150,
        width: 150,
    },
    cpsLabelContainer: {
        flex: 1,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cpsLabel: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: '300',
    },
    titleLabel: {
        color: '#000000',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    textInputLabel: {
        color: '#747474',
        fontSize: 15
    },
    textInput: { 
        backgroundColor: '#FFFFFF',
        borderColor: "#A49C9C",
        borderBottomWidth: 1,
        marginBottom: 20,
        height: 35,
        paddingHorizontal: 0,
        color: '#000000'
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30
    },
    passwordContainer: {
        position: 'relative',
        marginTop: 10
    },
    hidePassButtonContainer: {
        position: 'absolute',
        right: 20,
        bottom: 30
    },
    hidePassButton: { 
        fontSize: 20,
        color: '#747474'
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
        flex: 1,
        backgroundColor: 'white',
        padding: 40,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        elevation: 5,
    },
    solutionsModalContainer: {
        width: '90%',
        maxWidth: 500,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 25,
        alignItems: 'center'
    },
    solutionsModalContentContainer: {
        width: '95%',
    },
    modalTitleLabel: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1
    },
    modalInstructionContainer: { 
        flexDirection :'row', 
        alignItems: 'center', 
        marginVertical: 8 
    },
    modalInstructionNumber: { 
        color: '#6B6B6B', 
        fontSize: 20, 
        fontWeight: 'bold' 
    },
    modalInstructionBox: { 
        marginLeft: 8, 
        paddingHorizontal: 8, 
        paddingVertical: 5, 
        borderColor: '#000000', 
        borderLeftWidth: 1 
    }
})