import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export default function TabOneScreen() {
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = React.useState([]);
  const [buttonHeld, setButtonHeld] = React.useState(false);
  // const [sound, setSound] = useState();
  // const [isRecording, setIsRecording] = useState(false);


  async function startRecording() {
      try {
        console.log("Starting Recording");
        const perm = await Audio.requestPermissionsAsync();
        if (perm.status === "granted") {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true
          });
          const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
          setRecording(recording);
        }
      } catch (err) {}
  }

  function clearRecordings() {
      setRecordings([])
  }

  async function stopRecording() {
      setRecording(undefined);
      console.log("Stopped Recording")
      await recording.stopAndUnloadAsync();
      let allRecordings = [...recordings];
      const { sound, status } = await recording.createNewLoadedSoundAsync();
      allRecordings.push({
          sound: sound,
          duration: getDurationFormatted(status.durationMillis),
          file: recording.getURI()
      });
      const newPath = FileSystem.cacheDirectory + "recording.3gp";
      await FileSystem.moveAsync({
        from: recording.getURI(),
        to: newPath,
      });

      setRecordings(allRecordings);
  }

  function getDurationFormatted(milliseconds) {
      const minutes = milliseconds / 1000 / 60;
      const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
      return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`
  }

  function getRecordingLines() {
      return recordings.map((recordingLine, index) => {
        return (
          <View key={index} style={styles.row}>
            <Text style={styles.fill}>
              Recording #{index + 1} | {recordingLine.duration}
            </Text>
            <Button onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
          </View>
        );
      });
  }

  async function playSound() {
    if (sound) {
      console.log('Playing Sound');
      await sound.playAsync();
    } else {
        console.log('No SOUND D:');
    }

  }

  const RenderIfButtonIsHeld = (): JSX.Element => {
    if (buttonHeld) { // Use isRecording state here
      return <Text style={styles.buttonText}>Recording...</Text>; // Or any other indicator
    } else {
      return <Text style={styles.buttonText}>Press to Record</Text>;
    }
  };

  const Conversation = (): JSX.Element => {
    return (
      <div style={{ height: '200px', overflow: 'scroll' }}>
        RenderChat();
      </div>
    );
  }

  const RenderChat = (): JSX.Element => {

  }

  return (
    <View style={styles.chatContainer}>
      <Text style={styles.title}>Chat</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity style={styles.button} onPressIn={startRecording} onPressOut={stopRecording}> {/* Use onPressIn and onPressOut */}
        <RenderIfButtonIsHeld /> {/* Call the function here */}
      </TouchableOpacity>
              {getRecordingLines()}
            <Button title={recordings.length > 0 ? '\n\n\nClear Recordings' : ''} onPress={clearRecordings} />
    </View>

  );
}


const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#ef4444',
    borderWidth: 4,
    borderColor: '#6b7280',
    padding: 10,
    height: 90,
    width: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 500,
  },

  buttonHover: {
      backgroundColor: '#dc2626',
  },

  buttonText: {
    textAlign: 'center', //
    fontSize: 15,
    color: 'white', // Example text color
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

