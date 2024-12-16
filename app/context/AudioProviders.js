import React, { Component, createContext,} from 'react';
import { Text, View, Alert } from 'react-native'; 
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';


export const AudioContext = createContext()
export class AudioProvider extends Component {
constructor(props) {
    super(props);
    this.state = {
        audioFiles: [],
        permissionError: false,
        playbackObj: null,
        soundObj: null,
        currentAudio: {},
        isPlaying: false,
        currentAudioIndex: null,
        playbackPosition: null,
        playbackDuration: null,
    };
    this.totalAudioCount =0
}

  permissionAllert = () => {
    Alert.alert("Permisos requeridos", "Esta app necesita acceder a los archivos de audio !", [{
        text: 'estoy listo',
        onPress: () => this.getPermission()
    },{
        text: 'cancel',
        onPress: () => this.permissionAllert()
    }])
}

getAudioFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
    });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: media.totalCount,
    });
    this.totalAudioCount=media.totalCount
    this.setState({ ...this.state, audioFiles: media.assets });
  };
  
  

  getPermission = async () => {
    // Este es un objeto de ejemplo de cómo podría verse el permiso sin conceder
    // {
    //     "canAskAgain": true,
    //     "expires": "never",
    //     "granted": false,
    //     "status": "undetermined",
    // }
    const permission = await MediaLibrary.getPermissionsAsync();
    if (permission.granted) {
        // Aquí queremos obtener todos los archivos de audio
        this.getAudioFiles()
    }
    if (!permission.canAskAgain && !permission.granted) {
        this.setState({ ...this.state, permissionError: true });
    }
    if(!permission.granted && permission.canAskAgain) {
        const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync();
        if(status === 'denied' && canAskAgain) {
            // Vamos a mostrar una alerta indicando que el usuario debe permitir este permiso para que la aplicación funcione
            this.permissionAllert()
        }
        if(status === 'granted') {
            // Queremos obtener todos los archivos de audio
            this.getAudioFiles()
        }
        
    
        if(status === 'denied' && !canAskAgain) {
            // Vamos a mostrar una alerta indicando que el usuario debe permitir este permiso para que la aplicación funcione
            this.setState({...this.state, permissionError: true})
        }
    }
     
}
  componentDidMount() {
    this.getPermission();
}

updateState = (prevState, newState = {}) => {
    this.setState({ ...prevState, ...newState });
}


render() {
    const {
        audioFiles,
        dataProvider,
        permissionError,
        playbackObj,
        soundObj,
        currentAudio,
        isPlaying,
        currentAudioIndex, 
        playbackPosition,
        playbackDuration,
    }= this.state
    if (this.state.permissionError) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{ fontSize: 25, textAlign: 'center', color: 'red' }}>
                    Osea no aceptaste los permisos y quieres escuchar musica 😐 
                </Text>
            </View>
        );
    }
    return (
        <AudioContext.Provider value={{ 
            totalAudioCount: this.totalAudioCount,
            audioFiles,dataProvider,
            playbackObj,
            soundObj,
            permissionError,
            currentAudio,
            currentAudioIndex, 
            isPlaying,   
            playbackPosition,
            playbackDuration,
            updateState: this.updateState, 
            }}>
            {this.props.children}
        </AudioContext.Provider>
    );
}

}
export default AudioProvider;
