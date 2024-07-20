import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Color } from "../styles/color";

const CareerListItem = ({ item }) => (
  <View style={styles.careerItem}>
    <Text style={styles.careerText}>{item.career}</Text>
    <AntDesign
      name={item.certified ? "checksquare" : "checksquareo"}
      size={20}
      color={item.certified ? Color.grin500 : Color.grin500}
    />
  </View>
);

const CareerList = ({ data }) => (
  <View>
    {data.map((item, index) => (
      <CareerListItem key={index.toString()} item={item} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  careerItem: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 0.5,
    borderColor: Color.gray500,
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  careerText: {
    fontSize: 16,
  },
});

export default CareerList;
