import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function TabOneScreen() {
  const [recording, setRecording] = useState();
  const [sound, setSound] = useState();
  const [isRecording, setIsRecording] = useState(false);

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.startAsync();
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    setIsRecording(false);
    if (recording) {
      console.log('Stopping recording..');
      await recording.stopAndUnloadAsync();
      const { sound } = await Audio.Sound.createAsync(recording.getURI());
      setSound(sound);
      setRecording(undefined);
    }
  }

  async function playSound() {
    if (sound) {
      console.log('Playing Sound');
      await sound.playAsync();
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const RenderIfButtonIsHeld = (): JSX.Element => {
    if (isRecording) { // Use isRecording state here
      return <Text>Recording...</Text>; // Or any other indicator
    } else {
      return <Text>Press to Record</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Version One </Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity style={styles.button} onPressIn={startRecording} onPressOut={stopRecording}> {/* Use onPressIn and onPressOut */}
        <RenderIfButtonIsHeld /> {/* Call the function here */}
      </TouchableOpacity>
      <Button title="Play Sound" onPress={playSound} disabled={!sound} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


  button: {
    alignItems: 'center',
    backgroundColor: '#b8deff',
    padding: 10,
    height: 90,
    width: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  buttonText: {
    textAlign: 'center', //
    fontSize: 20,
    color: 'black', // Example text color
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

