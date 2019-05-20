import React from 'react';
import { ActivityIndicator } from 'react-native';
import FullScreenCentered from './FullScreenCentered';

const LoadingScreen = () => (
  <FullScreenCentered>
    <ActivityIndicator size="large" />
  </FullScreenCentered>
);

export default LoadingScreen;
