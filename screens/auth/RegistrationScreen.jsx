import React, { useState, useEffect } from 'react';
import {
  useWindowDimensions,
  TouchableWithoutFeedback,
  TextInput,
  Platform,
  Pressable,
  Keyboard,
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import { authSignUpUser } from 'redux';
import { useLanguage } from 'context';
import { languageWrapper } from 'middlewares';
import { Button } from 'components';
import { REGISTRATION } from 'constants';

const initialState = {
  email: '',
  name: '',
  phone: '',
  password: '',
};

export default function RegistrationScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const language = useLanguage();

  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const [haveEmail, setHaveEmail] = useState(null);
  const [haveName, setHaveName] = useState(null);
  const [havePhone, setHavePhone] = useState(null);
  const [havePassword, setHavePassword] = useState(false);
  const [haveAll, setHaveAll] = useState(false);

  useEffect(() => {
    setHaveAll(haveEmail && havePassword ? true : false);
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
        languageDeterminer(REGISTRATION.alert.noEmail.title),
        languageDeterminer(REGISTRATION.alert.noEmail.description),
        [{ text: 'Ok' }],
      );
    } else if (!haveName || haveName === '') {
      setHaveAll(false);
      Alert.alert(
        languageDeterminer(REGISTRATION.alert.noName.title),
        languageDeterminer(REGISTRATION.alert.noName.description),
        [{ text: 'Ok' }],
      );
    } else if (!havePhone || havePhone === '') {
      setHaveAll(false);
      Alert.alert(
        languageDeterminer(REGISTRATION.alert.noPhone.title),
        languageDeterminer(REGISTRATION.alert.noPhone.description),
        [{ text: 'Ok' }],
      );
    } else if (!havePassword || havePassword === '') {
      setHaveAll(false);
      Alert.alert(
        languageDeterminer(REGISTRATION.alert.noPassword.title),
        languageDeterminer(REGISTRATION.alert.noPassword.description),
        [{ text: 'Ok' }],
      );
    } else {
      keyboardHide();
      setHaveAll(true);
      dispatch(
        authSignUpUser(
          state,
          languageDeterminer(REGISTRATION.alert.authSignUpUser),
        ),
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
        <Text style={styles.titlePage}>
          {languageDeterminer(REGISTRATION.welcome)}
        </Text>

        <Text style={styles.titlePage}>
          {languageDeterminer(REGISTRATION.title)}
        </Text>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View
            style={{
              ...styles.form,
              marginTop: 20,
              width: width - 20 * 2,
              marginBottom: isShowKeyboard ? 40 : 10,
            }}
          >
            <View style={styles.row}>
              <Text style={styles.inputText}>
                {languageDeterminer(REGISTRATION.input.name)}
              </Text>

              <TextInput
                style={styles.input}
                textAlign={'center'}
                autoFocus
                selectionColor="red"
                value={state.name}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={value => {
                  setState(prevState => ({ ...prevState, name: value }));
                  setHaveName(value.trim());
                }}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.inputText}>
                {languageDeterminer(REGISTRATION.input.email)}
              </Text>

              <TextInput
                style={styles.input}
                textAlign="left"
                selectionColor="red"
                value={state.email}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={value => {
                  setState(prevState => ({ ...prevState, email: value }));
                  setHaveEmail(value.trim());
                }}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.inputText}>
                {languageDeterminer(REGISTRATION.input.phone)}
              </Text>

              <TextInput
                style={styles.input}
                textAlign="left"
                value={state.phone}
                selectionColor="red"
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={value => {
                  setState(prevState => ({
                    ...prevState,
                    phone: value,
                  }));
                  setHavePhone(value.trim());
                }}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.inputText}>
                {languageDeterminer(REGISTRATION.input.password)}
              </Text>

              <TextInput
                style={styles.input}
                textAlign="left"
                value={state.password}
                secureTextEntry={true}
                selectionColor="red"
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
            text={languageDeterminer(REGISTRATION.button)}
            inactive={!haveAll}
            handlePress={handlePress}
          />

          <View>
            <Text style={styles.haveAccount}>
              {languageDeterminer(REGISTRATION.caption)}
            </Text>
          </View>

          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.haveLogin}>
              {languageDeterminer(REGISTRATION.link)}
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
    fontSize: 16,
  },
  input: {
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
