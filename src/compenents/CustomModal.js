import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from "react-native-modal";

export const CustomModal = ({ isVisible, closeModal, children, backgroundColor }) => { 
  return (
    <Modal 
      isVisible={isVisible} 
      useNativeDriverForBackdrop = { true }
      onBackdropPress = { closeModal }
      onBackButtonPress = { closeModal }
    >
      <View style={ styles.modalParent }>
        { children }
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
    modalParent: {
      justifyContent: 'center', 
      alignItems: 'center'
    }
  })