import React from 'react';
import { View, StyleSheet } from 'react-native';
import { contains } from 'ramda';
import PropTypes from 'prop-types';
import SwitchPanel from './SwitchPanel';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(255,255,255)',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgb(224, 224, 224)'
  }
});

const isLast = (arr, i) => arr && arr.length === i + 1;

const TopicsGroup = ({ topicsList, onStateChange, subscribedTopics }) => {
  return (
    <View style={styles.container}>
      {topicsList.map((topic, i) => (
        <SwitchPanel
          key={topic.topicId}
          {...{
            onStateChange,
            id: topic.topicId,
            isLast: isLast(topicsList, i),
            switchStatus: contains(topic.topicId, subscribedTopics),
            name: topic.title
          }}
        />
      ))}
    </View>
  );
};

TopicsGroup.propTypes = {
  groupName: PropTypes.string,
  topicsList: PropTypes.array.isRequired,
  onStateChange: PropTypes.func.isRequired,
  subscribedTopics: PropTypes.array.isRequired
};

TopicsGroup.defaultProps = {
  groupName: ''
};

export default TopicsGroup;
