import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import auth from '@react-native-firebase/auth'
import { Text } from 'react-native'

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [emailSent, setEmailSent] = useState({ value: false, error:'' })

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    //navigation.navigate('LoginScreen')

    auth().sendPasswordResetEmail(email.value).then(function() {
      // Email sent.
      console.log('Password reset email sent to ' + email.value);
      setEmailSent({...emailSent, value: true})
    }).catch(function(err) {
      // An error happened.
      console.error(err);
      setEmailSent({...emailSent, error: err})
    });
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Restore Password</Header>
      {
        !emailSent.value ?
        (
          <React.Fragment>
            <TextInput
              label="E-mail address"
              returnKeyType="done"
              value={email.value}
              onChangeText={(text) => setEmail({ value: text, error: '' })}
              error={!!email.error}
              errorText={email.error}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              description="You will receive email with password reset link."
            />
            <Button
              mode="contained"
              onPress={sendResetPasswordEmail}
              style={{ marginTop: 16 }}
            >
              Send Instructions
            </Button>
            {
              !!emailSent.error &&
              <Text>Email failed to send. Please try again later.</Text>
            }
          </React.Fragment>
        ) :
        (
          <Text>Password reset email sent.</Text>
        )
      }
    </Background>
  )
}
