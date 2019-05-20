import { NativeModules, AsyncStorage } from 'react-native';
import { compose, concat, without } from 'ramda';

const { PushNotifications } = NativeModules;

const storageKey = 'registeredTags';

export const unregisterTags = async tags => {
  // PushNotifications.unregisterTags(tags);
  const registeredTags = await AsyncStorage.getItem(storageKey);
  const newTags = compose(
    JSON.stringify,
    without(tags),
    JSON.parse
  )(registeredTags);
  await AsyncStorage.setItem(storageKey, newTags);

  return JSON.parse(newTags);
};

export const registerTags = async tags => {
  // await PushNotifications.registerTags(tags);
  const registeredTags = await AsyncStorage.getItem(storageKey);
  const newTags = compose(
    JSON.stringify,
    concat(tags),
    JSON.parse
  )(registeredTags);
  await AsyncStorage.setItem(storageKey, newTags);
  return JSON.parse(newTags);
};

export const getRegisteredTags = async () => {
  const registeredTags = await AsyncStorage.getItem(storageKey);
  if (!registeredTags) {
    await AsyncStorage.setItem(storageKey, '[]');
    return [];
  }
  return JSON.parse(registeredTags);
};
