import { StatusBar, StyleSheet } from "react-native";
import { Color } from "./color";

export const signInScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    gap: 40,
    paddingTop: StatusBar.currentHeight,
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
  inputContainer: {
    width: "100%",
    gap: 11,
  },
  input: {
    backgroundColor: Color.gray200,
    borderRadius: 10,
    width: "100%",
    fontSize: 16,
    borderWidth: 0,
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  boxInnerText: {
    color: Color.gray800,
    fontSize: 16,
    justifyContent: "center",
  },
  button: {
    backgroundColor: Color.pink900,
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  explainText: {
    color: Color.gray900,
    width: "100%",
    paddingLeft: 10,
  },
  scrollViewContent: {
    width: "100%",
    padding: 21,
    gap: 25,
  },
  keyboardPush: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonHorizontal: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
  buttonShort: {
    flex: 1,
    backgroundColor: Color.pink900,
    color: "white",
    paddingVertical: 23,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

export const commonLayoutStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
});

export const profileScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileSection: {
    flexDirection: "row",
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    position: "relative",
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    // Android shadow
    elevation: 10,
  },
  profileImage: {
    flex: 1,
    resizeMode: "contain",
  },
  profileInfo: {
    flex: 1.5,
  },
  profileInfoTopSection: {
    flex: 1,
    gap: 1,
  },
  certificateAlign: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    height: "100%",
    fontSize: 18,
    fontWeight: "bold",
  },
  badge: {
    fontSize: 13,
    color: Color.gray900,
    paddingLeft: 1,
    fontWeight: "semibold",
  },
  badgeInfoData: {
    flex: 1.5,
    color: Color.gray800,
    fontWeight: "500",
  },
  detailContainer: {
    flex: 1,
    paddingVertical: 11,
    gap: 3,
  },
  details: {
    fontSize: 13,
    color: Color.gray900,
  },
  ratingContainer: {
    position: "absolute",
    top: 17,
    right: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 5,
  },
  section: {
    padding: 30,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 15,
  },
  sectionInfo: {
    flex: 1,
    flexDirection: "column",
    gap: 13,
  },
  label: {
    flex: 1,
    color: Color.gray800,
    // backgroundColor: "pink",
  },
  infoData: {
    flex: 1.5,
    color: Color.gray800,
    fontWeight: "500",
  },
  sectionKey: {
    flex: 1,
    flexDirection: "column",
  },
  sectionData: {
    flex: 3,
    flexDirection: "column",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  badgeContainer: {
    flex: 1.5,
    backgroundColor: "#fff",
    gap: 6,
  },
  badgeRow: {
    flex: 1,
    flexDirection: "row",
    borderBottomColor: Color.gray500,
    borderBottomWidth: 0.5,
    paddingVertical: 4,
    paddingRight: 6,
  },
  moreLink: {
    flex: 1,
    color: Color.gray900,
    textAlignVertical: "center",
  },
  reviewText: {
    flex: 1,
    color: Color.gray800,
    fontWeight: "500",
    paddingHorizontal: 10,
  },
  subInfoContainer: {
    flex: 1,
    width: "100%",
    marginLeft: 10,
    marginTop: 5,
    gap: 2,
  },
  subInfoRow: {
    flexDirection: "row",
  },
  subInfoLabel: {
    flex: 1.1,
    fontSize: 14,
    color: "#888",
    marginRight: 10,
  },
  subInfoValue: {
    flex: 2,
    fontSize: 14,
    color: "#888",
    marginRight: 10,
  },
  arrayValueContainer: {
    flex: 2,
    flexDirection: "column",
    gap: 2,
  },
  highlightedText: {
    color: "#FF6347",
  },
  bottomButton: {
    marginHorizontal: 30,
    backgroundColor: Color.pink900,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  bottomButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
