import * as firebase from 'firebase';
import React, { useState } from 'react';
import { TextInput, View, Text, Button, StyleSheet , Dimensions} from 'react-native';

// Optionally import the services that you want to use
import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase

var firebaseConfig = {
    apiKey: "AIzaSyBdPja-E4sNj9FjX8MyozpqrT8dQgKexwk",
    authDomain: "radarin6b.firebaseapp.com",
    projectId: "radarin6b",
    storageBucket: "radarin6b.appspot.com",
    messagingSenderId: "790007660825",
    appId: "1:790007660825:web:94aaa0c474a3849f7d8588",
    measurementId: "G-4R76RRH095"
  };

firebase.initializeApp(firebaseConfig);

export default function Login(){
    const [text, setText] = useState('');
    const [textpaswd, setTextpaswd] = useState('');

    async function login(){
        firebase.auth().signInWithEmailAndPassword(text,textpaswd)
        .then(() => {
            console.log('Inicada la sesion');
          })
          .catch(error => {
            console.log('No existe el par usuario-contraseña');
            setText( 'No existe el par correo-contraseña');
            console.error(error);
          });
    }
  return (
    <View style={styles.view}>
      <Text>Inicia sesion con tu correo de Solid</Text>
      <TextInput style={styles.input} placeholder="  Email" onChangeText={text => setText(text)} defaultValue={text}></TextInput>
      <TextInput style={styles.input} secureTextEntry={true} placeholder="   Password" onChangeText={textpaswd => setTextpaswd(textpaswd)} defaultValue={textpaswd}></TextInput>
      <Button title="Log in" onPress={login}/>
    </View>
  );
};



const styles = StyleSheet.create({
    input: {
      height: 40,
      width: 280,
      margin: 12,
      marginLeft: 20,
      marginRight: 20,
      borderWidth: 1,
    },
    view: {
        flex: 1, alignItems: 'center', justifyContent: 'center' 
    }
  });