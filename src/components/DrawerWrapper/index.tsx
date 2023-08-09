import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
import {
  BackHandler,
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Extrapolate,
  Extrapolation,
  FadeInRight,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {
  DrawerWrapperProps,
  DrawerWrapperRefProps,
} from 'types/drawerWrapperTypes';

import getStyleObj from './style';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');

const THRESHOLD = SCREEN_WIDTH / 3;

// stack screens where we want navigate from Drawer

const DrawerWrapper: ForwardRefRenderFunction<
  DrawerWrapperRefProps,
  DrawerWrapperProps
> = ({children}, ref) => {
  const styles = getStyleObj({});
  const translateX = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const {replace} = useNavigation();
  const {t} = useTranslation();
  const animatedProps = useAnimatedProps(() => {
    const pointerEvents = translateX.value === 0 ? 'auto' : 'none';
    return {
      pointerEvents,
    };
  }, [translateX.value]);
  const TABS = useMemo(() => {
    return [
      {
        key: 'homeScreen',
        name: t('screens.currency.name'),
      },
      {
        key: 'fuelInfoScreen',
        name: t('screens.fuel.name'),
      },
      {
        key: 'settingsScreen',
        name: t('screens.settings.name'),
      },
    ];
  }, [t]);

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
    'worklet';
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

  const closeDrawer = useCallback(() => {
    'worklet';
    if (translateX.value > 0) {
      translateX.value = withTiming(0);
    }
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (translateX.value > 0) {
          translateX.value = withTiming(0);
          return true;
        } else {
          return false;
        }
      },
    );

    return () => backHandler.remove();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={closeDrawer} style={styles.container}>
      {/* <View style={styles.container}> */}
      <StatusBar
        animated={true}
        translucent={true}
        backgroundColor="transparent"
      />
      <Animated.View style={[styles.drawerWrapper, menuStyle]}>
        <Text style={styles.name}>M-Economizer</Text>
        <View style={styles.drawerContent}>
          <ScrollView style={styles.screensWrapper}>
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
          </ScrollView>
        </View>
      </Animated.View>
      <PanGestureHandler
        onGestureEvent={panGestureEvent}
        failOffsetY={[-5, 5]}
        activeOffsetX={[-5, 5]}>
        <Animated.View
          entering={FadeInRight.delay(100).stiffness(50)}
          style={[styles.root, childrenAnimStyle]}>
          <Animated.View {...{animatedProps}} style={[styles.root]}>
            {children}
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
      {/* </View> */}
    </TouchableWithoutFeedback>
  );
};

export default forwardRef(DrawerWrapper);