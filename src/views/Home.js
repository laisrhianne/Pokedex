import React, {useState} from 'react';
import { SafeAreaView, TextInput, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const Home = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const [text, setText] = useState("")

  async function fetchPokemon() {
    try {
      const request = await axios.get(`https://pokeapi.co/api/v2/pokemon/${text}`)
      setPokemonData(request.data);
    } catch (error) {
      setPokemonData(null);
      console.log('error', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} onChangeText={setText} />

        <TouchableOpacity style={styles.button} onPress={fetchPokemon}>
          <MaterialCommunityIcon name='pokeball' size={32} color='white' />
        </TouchableOpacity>
      </View>

      <View>
        { pokemonData && (
          <View>
            <Text style={styles.title}>{ pokemonData.name }</Text>

            <Image style={styles.image} source={{ uri: pokemonData.sprites.other['official-artwork'].front_default}} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputContainer: {
    backgroundColor: 'white',
    width: '90%',
    height: 50,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  textInput: {
    width: '80%',
    marginLeft: 4,
    marginRight: 4,
    fontSize: 18,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: '20%',
    height: '100%',
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10, 
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
  },
  image: {
    width: 200,
    height: 200,
  }
});

export default Home;
