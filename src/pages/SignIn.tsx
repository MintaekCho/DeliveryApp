import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios, {Axios, AxiosError} from 'axios';
import React, {useCallback, useRef, useState} from 'react';
import {ActivityIndicator, Alert, StyleSheet} from 'react-native';
import {Pressable, Text, TextInput, View} from 'react-native';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch, useSelector} from 'react-redux';
import {RootStackParamList} from '../../AppInner';
import DisMissKeyboadView from '../components/DisMissKeyboadView';
import useSocket from '../hooks/useSocket';
import userSlice from '../slices/user';
import {RootState} from '../store/reducer';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

// InputForm을 따로 컴포넌트로 분류해서 회원가입, 로그인 페이지에서 재사용하는 방법 고민해보기
// props로 type을 'signin', 'signup' 형태로 넘겨서 타입에 따라 로직을 분리해보면?
export default function SignIn({navigation}: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPw] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const pwRef = useRef<TextInput | null>(null);
  const [loading, setLoading] = useState(false);

  const canToNext = email && password;
  const dispatch = useDispatch();

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const onSubmit = useCallback(async () => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 다시 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 다시 입력해주세요.');
    }
    try {
      setLoading(true);
      await axios
        .post(`${Config.API_URL}/login`, {email, password})
        .then(res => {
          dispatch(userSlice.actions.setUser(res.data.data));
          // EncryptedStorage는 Promise 객체라서 await으로 작성해야함
          EncryptedStorage.setItem('refreshToken', res.data.data.refreshToken);
          console.log(res.data.data);
        });

      // const user = useSelector((state: RootState) => state.user.email)
      // console.log(user)
      Alert.alert('알림', '로그인 되었습니다.');
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse) {
        Alert.alert('알림', errorResponse.data.message);
      }
    } finally {
      setLoading(false);
    }
  }, [email, password]);
  return (
    <DisMissKeyboadView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.inputWrap}>
          <View style={styles.input}>
            <Text style={styles.inputText}>이메일</Text>
            <TextInput
              onChangeText={email => {
                setEmail(email);
              }}
              placeholder="이메일을 입력해주세요"
              value={email}
              importantForAutofill="yes" // 삼성패스, 지문인증 등 자동완성 - 안드로이드 전용
              autoComplete="email" // 자동완성 힌트 제공 - 안드로이드 전용
              textContentType="emailAddress"
              returnKeyType="next" // 키보드 엔터를 next버튼으로 변경해줌
              keyboardType="email-address" // 키보드 내부에 '@' 들어가는 타입으로 변경
              onSubmitEditing={() => {
                // 엔터 버튼을 눌렀을 때 어떤 행동을 할건지 지정
                pwRef.current?.focus();
              }}
              blurOnSubmit={true}
              clearButtonMode="while-editing"
              ref={emailRef}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputText}>비밀번호</Text>
            <TextInput
              onChangeText={pw => {
                setPw(pw);
              }}
              placeholder="비밀번호를 입력해주세요"
              secureTextEntry // 비밀번호 안보이게 설정
              value={password}
              autoComplete="password"
              onSubmitEditing={onSubmit}
              ref={pwRef}
            />
          </View>
          <View style={styles.buttonWrap}>
            <Pressable
              style={
                !canToNext
                  ? styles.btnLogin
                  : [styles.btnLogin, styles.btnLoginActive]
              }
              onPress={onSubmit}
              disabled={loading || !canToNext}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.btnLoginText}>로그인</Text>
              )}
            </Pressable>
            <Pressable onPress={toSignUp}>
              <Text>회원가입</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </DisMissKeyboadView>
  );
}

const styles = StyleSheet.create({
  btnLogin: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  btnLoginActive: {
    backgroundColor: 'blue',
  },

  buttonWrap: {
    marginTop: 10,
    alignItems: 'center',
  },

  btnLoginText: {
    color: 'white',
  },
  inputWrap: {
    width: 250,
    backgroundColor: '#c4c4c4',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 50,
    borderRadius: 20,
  },
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'white',
    marginVertical: 5,
  },
  inputText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
