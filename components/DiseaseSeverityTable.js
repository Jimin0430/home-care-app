import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const DiseaseSeverityTable = () => {
  const severityData = [
    {
      level: "1단계",
      description:
        "기본적인 일상생활에서 자립으로 다른 사람의 도움이 전혀 필요하지 않으며, 의학적 치료도 필요하지 않음.",
    },
    {
      level: "2단계",
      description:
        "일상생활에서 자립으로 다른 사람의 도움이 거의 필요하지 않으며, 간혹 의학적 치료가 필요함.",
    },
    {
      level: "3단계",
      description: "일상생활에서 약간의 도움이 필요하며, 의학적 치료가 필요함.",
    },
    {
      level: "4단계",
      description:
        "일상생활에서 상당한 도움이 필요하며, 지속적인 의학적 치료가 필요함.",
    },
    {
      level: "5단계",
      description:
        "일상생활에서 완전히 다른 사람의 도움이 필요하며, 지속적인 의학적 치료가 필요함.",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}> 증세 정도 단계 기준표</Text>
      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.headerCell]}>단계</Text>
          <Text style={[styles.cellDiscript, styles.headerCell]}>설명</Text>
        </View>
        {severityData.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{item.level}</Text>
            <Text style={styles.cellDiscript}>{item.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  table: {
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  headerRow: {
    backgroundColor: "#f0f0f0",
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: "center",
  },
  cellDiscript: {
    flex: 2,
    padding: 10,
  },
  headerCell: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DiseaseSeverityTable;
