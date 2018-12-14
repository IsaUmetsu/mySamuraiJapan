import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native'

const teams = {
   1: 'G', 2: 'S', 3: 'DB', 4: 'D', 5: 'T', 6: 'C',
   7: 'L', 8: 'F', 9: 'M', 11: 'Bs', 12: 'H',  376: 'E'
 }

class PickerExample extends Component {
   state = {
     team: '',
     players: []
    }
   updateTeam = team => {
      fetch(`http://localhost:5050/players?team=${team}`, { method: 'GET' })
        .then((response) => response.json())
        .then(({ error, result }) => { this.setState({ players: result, team }) })
        .catch((error) => { console.error(error); });
   }
   render() {
      const { players } = this.state;

      return (
         <View>
            <Picker style={{ width: 30, height: 20 }} selectedValue={this.state.team} onValueChange={this.updateTeam}>
               {
                  Object.keys(teams).map(key => {
                     return <Picker.Item key={key} label={teams[key]} value={teams[key]} /> 
                  })
               }
            </Picker>
            <Text style = {styles.text}>{this.state.team}</Text>
            {
              Object.keys(players).length > 0
               ?
                <Picker>
                    {
                      players.map(player => {
                        return <Picker.Item key={player.id} label={`${player.name} (${player.no})`} value={player.id} />
                      })
                    }
                </Picker>
              : null
            }
         </View>
      )
   }
}
export default PickerExample

const styles = StyleSheet.create({
   text: {
      fontSize: 15,
      alignSelf: 'center',
      color: 'red'
   }
})