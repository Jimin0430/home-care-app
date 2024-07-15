import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, PanResponder, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const CustomSlider = ({ width = 320, disabled = false, initialValue = 0 }) => {
  const [currentValue, setCurrentValue] = useState(initialValue);
  const panX = useRef(new Animated.Value(initialValue * (width - 24))).current;
  const lastOffset = useRef(initialValue * (width - 24));

  const SLIDER_WIDTH = width;
  const THUMB_WIDTH = 24;
  const SLIDER_RANGE = SLIDER_WIDTH - THUMB_WIDTH;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: () => {
        lastOffset.current = panX._value;
      },
      onPanResponderMove: (_, gesture) => {
        if (disabled) return;
        let newValue = lastOffset.current + gesture.dx;
        newValue = Math.max(0, Math.min(newValue, SLIDER_RANGE));
        panX.setValue(newValue);
      },
      onPanResponderRelease: () => {
        if (disabled) return;
        lastOffset.current = panX._value;
        setCurrentValue((panX._value / SLIDER_RANGE) * 100);
      },
    })
  ).current;

  useEffect(() => {
    const listener = panX.addListener(({ value }) => {
      const clampedValue = Math.max(0, Math.min(value, SLIDER_RANGE));
      setCurrentValue((clampedValue / SLIDER_RANGE) * 100);
    });

    return () => {
      panX.removeListener(listener);
    };
  }, [panX, SLIDER_RANGE]);

  return (
    <View style={[styles.container, { width: SLIDER_WIDTH }]}>
      <View style={styles.sliderContainer}>
        <LinearGradient
          colors={["#FFE4E1", "#FFA07A", "#FF6347"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.sliderTrack}
        />
        <Animated.View
          style={[
            styles.sliderThumb,
            { transform: [{ translateX: panX }] },
            disabled && styles.disabledThumb,
          ]}
          {...panResponder.panHandlers}
        />
        {!disabled &&
          [1, 2, 3, 4, 5].map((step) => (
            <View
              key={step}
              style={[styles.stepMarker, { left: `${(step - 1) * 25}%` }]}
            />
          ))}
      </View>
      <View style={styles.labelContainer}>
        {[1, 2, 3, 4, 5].map((step) => (
          <Text key={step} style={styles.stepLabel}>
            {step}단계
          </Text>
        ))}
      </View>
      <Text style={styles.symptomLabel}>{currentValue.toFixed(2)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
  },
  sliderContainer: {
    height: 40,
    justifyContent: "center",
  },
  sliderTrack: {
    height: 12,
    borderRadius: 30,
  },
  sliderThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#FF6347",
    position: "absolute",
    top: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  disabledThumb: {
    backgroundColor: "#D3D3D3",
    borderColor: "#A9A9A9",
  },
  stepMarker: {
    width: 2,
    height: 16,
    backgroundColor: "#FFF",
    position: "absolute",
    top: 12,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  stepLabel: {
    fontSize: 12,
    color: "#888",
  },
  symptomLabel: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    color: "#FF6347",
  },
});

export default CustomSlider;
