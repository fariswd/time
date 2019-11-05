import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import SocketIOClient from 'socket.io-client';

let socket = {}

export default function App() {
  const [timeState, setTimeState] = React.useState('')
  const [fade] = React.useState(new Animated.Value(1))
  const [liftUp] = React.useState(new Animated.Value(0))
  const [size] = React.useState(new Animated.Value(100))
  const [spin] = React.useState(new Animated.Value(0))

  React.useEffect(() => {
    socket = SocketIOClient('http://localhost:3000');
    socket.on('time', (msg) => {
      animate(fade, liftUp, size, spin).start()
      setTimeState(msg)
    });
  }, [])

  return (
    <View style={styles.container}>
      <View style={{width: 120, height: 120, alignItems: 'center'}}>
        <Animated.Text
          style={{
            fontSize: size,
            opacity: fade,
            zIndex: -66,
            position: 'absolute',
            top: liftUp,
            transform: [
              { rotate: spin.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
              }) }
            ]
          }}
        >
          {timeState && new Date(timeState).getSeconds()}
        </Animated.Text>
        <Text
          style={{
            fontSize: 100,
          }}
        >
          {timeState && new Date(timeState).getSeconds()}
        </Text>

      </View>
    </View>
  );
}

const animate = (fade, lift, size, spin) => {
  fade.setValue(1)
  lift.setValue(0)
  size.setValue(100)
  spin.setValue(0)
  return Animated.sequence([
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 0,
        duration: 1000,
      }),
      Animated.timing(lift, {
        toValue: -40,
        duration: 1000,
      }),
      Animated.timing(size, {
        toValue: 0,
        duration: 1000,
      }),
      Animated.timing(spin, {
        toValue: 1,
        duration: 1000,
      }),
    ]),
  ])
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
