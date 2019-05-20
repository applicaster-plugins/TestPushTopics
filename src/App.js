import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';
import { SafeText as Text } from '@applicaster/london-rn-components';
import {
  getRegisteredTags,
  unregisterTags,
  registerTags,
  setGlobalPushStatus,
  getGlobalPushStatus
} from './notifications';
import SwitchPanel from './component/SwitchPanel';
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
      err: null,
      globalPush: null
    };

    this.onStateChange = this.onStateChange.bind(this);
    this.onGlobalPushStateChange = this.onGlobalPushStateChange.bind(this);
  }

  getChildContext() {
    const { is_tablet: isTablet } = this.props;
    const { globalPush } = this.state;
    return { isTablet, globalPush };
  }

  componentDidCatch(error) {
    this.setState({ err: error.message });
  }

  componentDidMount() {
    this.getTopicsList();
    this.getRegisteredTagsList();
    this.getGlobalPushStatus();
  }

  async getGlobalPushStatus() {
    const globalPush = await getGlobalPushStatus().catch(err => {
      this.setState({ err: err.message });
    });
    console.log(globalPush);
    this.setState({ globalPush });
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

  async onGlobalPushStateChange(enabled) {
    if (!enabled) {
      const subscribedTopics = await unregisterTags(
        this.state.subscribedTopics
      );
      this.setState({ subscribedTopics });
    }
    this.setState({ globalPush: enabled });
    setGlobalPushStatus(enabled);
  }

  renderText(text) {
    return (
      <Text
        style={{
          fontSize: 14,
          color: 'rgb(145, 145, 145)',
          fontFamily: 'OpenSans',
          textAlign: 'left',
          paddingHorizontal: 20
        }}
      >
        {text}
      </Text>
    );
  }

  render() {
    const { is_tablet: isTablet } = this.props;
    const { topicGroups, subscribedTopics, err, globalPush } = this.state;
    if (err) {
      return (
        <FullScreenCentered>
          <Text>{err}</Text>
        </FullScreenCentered>
      );
    }
    if (!topicGroups || !subscribedTopics || globalPush === null) {
      return <LoadingScreen />;
    }
    return (
      <View style={[styles.container, isTablet && styles.containerTablet]}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 40,
            paddingTop: 40
          }}
        >
          {this.renderText(
            'Du kannst deine Push-Meldungen hier ein- und ausschalten.'
          )}
          <SwitchPanel
            contentContainerStyle={{
              marginLeft: 0,
              paddingLeft: 20,
              marginVertical: 20
            }}
            name={'Push-Meldungen'}
            switchStatus={globalPush}
            onStateChange={this.onGlobalPushStateChange}
            disabled={false}
          />
          {this.renderText('Hier kannst du deine Push-Favoriten festlegen.')}
          {topicGroups.map((group, i) => (
            <Section
              key={group.idPrefix}
              {...{
                isFirst: i === 0,
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
  isTablet: PropTypes.bool,
  globalPush: PropTypes.bool
};

export default App;
