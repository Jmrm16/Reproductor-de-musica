import React from 'react';
import { View, StyleSheet, Modal, StatusBar, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import color from '../misc/color';

const OptionModal = ({ visible,currentItem ,onClose,onPlayPress,onPlayListPress }) => {
    const {filename} =currentItem
  return (
    <>
      <StatusBar />
      <Modal transparent visible={visible} animationType="slide">
        {/* Detectar toques fuera del modal para cerrarlo */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBg} />
        </TouchableWithoutFeedback>
        <View style={styles.modal}>
          <Text style={styles.title} numberOfLines={2}> {filename} </Text>
          <View style={styles.optionContainer}>
          <TouchableWithoutFeedback onPress={onPlayPress}>
             <Text style={styles.option}>Play</Text>
           </TouchableWithoutFeedback>
           <TouchableWithoutFeedback onPress={onPlayListPress}>
              <Text style={styles.option}>Add to Playlist</Text>
           </TouchableWithoutFeedback>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.option}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: color.FONT_LIGHT,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingBottom: 20, // Agregar espacio para evitar superposición con los bordes
    zIndex: 1001, // Asegura que el modal esté por encima del fondo
  },
  optionContainer: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 0,
    color: color.FONT_MEDIUM,
  },
  option: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.FONT,
    paddingVertical: 10,
    letterSpacing: 1,
  },
  modalBg: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: color.MODAL_BG,
    zIndex: 1000, // Fondo del modal con menor zIndex
  },
});

export default OptionModal;
