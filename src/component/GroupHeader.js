import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeText as Text } from '@applicaster/london-rn-components';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  name: {
    lineHeight: 20,
    fontSize: 15,
    color: 'rgb(51, 51, 51)',
    textAlign: 'left',
    marginBottom: 20,
    paddingLeft: 20
  }
});

const GroupHeader = ({ children }) => (
  <Text style={styles.name}>{children}</Text>
);
GroupHeader.propTypes = {
  children: PropTypes.string
};

GroupHeader.defaultProps = {
  children: ''
};

GroupHeader.contextTypes = {
  isTablet: PropTypes.bool
};

export default GroupHeader;
