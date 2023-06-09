import React, {useCallback, useRef, useState} from 'react';
import {TouchableOpacity, Text, View, Animated} from 'react-native';
import getStyleObj from './style';
import {Graph} from 'screens/DetailScreen/Model';

export interface ButtonData {
  label: string;
  value: number;
}

const TabSwitchButton = ({
  tabData,
  onChange = () => {},
}: {
  tabData: Graph[];
  onChange?: (item: ButtonData, index: number) => void;
}) => {
  const styles = getStyleObj({});
  const [active, setActive] = useState(tabData[0]);
  const anim = useRef(new Animated.Value(4));
  const [focusSizes, setFocusSizes] = useState({height: 0, width: 0});
  const animatedRangeRef = useRef<number[]>([]);

  const handleAnim = useCallback((value: number) => {
    Animated.spring(anim.current, {
      toValue: value,
      // duration: 2000,
      friction: 6,
      tension: 20,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleOnPress = useCallback(
    (data: ButtonData, index: number) => {
      setActive(data);
      onChange(data, index);
    },
    [onChange],
  );

  return (
    <View style={styles.mainContainer}>
      <Animated.View
        style={[
          styles.focus,
          focusSizes,
          {transform: [{translateX: anim.current}]},
        ]}
      />
      {tabData?.map((item, index) => (
        <TouchableOpacity
          onPress={() => {
            handleOnPress(item, index);
            const rangeGenerate =
              index === 0 ? 4 : animatedRangeRef.current[index] * index + 4;
            handleAnim(rangeGenerate);
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
          testID={'switchLeftBTN'}
          accessibilityLabel={'switchLeftBTN'}>
          <Text
            numberOfLines={1}
            style={
              active?.value === item?.value
                ? styles.activeText
                : styles.inactiveText
            }
            testID={'switchLeftLabel#' + item?.value}
            accessibilityLabel={'switchLeftLabel#' + item?.value}>
            {item?.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TabSwitchButton;
