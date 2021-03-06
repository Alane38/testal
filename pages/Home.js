import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, TextInput, Dimensions, FlatList} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Switch from '../component/Switch';
import { useNavigation } from '@react-navigation/native';

const Home = () => {

  const navigation = useNavigation()

  const [isDark, setIsDark] = useState(false);
  const toggleSwitch = () => setIsDark((previousState) => !previousState);

  const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

    useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }
      ).start();
    }, [fadeAnim])

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {props.children}
      </Animated.View>
    );
  }

  const [command, setCommand] = useState()

  const executeCommand = () => {
    if (command === '/light') {
      setIsDark(false)
    } else if (command === '/dark') {
      setIsDark(true)
    } else if (command === '#3mmc') {
      navigation.navigate('3mmc')
    }
    setCommand('')
  }

  var commands = [
    {
      id: 1,
      icon: 'moon-o',
      name: 'Dark mode',
      description: 'Enable dark mode',
      command: '/dark'
    },
    {
      id: 2,
      icon: 'sun-o',
      name: 'Light mode',
      description: 'Enable light mode',
      command: '/light'
    },
  ]

  return (
    <View style={isDark ? styles.blackContainer : styles.defaultContainer}>
      <View style={{ alignItems: 'center' }}>
        <View style={{ marginBottom: 15 }}>
          <Switch
            barHeight={30}
            switchWidth={40}
            switchHeight={20}
            value={isDark}
            onValueChange={toggleSwitch}
            disabled={false}
            backgroundActive={'#0095ff'}
            backgroundInactive={'#d1d1d1'}
            circleActiveColor={'white'}
            circleInActiveColor={'white'}
            // renderInsideCircle={() => <CustomComponent />} // Composant personnalis?? ?? rendre ?? l'int??rieur du cercle de commutation (texte, image, etc.)
            changeValueImmediately={true} // Si vous rendez ?? l'int??rieur du cercle, modifiez imm??diatement l'??tat ou attendez que l'animation se termine
            innerCircleStyle={{
              borderWidth: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }} // Style pour le cercle anim?? int??rieur pour ce que vous (peut) rendre ?? l'int??rieur du cercle
            outerCircleStyle={{}} // style pour le cercle anim?? ext??rieur
            renderActiveText={false}
            renderInActiveText={false}
            switchLeftPx={3} // d??nominateur pour la logique lors de la glissation ?? la vraie position.Nombre plus ??lev?? = plus d'espace de la droite du cercle ?? la fin du curseur
            switchRightPx={3} // d??nominateur pour la logique lors de la glissement en fausse position.Nombre plus ??lev?? = plus d'espace de gauche du cercle au d??but du curseur
            switchWidthMultiplier={2} // Multipli?? par l'accessoire ??CirclEze?? pour calculer la largeur totale du commutateur
            switchBorderRadius={30} // D??finit le rayon de bordure du curseur de l'interrupteur.S'il est non set, il reste la circleze.
          />
        </View>
        <TouchableOpacity
          onPress={toggleSwitch}
          style={{
            backgroundColor: isDark ? '#0095ff' : '#d1d1d1',
            borderRadius: 100,
            height: 50,
            width: 50,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <FontAwesome
            name={isDark ? 'moon-o' : 'sun-o'}
            size={25}
            color="white"
          />
        </TouchableOpacity>

        <FadeInView style={isDark ? styles.enableSwitchBoxFadeView : styles.disableSwitchBoxFadeView}>
          <Text style={isDark ? styles.enableSwitchBoxFadeViewText : styles.disableSwitchBoxFadeViewText}>{isDark ? 'Activ??' : 'D??sactiv??'}</Text>
        </FadeInView>
      </View>

      <View style={{ backgroundColor: '#000', width: Dimensions.get('window').width, height: '100%', padding: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 15 }]}
            onChangeText={(value) => setCommand(value)}
            onPressOut={() => setCommand('/')}
            value={command}
            placeholder="Commande"
            keyboardType="default"
          />
          <TouchableOpacity onPress={() => executeCommand()} style={{ height: 35, width: 35, borderRadius: 100, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
            <FontAwesome name="paper-plane" size={16} color="black" style={{ marginLeft: -2 }} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={commands}
          keyExtractor={item => item.id}
          renderItem={(item) => {
            return (
              <TouchableOpacity onPress={() => setCommand(item.item.command)} style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome name={item.item.icon} size={27} color="#fff" style={{ marginRight: 10 }} />
                <View>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.item.name}</Text>
                  <Text style={{ color: '#fff' }}>{item.item.description}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultContainer: {
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#fff"
  },
  blackContainer: {
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  enableSwitchBoxFadeView: {
    width: 250,
    height: 50,
    backgroundColor: 'black'
  },
  disableSwitchBoxFadeView: {
    width: 250,
    height: 50,
    backgroundColor: 'white'
  },
  enableSwitchBoxFadeViewText: {
    fontSize: 28,
    color: "white",
    textAlign: 'center',
    margin: 10
  },
  disableSwitchBoxFadeViewText: {
    fontSize: 28,
    color: "black",
    textAlign: 'center',
    margin: 10
  },
  input: {
    color: "#000",
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 7,
    fontSize: 20,
  }
});

export default Home;
