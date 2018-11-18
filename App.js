import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, Button } from 'react-native';
import { createStackNavigator, createNavigationContainer } from 'react-navigation';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!?!</Text>
        <Button 
          title="Go to Details"
          onPress={() => navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          })}
        />
      </View>
    );  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class DetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    }
  }

  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Button
          title="Go to Details... again"
          onPress={() => navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })}
        />
        {/* updating `navigationOptions` with `setParams` */}
        <Button
          title="Update the title"
          onPress={() => this.props.navigation.setParams({ otherParam: 'Updated' })}
        />
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
        <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  }
}

// Warn: require change name of func to `createStackNavigator`
const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
    // The header config from HomeScreen is now here
    // Warn: require modify key name to `navigationOptions`
    navigationOptions: {
      // Adjusting header styles
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      haederTitleStyle: {
        fontWeight: 'bold',
      }
    }
  }
);

const AppContainer = createNavigationContainer(RootStack);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}