import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios, {AxiosError} from 'axios';
import React, {useCallback, useRef, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Config from 'react-native-config';
import {RootStackParamList} from '../../AppInner';
import DisMissKeyboadView from '../components/DisMissKeyboadView';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export default function SignUp({navigation}: SignUpScreenProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPw] = useState('');
  const [name, setName] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const pwRef = useRef<TextInput | null>(null);
  const nameRef = useRef<TextInput | null>(null);

  const onSubmit = useCallback(async () => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!name || !email.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        email,
      )
    ) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
    }
    if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password)) {
      return Alert.alert(
        '알림',
        '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
      );
    }

    try {
      setLoading(true);
      await axios.post(`${Config.API_URL}/user`, {email, name, password});
      Alert.alert('완료', '회원가입에 성공하였습니다.');
    } catch (error) {
      const errorResponse = (error as AxiosError<any>).response;
      Alert.alert('알림', '회원가입에 실패하였습니다.');
      if (errorResponse) Alert.alert('알림', errorResponse.data);
    } finally {
      setLoading(false);
    }

    navigation.navigate('SignIn');
  }, [email, password, name]);

  const canToNext = email && password && name;

  return (
    <DisMissKeyboadView>
      <View style={styles.Wrap}>
        <View style={styles.inputWrap}>
          <View style={styles.input}>
            <Text style={styles.inputText}>이메일</Text>
            <TextInput
              onChangeText={email => {
                setEmail(email.trim());
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
                nameRef.current?.focus();
              }}
              blurOnSubmit={true}
              clearButtonMode="while-editing"
              ref={emailRef}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputText}>이름</Text>
            <TextInput
              onChangeText={name => {
                setName(name.trim());
              }}
              placeholder="이름을 입력해주세요"
              value={name}
              importantForAutofill="yes" // 삼성패스, 지문인증 등 자동완성 - 안드로이드 전용
              autoComplete="name" // 자동완성 힌트 제공 - 안드로이드 전용
              textContentType="name"
              returnKeyType="next" // 키보드 엔터를 next버튼으로 변경해줌
              onSubmitEditing={() => {
                // 엔터 버튼을 눌렀을 때 어떤 행동을 할건지 지정
                pwRef.current?.focus();
              }}
              blurOnSubmit={true}
              clearButtonMode="while-editing"
              ref={nameRef}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputText}>비밀번호</Text>
            <TextInput
              onChangeText={pw => {
                setPw(pw.trim());
              }}
              placeholder="비밀번호를 입력해주세요."
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
                  ? styles.btnSignUp
                  : [styles.btnSignUp, styles.btnSignUpActive]
              }
              onPress={onSubmit}
              disabled={loading || !canToNext}>
              
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.btnSignUpText}>회원가입</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </DisMissKeyboadView>
  );
}

const styles = StyleSheet.create({
  btnSignUp: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  btnSignUpActive: {
    backgroundColor: 'blue',
  },

  buttonWrap: {
    marginTop: 10,
    alignItems: 'center',
  },

  btnSignUpText: {
    color: 'white',
  },
  Wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrap: {
    width: 250,
    backgroundColor: '#c4c4c4',
    padding: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
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
