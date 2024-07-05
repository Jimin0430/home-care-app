import { StatusBar } from "react-native";
import { Color } from "./color";

export const signInScreenStyle = {
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    gap: 59,
    paddingTop: StatusBar.currentHeight * 2.5,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    width: "100%",
    paddingLeft: 10,
  },
  buttonContainer: {
    width: "100%",
    gap: 25,
  },
  textBox: {
    backgroundColor: Color.gray200,
    borderRadius: 10,
    width: "100%",
    height: 75,
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 22,
  },
  subTitle: {
    color: "black",
    fontSize: 18,
    fontWeight: "700",
  },
  inputList: {
    width: "100%",
    flex: 1,
  },
  scrollViewContent: {
    width: "100%",
    padding: 21,
    gap: 25,
  },
  inputContainer: {
    width: "100%",
    gap: 11,
  },
  input: {
    backgroundColor: Color.gray200,
    borderRadius: 10,
    width: "100%",
    // height: 50,
    fontSize: 16,
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: Color.pink900,
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  explainText: {
    color: Color.gray900,
  },
};
