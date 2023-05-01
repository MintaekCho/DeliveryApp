import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Pressable, Text, TextInput, View} from 'react-native';
import {RootStackParamList} from '../../App';
import DisMissKeyboadView from '../components/DisMissKeyboadView';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

// InputForm을 따로 컴포넌트로 분류해서 회원가입, 로그인 페이지에서 재사용하는 방법 고민해보기
// props로 type을 'signin', 'signup' 형태로 넘겨서 타입에 따라 로직을 분리해보면?
export default function SignIn({navigation}: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const pwRef = useRef<TextInput | null>(null);

  const canToNext = email && pw;

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const onSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 다시 입력해주세요.');
    }
    if (!pw || !pw.trim()) {
      return Alert.alert('알림', '비밀번호를 다시 입력해주세요.');
    }
    Alert.alert('알림', '로그인 되었습니다.');
  }, [email, pw]);
  return (
    <DisMissKeyboadView>
      <View style={styles.Wrap}>
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
              value={pw}
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
              onPress={onSubmit}>
              <Text style={styles.btnLoginText}>로그인</Text>
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
  Wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrap: {
    backgroundColor: '#c4c4c4',
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
