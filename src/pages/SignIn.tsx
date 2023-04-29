import React, {useCallback, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Pressable, Text, TextInput, View} from 'react-native';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const canToNext = email && pw;

  const onSubmit = useCallback(() => {
    Alert.alert('안녕', '안녕하세요!!');
  }, []);
  return (
    <View>
      <View>
        <Text>이메일</Text>
        <TextInput
          onChangeText={email => {
            setEmail(email);
          }}
          placeholder="이메일을 입력해주세요"
        />
      </View>
      <View>
        <Text>비밀번호</Text>
        <TextInput
          onChangeText={pw => {
            setPw(pw);
          }}
          placeholder="비밀번호를 입력해주세요"
        />
      </View>
      <View style={styles.buttonWrap}>
        <Pressable
          style={!canToNext ? styles.btnLogin : StyleSheet.compose(styles.btnLogin, styles.btnLoginActive)}
          onPress={onSubmit}>
          <Text style={styles.btnLoginText}>로그인</Text>
        </Pressable>
        <Pressable>
          <Text>회원가입</Text>
        </Pressable>
      </View>
    </View>
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
    backgroundColor: 'blue'
  },

  buttonWrap: {
    alignItems: 'center',
  },

  btnLoginText: {
    color: 'white',
  },
});
