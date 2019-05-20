import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';
import { concat, without } from 'ramda';
import { SafeText as Text } from '@applicaster/london-rn-components';
import {
  getRegisteredTags,
  unregisterTags,
  registerTags
} from './notifications';
import Section from './component/Section';
import LoadingScreen from './component/LoadingScreen';
import FullScreenCentered from './component/FullScreenCentered';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(239, 239, 239)'
  },
  containerTablet: {}
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topicGroups: null,
      subscribedTopics: [],
      err: null
    };

    this.onStateChange = this.onStateChange.bind(this);
  }

  getChildContext() {
    const { is_tablet: isTablet } = this.props;
    return { isTablet };
  }

  componentDidCatch(error) {
    this.setState({ err: error.message });
  }

  componentDidMount() {
    this.getTopicsList();
    this.getRegisteredTagsList();
  }

  async getTopicsList() {
    const { data: topicGroups } = await axios
      .get('https://www.auto-motor-und-sport.de/api/newsapp/getGroups')
      .catch(err => {
        this.setState({ err: err.message });
      });

    this.setState({ topicGroups });
  }

  async getRegisteredTagsList() {
    const subscribedTopics = await getRegisteredTags().catch(err => {
      console.log(err);

      this.setState({ err: err.message });
    });

    this.setState({ subscribedTopics });
  }

  async onStateChange(enable, topicId) {
    if (enable) {
      const subscribedTopics = await registerTags([topicId]).catch(err => {
        this.setState({ err: err.message });
      });
      this.setState({ subscribedTopics });
    } else {
      const subscribedTopics = await unregisterTags([topicId]).catch(err => {
        this.setState({ err: err.message });
      });
      this.setState({ subscribedTopics });
    }
  }

  render() {
    const { is_tablet: isTablet } = this.props;
    const { topicGroups, subscribedTopics, err } = this.state;
    if (err) {
      return (
        <FullScreenCentered>
          <Text>{err}</Text>
        </FullScreenCentered>
      );
    }
    if (!topicGroups) {
      return <LoadingScreen />;
    }
    return (
      <View style={[styles.container, isTablet && styles.containerTablet]}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}>
          {topicGroups.map(group => (
            <Section
              key={group.idPrefix}
              {...{
                topicsList: group.topics,
                groupName: group.title,
                onStateChange: this.onStateChange,
                subscribedTopics
              }}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

App.propTypes = {
  is_tablet: PropTypes.bool
};

App.childContextTypes = {
  isTablet: PropTypes.bool
};

export default App;
