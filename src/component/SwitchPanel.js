import React from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { SafeText as Text } from '@applicaster/london-rn-components';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'rgb(255,255,255)',
    paddingRight: 20,
    marginLeft: 20,
    borderBottomWidth: 1,
    borderColor: 'rgb(224, 224, 224)'
  },
  name: {
    fontFamily: 'OpenSans-Semibold',
    lineHeight: 20,
    fontSize: 14,
    color: 'rgb(51, 51, 51)',
    textAlign: 'left'
  },
  switch: {
    height: 31,
    width: 51
  }
});

const SwitchPanel = ({ name, switchStatus, isLast, id, onStateChange }) => {
  return (
    <View style={[styles.container, isLast && { borderBottomWidth: 0 }]}>
      <Text style={styles.name}>{name}</Text>
      <Switch
        onTintColor={'rgb(222, 20, 10)'}
        style={styles.switch}
        value={switchStatus}
        onValueChange={newState => onStateChange(newState, id)}
      />
    </View>
  );
};

SwitchPanel.propTypes = {
  name: PropTypes.string,
  switchStatus: PropTypes.bool,
  isLast: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onStateChange: PropTypes.func.isRequired
};

SwitchPanel.defaultProps = {
  switchStatus: false,
  isLast: false,
  name: '',
  id: 1
};

export default SwitchPanel;
