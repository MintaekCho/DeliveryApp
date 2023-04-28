import * as React from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {useCallback} from 'react';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type DetailsScreenProps = NativeStackScreenProps<ParamListBase, 'Details'>;

function HomeScreen({navigation}: HomeScreenProps) {
  const [modal, setModal] = React.useState(true);

  const onClick = useCallback(() => {
    navigation.navigate('Details');
  }, [navigation]);

  const styled = StyleSheet.create({
    view: {
      width: 150,
      height: 100,
      borderRadius: 20,
      padding: 10,
      backgroundColor: 'orange',
    },

    flex: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    modal: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  });

  return (
    <>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Pressable onPress={onClick}>
          <Text>난 부엉이</Text>
        </Pressable>
        <View style={[styled.view, styled.flex]}>
          <Text style={{color: 'red', fontWeight: 'bold'}}>안녕하세요!</Text>
        </View>
      </View>
      {modal && (
        <Pressable onPress={() => {setModal(false)}} style={[styled.modal, styled.flex]}>
          <View style={[styled.view, styled.flex, {backgroundColor: 'red'}]}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>닌 누구??</Text>
          </View>
        </Pressable>
      )}
    </>
  );
}

function DetailsScreen({navigation}: DetailsScreenProps) {
  const onClick = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  console.log('debug');

  const btn = StyleSheet.create({});

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Pressable
        style={{backgroundColor: 'red', padding: 8, borderRadius: 14}}
        onPress={onClick}>
        <Text style={{color: 'white'}}>Details Screen</Text>
      </Pressable>
    </View>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'OverView'}}
        />
        <Stack.Screen name="Details">
          {props => <DetailsScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
