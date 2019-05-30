# TestPushTopics

React Native plugin for displaying push notifications topic screen

## Description

This plugin is used to display notification controls for testing registration for push topics with different push providers.

## Installation

```
yarn
```

## Zapp Configuration

The plugin use 3 configuration fields in Zapp:

1. *presentation* - How we should present this plugin? Possible values: `present`, `push`, `presentNoNavigation`, `pushNoNavigation`, `asAChild`. The defualt value will be `presentNoNavigation`.

2. *backgroundViewColor* - Background color when the view is loading.

3. *topicsURL* - URL end point for loading the topics data. you can find an example for how this topcis json should look [here](./examples/topics.json).