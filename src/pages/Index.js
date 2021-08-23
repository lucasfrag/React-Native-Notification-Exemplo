import React,{Component} from 'react'
import {View, Button, Text} from 'react-native'

export default function Index(props)
{
    return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Button title="Testar notificação" onPress={ () => props.enviarNotificacao()}></Button>
            <Text></Text>
            <Button title="Cancelar notificação" onPress={ () => props.cancelar()}></Button>
        </View>
    )
}