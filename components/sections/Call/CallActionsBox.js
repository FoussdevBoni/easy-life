// CallActionBox.js

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CallActionBox = ({ switchCamera, toggleMute, toggleCamera, endCall }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={switchCamera}>
        <Ionicons name="camera-reverse" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={toggleMute}>
        <Ionicons name={toggleMute ? 'mic-off' : 'mic'} size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={toggleCamera}>
        <Ionicons name={toggleCamera ? 'camera-off' : 'camera'} size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={endCall}>
        <Ionicons name="call-sharp" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 10,
  },
  iconContainer: {
    padding: 10,
  },
});

export default CallActionBox;
