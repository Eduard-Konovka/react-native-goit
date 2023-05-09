import { Alert } from 'react-native';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { auth } from 'db';
import { authSlice } from './authReducer';

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ email, name, phone, password }, errorTitle) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);

      const user = await auth.currentUser;

      await updateProfile(user, {
        displayName: name,
        phoneNumber: phone,
      });

      const { displayName, uid } = await auth.currentUser;

      const userUpdateProfile = {
        userId: uid,
        name: displayName,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      Alert.alert(errorTitle, error.message, [{ text: 'Ok' }]);
    }
  };

export const authSignInUser =
  ({ email, password }, errorTitle) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
    } catch (error) {
      Alert.alert(errorTitle, error.message, [{ text: 'Ok' }]);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, user => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        name: user.displayName,
      };

      dispatch(updateUserProfile(userUpdateProfile));
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};
