import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'

export default Home = () => {
  const goToAbout = () => {
    Actions.about()
  }
  return (
    <TouchableOpacity style={{ margin: 128 }} onPress={goToAbout}>
      <Text>This is HOME!</Text>
    </TouchableOpacity>
  )
}