import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useAudioRecorder, RecordingOptions, AudioModule, RecordingPresets } from '@node_modules/expo-audio';

export default function TabOneScreen() {
    const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);






    const [recording, setRecordingState] = useState(false);
    const [fetching, setFetchingState] = useState(false);

    const startRecording = () => {
         setRecordingState(true);
    };

    const stopRecording = () => {
        setRecordingState(false);
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <TouchableOpacity style={styles.button} onTouchStart={startRecording} onTouchEnd={stopRecording}>
          <Text>Press Here</Text>
          RenderIfButtonIsHeld();
        </TouchableOpacity>
    </View>
  );

  const RenderIfButtonIsHeld = (): JSX.Element => {
      if(areWeRecording) {
          return <Text>Beans</Text>;
      } else {
          return <Text>No Beans</Text>;
      }
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    height: 90,
    width: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },

  title: {
      fontSize: 20,
      fontWeight: 'bold',
  },

  separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
  },
});

