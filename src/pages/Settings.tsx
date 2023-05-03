import axios, {Axios, AxiosError} from 'axios';
import React, {useCallback} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch, useSelector} from 'react-redux';
import userSlice from '../slices/user';
import {RootState} from '../store/reducer';

export default function Settings() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const handleLogout = useCallback(async () => {
    try {
      await axios.post(
        `${Config.API_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      EncryptedStorage.removeItem('refreshToken');
      dispatch(
        userSlice.actions.setUser({
          email: '',
          name: '',
          accessToken: '',
        }),
      );
      Alert.alert('알림', '로그아웃 되었습니다.');
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      Alert.alert('알림', errorResponse);
      console.error(errorResponse);
    } finally {
    }
  }, []);

  return (
    <View>
      <TouchableOpacity onPress={handleLogout}>
        <Text>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}
