import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {RootStackParamList} from '../../App';
import DisMissKeyboadView from '../components/\bDisMissKeyboadView';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export default function SignUp({navigation}: SignUpScreenProps) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const pwRef = useRef<TextInput | null>(null);
  const nameRef = useRef<TextInput | null>(null);

  const onSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!name || !email.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!pw || !pw.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        email,
      )
    ) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
    }
    if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(pw)) {
      return Alert.alert(
        '알림',
        '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
      );
    }
    Alert.alert('완료', '회원가입에 성공하였습니다.');

    navigation.navigate('SignIn');
  }, [email, pw, name]);

  const canToNext = email && pw && name;

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
                  ? styles.btnSignUp
                  : [styles.btnSignUp, styles.btnSignUpActive]
              }
              onPress={onSubmit}>
              <Text style={styles.btnSignUpText}>회원가입</Text>
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
