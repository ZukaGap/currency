import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {Graph} from 'screens/DetailScreen/Model';

import getStyleObj from './style';

export interface ButtonData {
  label: string;
  value: number;
}

interface TabSwitchButtonProps {
  tabData: Graph[];
  onChange?: (item: ButtonData, index: number) => void;
  defaultValue?: number;
}

const TabSwitchButton = ({
  tabData,
  onChange = () => {},
  defaultValue,
}: TabSwitchButtonProps) => {
  const styles = getStyleObj({});
  const [active, setActive] = useState<ButtonData>(tabData?.[0]);
  const [focusSizes, setFocusSizes] = useState({height: 0, width: 0});
  const animatedRangeRef = useRef<number[]>([]);
  const offset = useSharedValue(4);

  useEffect(() => {
    if (defaultValue !== undefined) {
      handleOnPress(tabData?.[defaultValue], defaultValue);
      const rangeGenerate =
        defaultValue === 0
          ? 4
          : animatedRangeRef.current[defaultValue] * defaultValue + 4;
      offset.value = rangeGenerate;
    }
  }, [defaultValue, handleOnPress]);

  const handleOnPress = useCallback(
    (data: ButtonData, index: number) => {
      setActive(data);
      onChange(data, index);
    },
    [onChange],
  );

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value, {
            damping: 14,
            stiffness: 90,
            mass: 1,
            overshootClamping: false,
          }),
        },
      ],
    };
  });

  return (
    <View style={styles.mainContainer}>
      <Animated.View style={[styles.focus, focusSizes, customSpringStyles]} />
      {tabData?.map((item, index) => (
        <TouchableOpacity
          onPress={() => {
            handleOnPress(item, index);
            const rangeGenerate =
              index === 0 ? 4 : animatedRangeRef.current[index] * index + 4;
            offset.value = rangeGenerate;
          }}
          onLayout={event => {
            const {height, width} = event.nativeEvent.layout;
            if (index === 0) {
              setFocusSizes({height, width});
              animatedRangeRef.current[index] = width + 4;
            } else {
              setFocusSizes({height, width});
              animatedRangeRef.current[index] = width;
            }
          }}
          disabled={active?.value === item?.value}
          activeOpacity={0.7}
          style={styles.inactiveButton}
          testID={'switchLabelBTN'}
          accessibilityLabel={'switchLabelBTN'}>
          <Text
            numberOfLines={1}
            style={
              active?.value === item?.value
                ? styles.activeText
                : styles.inactiveText
            }
            testID={'switchLabel#' + item?.value}
            accessibilityLabel={'switchLabel#' + item?.value}>
            {item?.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TabSwitchButton;
