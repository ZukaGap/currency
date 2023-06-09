import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Canvas,
  Path,
  Group,
  LinearGradient,
  vec,
} from '@shopify/react-native-skia';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {GestureDetector} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TabSwitchButton, {ButtonData} from 'components/TabSwitchButton';
import {useNavigation, useRoute} from '@react-navigation/native';

import {PADDING, COLORS, getGraph, Graph, buildGraph, PriceList} from './Model';
import {getYForX} from './Math';
import {Cursor} from './componentsChild/Cursor';
import {List} from './componentsChild/List';
import {Header} from './componentsChild/Header';
import {Label} from './componentsChild/Label';
import {useGraphTouchHandler} from './componentsChild/useGraphTouchHandler';
import {CurrenciesType, fetchCurrencyDetails} from 'config/Axios/getAPI';

import {Back} from 'assets/SVG';
import {sizes} from 'styles/sizes';
import {colors} from 'styles/colors';
import getStyleObj from './style';
import {subMonths} from 'date-fns';

const touchableCursorSize = 80;

export const DetailScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const styles = getStyleObj(insets);
  const {width, height} = useWindowDimensions();
  const {params} = useRoute();
  const {code, rate, name}: CurrenciesType = params || {};
  const {setOptions, goBack} = useNavigation();
  const calcHeight = Math.min(width, height) / 2;
  const translateY = calcHeight + PADDING;
  const [rangeOfDate, setRangeOfDate] = useState<number>(0);
  const [indexOfTab, setIndexOfTab] = useState<number>(0);
  // animation value to transition from one graph to the next
  const transition = useSharedValue(0);
  // indicices of the current and next graphs
  const state = useSharedValue({
    next: 0,
    current: 0,
  });
  const graphsData = useSharedValue<Graph[]>([
    {
      label: '1W',
      value: 0,
    },
    {
      label: '1M',
      value: 1,
    },
    {
      label: '3M',
      value: 3,
    },
    {
      label: '6M',
      value: 6,
    },
    {
      label: '1Y',
      value: 12,
    },
  ]);

  useEffect(() => {
    getCurrencyInRange();
  }, [rangeOfDate]);

  const graphs = useMemo(
    () => getGraph(code, rangeOfDate, width, calcHeight),
    [code, width, calcHeight, rangeOfDate],
  );
  // path to display
  const path = useDerivedValue(() => {
    const {current, next} = state.value;
    const start = graphs[current].data.path;
    const end = graphs[next].data.path;
    return end.interpolate(start, transition.value)!;
  }, [graphsData]);
  //   and y values of the cursor
  const x = useSharedValue(0);
  const y = useDerivedValue(() => {
    return getYForX(path.value.toCmds(), x.value);
  }, [path, x]);

  const getCurrencyInRange = useCallback(
    async (index?: number) => {
      if (graphsData.value[index || indexOfTab].data === undefined) {
        const response = await fetchCurrencyDetails(
          [code],
          subMonths(new Date(), rangeOfDate),
          new Date(),
        );
        const prices: PriceList = response?.map(item => {
          return [
            item?.currencies?.[0]?.validFromDate,
            item?.currencies?.[0]?.rate,
            item?.currencies?.[0]?.diff,
          ];
        });
        const renewGraphs = buildGraph(
          {percent_change: 0, prices: prices},
          graphsData.value[index || indexOfTab].label,
          width,
          height,
        );
        graphsData.value[index || indexOfTab] = {
          ...graphsData.value[index || indexOfTab],
          data: renewGraphs,
        };
      }
    },
    [graphsData.value, rangeOfDate, code, width, height, indexOfTab],
  );

  const gesture = useGraphTouchHandler(x, width - 16);
  const style = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      width: touchableCursorSize,
      height: touchableCursorSize,
      left: x.value - touchableCursorSize / 2,
      top: translateY + y.value - touchableCursorSize / 2,
    };
  });

  useEffect(() => {
    setOptions({
      title: name,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}>
          <Back width={sizes.is} height={sizes.is} fill={colors.purple03} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.safeAreaWrapper}>
      <View>
        <Canvas style={{width, height: 2 * calcHeight + 30}}>
          <Label
            state={state}
            y={y}
            graphs={graphs}
            width={width}
            height={calcHeight}
          />
          <Group transform={[{translateY}]}>
            <Path
              style="stroke"
              path={path}
              strokeWidth={4}
              strokeJoin="round"
              strokeCap="round">
              <LinearGradient
                start={vec(0, 0)}
                end={vec(width, 0)}
                colors={COLORS}
              />
            </Path>
            <Cursor x={x} y={y} width={width} />
          </Group>
        </Canvas>
        <GestureDetector gesture={gesture}>
          <Animated.View style={style} />
        </GestureDetector>
      </View>
      <View style={{paddingHorizontal: 16, paddingBottom: 16}}>
        <TabSwitchButton
          tabData={graphsData.value}
          onChange={(item, index) => {
            state.value = {current: state.value.next, next: index};
            transition.value = 0;
            transition.value = withTiming(1, {
              duration: 750,
            });
            setRangeOfDate(item?.value);
            setIndexOfTab(index);
          }}
        />
      </View>
      <List />
    </View>
  );
};
