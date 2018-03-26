import React, { Component } from 'react';
import { AppRegistry, TextInput, View, Text, StyleSheet, Button, Alert } from 'react-native';

export default class MainCuaca extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      forecast: {
        main: '-',
        description: '-',
        temp: 0,
      }
    };
  }

  getWeather=() => {
  const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + this.state.city + '&appid=fc8c704c9223ca9d5dd77f343bb18ebb&units=metric';
  fetch(url)
  .then((response) => response.json())
  .then((responseJson) => {
    if (responseJson.cod === 200) {
      this.setState({
            forecast: {
              main: responseJson.weather[0].main,
              description: responseJson.weather[0].description,
              temp: responseJson.main.temp,
              }
        });
    } else {
      const warning = 'Maaf API Kota ' + this.state.city + ' Tidak Tersedia';
      Alert.alert(warning);
      this.setState({
            forecast: {
              main: '-',
              description: '-',
              temp: 0,
              }
        });
    }
    });
  }

    renderRow(record) {
      return (
        <View style={styles.row}>
          <View style={styles.info}>
            <Text style={styles.items}>{record.name} </Text>
          </View>
        </View>
        );
    }

  render() {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Masukkan Nama Kota Dibawah</Text>
          <TextInput
            onChangeText={(city) => this.setState({ city })}
          />
          <Button
              onPress={() => this.getWeather()}
              title="Tampilkan Cuaca"
              color="#0097A7"
          />

          <View>
        <View>
          <Text> Kota : { this.state.city} </Text>
        </View>
        <View>
          <Text> Temp : { this.state.forecast.temp} </Text>
        </View>
      </View>
      <View>
        <View style={styles.button}>
          <Text> Main : { this.state.forecast.main} </Text>
        </View>
        <View>
          <Text> Main Desc : { this.state.forecast.description} </Text>
        </View>
      </View>

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    marginLeft: 20,
    marginRight: 20
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20
  },
});
AppRegistry.registerComponent('AppForm2', () => MainCuaca);
