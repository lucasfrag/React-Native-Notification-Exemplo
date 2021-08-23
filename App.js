import React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native'
import {notificationManager} from './src/Notification'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Index from './src/pages/Index'
import Detalhes from './src/pages/Detalhes'

const Stack = createStackNavigator()
const notificador = notificationManager;

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    notificador.configurar()
    notificador.criarCanal()
    notificador.agendarNotificacao()
  }

  disparar = () => {
    notificador.showNotification(
      1,
      "Esse é o nosso título",
      "E aqui está a mensagem. Vamos inserir uma mensagem um pouco mais longa para vermos o Android irá se adaptar ao conteúdo na tela?",
      {}, // data
      {} // options
    )
  }

  cancelar = () => {
    notificador.cancelAllLocalNotification()
  }

  render() {
    
    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{title: 'Bem-vindo!'}}>
            {
              ({navigation}) => {notificador.setNavegador(navigation); 
              return(<Index navegador={navigation} enviarNotificacao={this.disparar} cancelar={this.cancelar} />)}
            }
          </Stack.Screen>

          <Stack.Screen name="Detalhes" options={{title: 'Detalhes'}}>
            {({navigation}) => {return(<Detalhes navegador={navigation} />)}}
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

/* Estilização do projeto */
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 200,
    marginTop: 10
  }
});