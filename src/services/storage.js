import { AsyncStorage } from 'react-native';

const storage = {
  
    async save(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    },

    async get(key) {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    }

};

export default storage;