import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, Button } from 'react-native';
import { createStackNavigator, createNavigationContainer } from 'react-navigation';

class LogoTitle extends Component {
  render() {
    return (
      <Image
        source={require('../firefox.jpeg')}
        style={{ width: 30, height: 30 }}
      />
    )
  }
}

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerLeft: (
        <Button
          onPress={() => navigation.navigate('MyModal')}
          title="Info"
          color="#fff"
        />
      ),
      headerTitle: <LogoTitle />,
      headerRight: 
        <Button
          onPress={navigation.getParam('increaseCount')}
          title="+1"
          color="#fff"
        />
      ,
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount })
  }

  state = {
    count: 0,
  }

  _increaseCount = () => this.setState({ count: this.state.count + 1 });

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Text>Count: {this.state.count}</Text>
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

class ModalScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    )
  }
}

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
const MainStack = createStackNavigator(
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

const RootStack = createStackNavigator(
  {
    Main: { screen: MainStack },
    MyModal: { screen: ModalScreen }
  },{
    mode: 'modal',
    headerMode: 'none',
  }
)

export default createNavigationContainer(RootStack);