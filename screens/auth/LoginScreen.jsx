import React, { useState, useEffect } from 'react';
import {
  useWindowDimensions,
  TouchableWithoutFeedback,
  TextInput,
  Platform,
  Keyboard,
  Pressable,
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import { authSignInUser } from 'state';
import { useLanguage } from 'context';
import { languageWrapper } from 'middlewares';
import { Button } from 'components';
import { LOGIN } from 'constants';

const initialState = {
  email: '',
  password: '',
};

export default function LoginScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const language = useLanguage();

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [hidePass, setHidePass] = useState(true);
  const [haveEmail, setHaveEmail] = useState(null);
  const [havePassword, setHavePassword] = useState(null);
  const [haveAll, setHaveAll] = useState(false);

  useEffect(() => {
    haveEmail && havePassword ? setHaveAll(true) : setHaveAll(false);
  }, [haveEmail, havePassword]);

  const languageDeterminer = obj => languageWrapper(language, obj);

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const handlePress = () => {
    if (!haveEmail || haveEmail === '') {
      setHaveAll(false);
      Alert.alert(
        languageDeterminer(LOGIN.alert.noEmail.title),
        languageDeterminer(LOGIN.alert.noEmail.description),
        [{ text: 'Ok' }],
      );
    } else if (!havePassword || havePassword === '') {
      setHaveAll(false);
      Alert.alert(
        languageDeterminer(LOGIN.alert.noPassword.title),
        languageDeterminer(LOGIN.alert.noPassword.description),
        [{ text: 'Ok' }],
      );
    } else {
      keyboardHide();
      setHaveAll(true);
      dispatch(
        authSignInUser(state, languageDeterminer(LOGIN.alert.authSignInUser)),
      );
      setState(initialState);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground
        source={require('assets/background/3.jpg')}
        resizeMode="cover"
        style={styles.container}
      >
        <Text style={styles.titlePage}>{languageDeterminer(LOGIN.hello)}</Text>

        <Text style={styles.titlePage}>{languageDeterminer(LOGIN.title)}</Text>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View
            style={{
              ...styles.form,
              width: width - 20 * 2,
              marginBottom: isShowKeyboard ? 40 : 100,
            }}
          >
            <View style={styles.row}>
              <Text style={styles.inputText}>
                {languageDeterminer(LOGIN.input.email)}
              </Text>

              <TextInput
                style={styles.input}
                textAlign={'center'}
                autoFocus
                value={state.email}
                selectionColor="red"
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={value => {
                  setState(prevState => ({
                    ...prevState,
                    email: value,
                  }));
                  setHaveEmail(value.trim());
                }}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.inputText}>
                {languageDeterminer(LOGIN.input.password)}
              </Text>

              <TextInput
                style={styles.input}
                textAlign={'center'}
                selectionColor="red"
                value={state.password}
                secureTextEntry={hidePass ? true : false}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={value => {
                  setState(prevState => ({
                    ...prevState,
                    password: value,
                  }));
                  setHavePassword(value.trim());
                }}
              />

              <Icon
                style={styles.icon}
                name={hidePass ? 'eye-slash' : 'eye'}
                onPress={() => setHidePass(!hidePass)}
              />
            </View>
          </View>

          <Button
            text={languageDeterminer(LOGIN.button)}
            inactive={!haveAll}
            handlePress={handlePress}
          />

          <Text style={styles.haveAccount}>
            {languageDeterminer(LOGIN.caption)}
          </Text>

          <Pressable onPress={() => navigation.navigate('Registration')}>
            <Text style={styles.haveLogin}>
              {languageDeterminer(LOGIN.link)}
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titlePage: {
    textAlign: 'center',
    alignItems: 'center',
    color: '#EEFBFF',
    fontSize: 23,
    marginHorizontal: 32,
  },
  form: {
    marginTop: 80,
    backgroundColor: 'rgba(236, 242, 247, 0.24);',
    borderRadius: 14,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
  },
  inputText: {
    width: 105,
    color: 'white',
    fontSize: 18,
    paddingLeft: 25,
  },
  input: {
    maxWidth: 200,
    height: 50,
    color: 'white',
    padding: 16,
    fontSize: 18,
  },
  icon: {
    position: 'absolute',
    right: 15,
    maxWidth: 180,
    fontSize: 16,
    color: 'white',
  },
  haveAccount: {
    marginTop: 150,
    fontSize: 12,
    color: '#EEFBFF',
    textAlign: 'center',
    alignItems: 'center',
  },
  haveLogin: {
    fontSize: 14,
    color: '#95DFFF',
    textAlign: 'center',
    alignItems: 'center',
  },
});
