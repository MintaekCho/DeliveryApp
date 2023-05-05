import axios, {Axios, AxiosError} from 'axios';
import React, {useCallback, useEffect} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch, useSelector} from 'react-redux';
import userSlice from '../slices/user';
import {RootState} from '../store/reducer';

export default function Settings() {
  const dispatch = useDispatch();
  const {name, accessToken, money} = useSelector(
    (state: RootState) => state.user,
  );


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
      const errorResponse = (error as AxiosError<any>).response;
      Alert.alert('알림', errorResponse?.data.message);
      console.error(errorResponse);
    } finally {
    }
  }, []);

  useEffect(() => {
    const getMoney = async () => {
      await axios
      // 서버로부터 어떤 데이터가 오는지 알 수 없기 때문에 타입 지정
        .get<{data: number}>(`${Config.API_URL}/showmethemoney`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(res => {
          dispatch(userSlice.actions.setMoney(res.data.data));
        });
    };
    getMoney();
  }, [accessToken, dispatch]);

  return (
    <View style={styles.settingWrab}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text>로그아웃</Text>
      </TouchableOpacity>
      <View>
        <Text>{`${name}님의 총 수익금은 ${money}원입니다.`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  settingWrab: {
    alignItems: 'center',
  },
  logoutButton: {
    width: '30%',
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});
