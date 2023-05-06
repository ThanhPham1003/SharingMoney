import jwt_decode from "jwt-decode"
import { LocalStoreName } from '@root/shared/enums/local-store.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reactotron from 'reactotron-react-native';
export const Decode = {
  decodeToken: async () =>{
    var decode: any
    const token = await AsyncStorage.getItem(LocalStoreName.TOKEN);
    reactotron.log("tokennnnn", token);
    decode = jwt_decode(token || "");
    return decode;
  }
}