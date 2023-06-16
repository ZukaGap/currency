import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Extrapolate,
  Extrapolation,
  FadeInRight,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';

import {
  DrawerWrapperProps,
  DrawerWrapperRefProps,
} from 'types/drawerWrapperTypes';

import getStyleObj from './style';
import {colors} from 'styles/colors';
import {sizes} from 'styles/sizes';
import {fonts} from 'styles/fonts';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');

const THRESHOLD = SCREEN_WIDTH / 3;

// stack screens where we want navigate from Drawer
const TABS = [
  {
    key: 'homeScreen',
    name: 'Currency',
  },
  {
    key: 'fuelInfoScreen',
    name: 'Fuel',
  },
];

const DrawerWrapper: ForwardRefRenderFunction<
  DrawerWrapperRefProps,
  DrawerWrapperProps
> = ({children}, ref) => {
  const styles = getStyleObj({});
  const translateX = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const {replace} = useNavigation();

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number}
  >({
    onStart: (_, context) => {
      context.x = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = Math.max(event.translationX + context.x, 0);
    },
    onEnd: () => {
      if (translateX.value <= THRESHOLD) {
        translateX.value = withTiming(0);
      } else {
        translateX.value = withTiming(SCREEN_WIDTH / 1.6, {
          duration: 500,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
      }
    },
  });

  const childrenAnimStyle = useAnimatedStyle(() => ({
    transform: [
      {perspective: 100},
      {
        translateX: translateX.value,
      },
      {
        translateY: interpolate(
          translateX.value,
          [0, 100],
          [0, insets.top + 12],
          Extrapolation.CLAMP,
        ),
      },
      {
        rotate: `-${interpolate(
          translateX.value,
          [0, SCREEN_WIDTH],
          [0, 16],
          Extrapolate.CLAMP,
        )}deg`,
      },
    ],
    borderTopLeftRadius: interpolate(
      translateX.value,
      [0, 1],
      [0, 32],
      Extrapolation.CLAMP,
    ),
    paddingTop: interpolate(
      translateX.value,
      [0, SCREEN_WIDTH],
      [insets.top, 0],
      Extrapolation.CLAMP,
    ),
    overflow: 'hidden',
  }));

  const menuStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, 1], [0, 1], Extrapolation.CLAMP),
    transform: [
      {
        translateY: interpolate(
          translateX.value,
          [0, 100],
          [0, insets.top],
          Extrapolation.CLAMP,
        ),
      },
    ],
    borderTopLeftRadius: interpolate(
      translateX.value,
      [0, 1],
      [0, 32],
      Extrapolation.CLAMP,
    ),
  }));

  const onPress = useCallback(() => {
    if (translateX.value > 0) {
      translateX.value = withTiming(0);
    } else {
      translateX.value = withTiming(SCREEN_WIDTH / 1.6);
    }
  }, []);

  useImperativeHandle(ref, () => ({
    openDrawer: () => {
      onPress();
    },
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.drawerWrapper, menuStyle]}>
        <Text style={styles.name}>M-Economizer</Text>
        <View style={styles.drawerContent}>
          <View style={styles.screensWrapper}>
            {TABS?.map(item => (
              <TouchableOpacity
                disabled={item?.key === route?.name}
                onPress={() => {
                  replace(item.key);
                }}>
                <View
                  style={[
                    styles.screenBTN,
                    item.key === route?.name && styles.screenBTNActive,
                  ]}>
                  <Text
                    style={[
                      styles.screensTitle,
                      item?.key === route?.name && styles.screensTitleActive,
                    ]}>
                    {item?.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animated.View>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View
          entering={FadeInRight.delay(100).stiffness(50)}
          style={[styles.root, childrenAnimStyle]}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default forwardRef(DrawerWrapper);