//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {YellowBox} from 'react-native'
import Routes from './routes'

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])

export default function App() {
  return (
    <Routes />
  );
}
