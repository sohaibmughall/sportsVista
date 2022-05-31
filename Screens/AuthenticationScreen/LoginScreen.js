import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Google from "expo-auth-session/providers/google";

import { firebase } from "../../src/firebase/config";
import Colors from "../../constant/Colors";
import Button from "../../components/Forms/Button";
import FormInputError from "../../components/FormInputError";
//formik
import * as Yup from "yup";
import { Formik } from "formik";
import Input from "../../components/Forms/Input";
const LogInScreen = (props) => {
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [loaderLoading, setLoaderLoading] = useState(false);

  const handleSubmit = async (loginDetails) => {
    try {
      setLoaderLoading(true);
      await firebase
        .auth()
        .signInWithEmailAndPassword(loginDetails.email, loginDetails.password);

      // navigate to home screen
      props.navigation.navigate("Drawer Screen");
      setLoaderLoading(false);
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        // Show error on the screen, for now I just console logged.
        console.log("Invalid email or password");
      }

      if (error.code === "auth/user-not-found") {
        // Show error on the screen, for now I just console logged.
        console.log(
          "There is no user record corresponding to this email or password"
        );
      }

      // Show error on the screen, for now I just console logged.
      console.log("Something went wrong!");

      setErrorDisplay(true);
      setLoaderLoading(false);
    }
  };

  const googleSignInHandler = async () => {
    // GoogleSignin.configure();
    try {
      Google.useAuthRequest({
        clientId:
          "319624225408-22rmk3v0i7fppu6tt6n6p9qmbjqq05o7.apps.googleusercontent.com",
      });
      // await GoogleSignin.hasPlayServices();
      // // Get the users ID token
      // const { idToken } = await GoogleSignin.signIn();

      // // Create a Google credential with the token
      // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // // Sign-in the user with the credential
      // await auth().signInWithCredential(googleCredential);

      // Navigate to home screen
    } catch (error) {
      // Show error on the screen, for now I just console logged.
      // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //   console.log("You cancelled the login flow");
      // }
      // // Show error on the screen, for now I just console logged.
      // else if (error.code === statusCodes.IN_PROGRESS) {
      //   console.log("Operation is in progress already");
      // }
      // // Show error on the screen, for now I just console logged.
      // else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //   console.log("Play services not available or outdated");
      // }
      // // Show error on the screen, for now I just console logged.
      // else {
      console.log("Something went wrong!");
      // }
    }
  };

  // const anonymousHandler = async () => {
  //   try {
  //     await firebaseAuth.signInAnonymously();

  //     // Navigate to home screen

  //   } catch (error) {
  //     if (error.code === "auth/operation-not-allowed") {
  //       // Show error on the screen, for now I just console logged.
  //       console.log("Enable anonymous in your firebase console.");
  //     }
  //     // Show error on the screen, for now I just console logged.
  //     console.log("Something went wrong!");
  //   }
  // };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/Images/SignIn.png")}
              resizeMode="contain"
              style={styles.imageStyle}
            />
          </View>
          <View style={styles.headingContainer}>
            <Text style={styles.headingStyle}>Sign In</Text>
          </View>
          <View style={styles.subHeadingContainer}>
            <Text style={styles.subHeading}>
              Taxation is the price which civilized communities pay for the
              opportunity of remaining civilized.
            </Text>
          </View>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              handleSubmit,
            }) => (
              <>
                <View style={styles.inputContainer}>
                  <Input
                    title="Email Address"
                    placeholder="xyz@gmail.com"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={() => setFieldTouched("email")}
                  />
                  <FormInputError
                    touched={touched.email}
                    errors={errors.email}
                  />
                  <Input
                    title="Password"
                    placeholder="**********"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={() => setFieldTouched("password")}
                    secureTextEntry={true}
                  />
                  <FormInputError
                    touched={touched.password}
                    errors={errors.password}
                  />
                </View>

                <View>
                  <Button
                    title="Sign In"
                    externalTextStyle={styles.buttonTextColor}
                    onPress={handleSubmit}
                    externalButtonContainerStyle={styles.buttonStyle}
                    loader={loaderLoading}
                  />
                </View>
              </>
            )}
          </Formik>
          <View style={styles.disturbutionStyle}>
            <View style={styles.disturbutionContainer}></View>
            <Text style={styles.orTextStyle}>OR</Text>
            <View style={styles.disturbutionContainer}></View>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={styles.extraLoginContainerStyle}
              onPress={googleSignInHandler}
            >
              <Text style={styles.extraLoginTextStyle}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.extraLoginContainerStyle}
              onPress={() => props.navigation.navigate("Drawer Screen")}
            >
              <Text style={styles.extraLoginTextStyle}>Guest</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
  },
  imageContainer: {
    marginTop: 25,
  },
  headingContainer: {
    paddingVertical: 10,
  },
  subHeadingContainer: {
    paddingVertical: 10,
  },
  inputContainer: {
    paddingTop: 10,
  },
  forgetPasswordContainer: {
    paddingVertical: 5,
    alignItems: "flex-end",
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    borderRadius: 10,
    width: "100%",
  },

  signUpContainer: {
    paddingVertical: 10,

    alignItems: "center",
    marginTop: 20,
  },
  imageStyle: {
    width: 80,
    height: 80,
  },
  headingStyle: {
    fontSize: 30,
    color: Colors.primary,
    fontFamily: "montserrat-bold",
  },
  subHeading: {
    fontSize: 15,
    color: Colors.accent,
    fontFamily: "montserrat-regular",
  },
  forgetPasswordStyle: {
    fontSize: 15,
    color: Colors.accent,
    fontFamily: "montserrat-regular",
  },
  signUptext: {
    fontSize: 15,
    color: Colors.accent,
    fontFamily: "montserrat-regular",
  },
  boldStyle: {
    fontSize: 15,
    color: Colors.primary,
    fontFamily: "montserrat-bold",
  },
  disturbutionStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  disturbutionContainer: {
    borderBottomWidth: 1,
    width: 100,
    height: 10,
    borderColor: "#000",
  },
  orTextStyle: {
    fontSize: 18,
    fontFamily: "montserrat-semiBold",
    paddingHorizontal: 10,
  },
  extraLoginContainerStyle: {
    backgroundColor: "#2d415a",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
  },
  extraLoginTextStyle: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "montserrat-semiBold",
  },
});

export default LogInScreen;
