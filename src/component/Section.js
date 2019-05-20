import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import GroupHeader from './GroupHeader';
import TopicsGroup from './TopicsGroup';

const styles = StyleSheet.create({
  container: {
    marginTop: 40
  }
});

const Section = ({
  topicsList,
  groupName,
  onStateChange,
  subscribedTopics,
  isFirst
}) => {
  return (
    <View style={[styles.container, isFirst && { marginTop: 20 }]}>
      <GroupHeader>{groupName}</GroupHeader>
      <TopicsGroup {...{ topicsList, onStateChange, subscribedTopics }} />
    </View>
  );
};

Section.propTypes = {
  groupName: PropTypes.string,
  topicsList: PropTypes.array.isRequired,
  onStateChange: PropTypes.func.isRequired,
  subscribedTopics: PropTypes.array.isRequired,
  isFirst: PropTypes.bool
};

Section.defaultProps = {
  groupName: ''
};

export default Section;
