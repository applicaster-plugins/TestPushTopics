import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(239, 239, 239)'
  }
});

const FullScreenCentered = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

FullScreenCentered.propTypes = {
  children: PropTypes.node
};

export default FullScreenCentered;
