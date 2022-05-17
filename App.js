import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Entypo } from '@expo/vector-icons';

// import { Switch } from 'react-native-switch';

import Switch from './component/Switch';

const App = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

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

  const switchObject = () => {
    toggleSwitch();
    FadeInView();
  }

  return (
    <View style={isEnabled ? styles.blackContainer : styles.defaultContainer}>
      <Switch
        barHeight={30}
        switchWidth={50}
        switchHeight={20}
        value={isEnabled}
        onValueChange={switchObject}
        disabled={false}
        backgroundActive={'#0095ff'}
        backgroundInactive={'#d1d1d1'}
        circleActiveColor={'white'}
        circleInActiveColor={'white'}
        // renderInsideCircle={() => <CustomComponent />} // Composant personnalisé à rendre à l'intérieur du cercle de commutation (texte, image, etc.)
        changeValueImmediately={true} // Si vous rendez à l'intérieur du cercle, modifiez immédiatement l'état ou attendez que l'animation se termine
        innerCircleStyle={{
          borderWidth: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }} // Style pour le cercle animé intérieur pour ce que vous (peut) rendre à l'intérieur du cercle
        outerCircleStyle={{}} // style pour le cercle animé extérieur
        renderActiveText={false}
        renderInActiveText={false}
        switchLeftPx={3} // dénominateur pour la logique lors de la glissation à la vraie position.Nombre plus élevé = plus d'espace de la droite du cercle à la fin du curseur
        switchRightPx={3} // dénominateur pour la logique lors de la glissement en fausse position.Nombre plus élevé = plus d'espace de gauche du cercle au début du curseur
        switchWidthMultiplier={2} // Multiplié par l'accessoire «CirclEze» pour calculer la largeur totale du commutateur
        switchBorderRadius={30} // Définit le rayon de bordure du curseur de l'interrupteur.S'il est non set, il reste la circleze.
      />
      <Text>{'\n'}</Text>
      <TouchableOpacity
        onPress={toggleSwitch}
        style={{
          backgroundColor: isEnabled ? '#0095ff' : '#d1d1d1',
          borderRadius: 100,
          padding: 10,
        }}>
        <Entypo
          name={isEnabled ? 'light-up' : 'moon'}
          size={25}
          color="white"
        />
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
        <FadeInView style={{ width: 250, height: 50, backgroundColor: 'black' }}>
          <Text style={{ fontSize: 28, color: "white", textAlign: 'center', margin: 10 }}>Désactivé</Text>
        </FadeInView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultContainer: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#fff"
  },
  blackContainer: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000'
  },
});

export default App;
