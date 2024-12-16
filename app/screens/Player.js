import React, {useContext, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Dimensions, Animated  } from 'react-native';
import Screen from '../components/Screen';
import color from '../misc/color';
import PlayerButton  from '../components/PlayerButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { AudioContext } from '../context/AudioProviders';


const { width } = Dimensions.get('window');

const Player = () => {
  const context = useContext(AudioContext);
  const {
    playbackPosition,
    playbackDuration,
} = context;

const calculateSeebBar = () => {
    if (playbackPosition !== null && playbackDuration !== null) {
        return playbackPosition / playbackDuration;
    }
    return 0;
}

     // 1. Crear el valor animado
  const rotateValue = useRef(new Animated.Value(0)).current;

  // 2. Definir la animación de rotación
  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1, // Rango de 0 a 1 para interpolación
        duration: 3000, // 3 segundos para un giro completo
        useNativeDriver: true, // Habilitar el driver nativo
      })
    ).start();
  };

  const stopRotation = () => {
    rotateValue.stopAnimation(); // Detener la animación
    rotateValue.setValue(0); // Reiniciar la rotación
  };

  // 3. Efecto para iniciar/detener la rotación según `isPlaying`
  useEffect(() => {
    if (context.isPlaying) {
      startRotation();
    } else {
      stopRotation();
    }
  }, [context.isPlaying]);

  // 4. Interpolación de rotación
  const rotation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // De 0 a 360 grados
  });
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.navbar}>
            <Text style={styles.navbarTitle}>Mi Música</Text>
        </View> 
        <Text style={styles.audioCount}>
        {`${(context.currentAudioIndex ?? 0) + 1} / ${(context.totalAudioCount ?? 0)}`}
       </Text>
        <View style={styles.midBannerContainer}>
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
        <MaterialCommunityIcons
          name="music-circle"
          size={299}
          color={context.isPlaying ? color.ACTIVE_BG : color.FONT_MEDIUM}
        />
      </Animated.View>
        </View>
        <View style={styles.audioPlayerContainer}>
        <Text style={styles.audioTitle}>
        {context.currentAudio?.filename || 'Sin título'}
        </Text>
        <Slider
        style={{width: width, height: 40}}
        minimumValue={0}
        maximumValue={1}
        value={calculateSeebBar()}
        minimumTrackTintColor={color.FONT_MEDIUM}
        maximumTrackTintColor={color.ACTIVE_BG}
        />
        <View style={styles.audioControllers}>
        <PlayerButton iconType='PREV' />
        <PlayerButton onPress={()=>console.log('holas')} style={{marginHorizontal:25}} 
         iconType={context.isPlaying ? 'PLAY':'PAUSE'} />
        <PlayerButton iconType='NEXT' />
       </View>


        </View>
      </View>
    </Screen>
  );
};



const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navbarTitle: {
    fontSize: 24,
    marginTop: 10,
    color: '#fff',
  },
  audioControllers: {
    width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
},
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50, // Agrega espacio para evitar que la barra de navegación tape contenido
  },  
  audioCount: {
    textAlign: 'right',
    padding: 15,
    fontSize: 14,
    color: color.FONT_LIGHT,
  },
  midBannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioTitle: { 
    fontSize: 16, 
    color: color.FONT,
    padding: 15,
  }
  


});

export default Player;
