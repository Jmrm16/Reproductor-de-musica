import React from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import color from '../misc/color';
import AntDesign from '@expo/vector-icons/AntDesign';

const getThumbnailText = (filename) => filename[0]

const renderPlayPauseIcon = isPlaying => {
  if (isPlaying) return <AntDesign name="pause" size={35} color={color.ACTIVE_FONT} />
  return <AntDesign name="play" size={35} color={color.ACTIVE_FONT} />
}

const AudioListItem = ({title, duration, onOptionPress, onAudioPress, isPlaying, activeListItem }) => {
  return (
    <>
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onAudioPress}>
      <View style={styles.leftContainer}>
        <View style={[styles.thumbnail, { backgroundColor: activeListItem ? color.FONT_MEDIUM: color.FONT_LIGHT }]}>
          <Text style={styles.thumbnailText}>{activeListItem ? renderPlayPauseIcon(isPlaying) : getThumbnailText(title)}
          </Text>
        </View>
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={styles.title}>{title}</Text>
          <Text  style={styles.timeText}>{duration}</Text>
        </View>
      </View>
      </TouchableWithoutFeedback>
      <View style={styles.rightContainer}>
      <Entypo
      onPress={onOptionPress}
      name='dots-three-vertical'
      size={22}
      color={color.FONT_MEDIUM}
      
     />

      </View>
    </View>
    <View style={styles.separator} />
    </>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        
       
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    rightContainer: {
        width: 30,
        height: 50,
        justifyContent: 'center',
        
       
    }, 
    thumbnail: {
        height: 50,
        width: 50, // Define el ancho para mantener la forma cuadrada
        borderRadius: 25, // Para hacerlo circular, opcional
        backgroundColor: color.FONT_LIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumbnailText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: color.FONT,
    },
    titleContainer: {
        width: width - 180,
        paddingLeft: 10,
      },
      title: {
        fontSize: 16,
        color:'white',
    },
    separator: {
        width: width - 80,
        backgroundColor: '#333',
        opacity: 0.3,
        height: 0.5,
        alignSelf: 'center',
        marginTop: 10,
    },
    timeText: {
        fontSize: 14,
        color: color.FONT_LIGHT,
    },
        
    
});


export default AudioListItem