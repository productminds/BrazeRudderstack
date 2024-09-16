/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import braze from '@rudderstack/rudder-integration-braze-react-native';
import rudderClient, {
  RUDDER_LOG_LEVEL,
} from '@rudderstack/rudder-sdk-react-native';
import React, {useCallback, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import { Configuration } from '@rudderstack/rudder-sdk-react-native/src/NativeBridge';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const config: Configuration = {
  dataPlaneUrl: 'https://productmininp.dataplane.rudderstack.com',
  trackAppLifecycleEvents: true,
  withFactories: [braze],
  sessionTimeout: 5 * 1000,
  logLevel: RUDDER_LOG_LEVEL.VERBOSE,
  autoSessionTracking: true, // Set to false to disable automatic session tracking
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const initRudder = useCallback(async () => {
    // Next, use the below snippet to initialise the SDK.
    const apiKey =
      Platform.OS === 'ios'
        ? '2mAF1mbr4e8bhx184I5AdtUolF2'
        : '2lzZyfQtVjjSXMisgZTxsiATCGC';
    await rudderClient.setup(apiKey, config);

    await rudderClient.screen('Home', null, {});

    await rudderClient.identify(
      'ios-rudder-05',
      {
        email: 'testing-ios@productminds.com',
        firstname: 'Antonny',
        lastname: 'Santos',
      },
      {
        externalIds: [
          {
            id: 'ios-rudder-05',
            type: 'brazeExternalId',
          },
        ],
      },
    );
  }, []);

  useEffect(() => {
    initRudder();
    // Braze.subscribeToInAppMessage(true, event => {
    //   console.log('hi', event);
    // });
    // Braze.changeUser('ios-standalone-03');
  }, [initRudder]);

  const logEvent = async () => {
    await rudderClient.track('Testing Event');
    // Braze.logCustomEvent('Testing Event');
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Button title="Testing" onPress={logEvent} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
