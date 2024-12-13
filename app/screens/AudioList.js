import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { AudioContext, currentAudioIndex } from '../context/AudioProviders';
import AudioListItem from '../components/AudioListItem';
import { BlurView } from 'expo-blur';
import OptionModal from '../components/OptionModal';
import{Audio} from 'expo-av';
import {play,pause,resume,playNext} from '../misc/audioController'


export class AudioList extends Component {
  static contextType = AudioContext;
  constructor(props) {
  super(props);
  this.state = {
    optionModalVisible: false,

  }
  this.currentItem = {}
}


  // Función para formatear la duración en segundos a "mm:ss"
  formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };



  handleAudioPress = async audio => {
    const { soundObj, playbackObj, currentAudio, updateState, audioFiles } = this.context;
    // playing audio for the first time.
    if (soundObj === null) {
        const playbackObj = new Audio.Sound();
        const status = await play(playbackObj, audio.uri);
        const index =audioFiles.indexOf(audio);
        return updateState(this.context, {
            currentAudio: audio,
            playbackObj: playbackObj,
            soundObj: status,
            isPlaying:true,
            currentAudioIndex: index,
        });
    }
      // pause
      if (soundObj.isLoaded && soundObj.isPlaying && currentAudio.id === audio.id) {
        const status = await pause(playbackObj);
        return updateState(this.context, { soundObj: status, isPlaying:false});
    }
    
    
    // resumen
    if (
      soundObj.isLoaded &&
      !soundObj.isPlaying &&
      currentAudio.id === audio.id
  ) {
      const status = await resume(playbackObj);
      return updateState(this.context, { soundObj: status, isPlaying:true });
  }

if (soundObj.isLoaded && currentAudio.id !== audio.id) {
    const status = await playNext(playbackObj, audio.uri);
    const index =audioFiles.indexOf(audio);
    return updateState(this.context, {
        currentAudio: audio,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
    });
}


};



  render() {
    const { audioFiles } = this.context;

    // Categorías (opcional)
    const categories = [
      'Favoritos',
      'Listas de reproducción',
      'Canciones',
      'Vídeos',
      'Artistas',
      'Álbumes',
      'Recientes',
    ];

    return (
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <>
              {/* Barra de navegación */}
              <View style={styles.navbar}>
                <Text style={styles.navbarTitle}>Mi Música</Text>
              </View>

              {/* Categorías */}
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categories}
                renderItem={({ item }) => (
                  <View style={styles.categoryButton}>
                    <Text style={styles.categoryText}>{item}</Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                style={styles.categoriesContainer}
              />

              {/* Título de sección */}
              <Text style={styles.sectionTitle}>Canciones</Text>
            </>
          }
          data={audioFiles}
          renderItem={({type, item, index}) => (
            <AudioListItem
              title={item.filename} // Nombre del archivo
              const isPlaying ={ this.context.isPlaying}
              activeListItem={this.context.currentAudioIndex === index}
              duration={this.formatTime(item.duration)} // Duración formateada
              onAudioPress={ ()=> this.handleAudioPress(item)}
              onOptionPress={() => {
                this.currentItem = item
                this.setState({ optionModalVisible: true }); // Muestra el modal al presionar opciones
              }}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
        />

        {/* Modal de opciones */}
        <OptionModal
          onPlayPress={()=> console.log('Play')}
          onPlayListPress={()=> console.log('lista ')}
          currentItem ={this.currentItem}
          visible={this.state.optionModalVisible}
          onClose={() => this.setState({ optionModalVisible: false })} // Cierra el modal
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    paddingBottom: 50, // Agrega espacio para evitar que la barra de navegación tape contenido
  },
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
  categoriesContainer: {
    marginBottom: 20,
  },
  categoryButton: {
    
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'black', // Hace el fondo transparente
    borderTopWidth: 0, // Elimina el borde superior
    elevation: 0, // Elimina la sombra en dispositivos Android
    
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
});

export default AudioList;
