import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useSafeAreaInsets, SafeAreaView} from 'react-native-safe-area-context';
import {
  View,
  Text,
  FlatList,
  Animated,
  Pressable,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import Svg, {G, Circle} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useRecoilState} from 'recoil';

import {TabSwitchButton} from 'components';
import {getSavedLanguageAtom} from 'store/atom/getSettingsInfoAtom';

import getStyleObj from './style';
import {RightArrow, Logo} from 'assets/SVG';
import {colors} from 'styles/colors';
import {INTRODUCTION_PASSED} from 'constants/storage';
import {writeStorage} from 'utils/asyncStorage';

const size = 64;
const strokeWidth = 2;
const center = size / 2;
const radius = size / 2 - strokeWidth / 2;
const circumference = 2 * Math.PI * radius;

const {width, height} = Dimensions.get('window');

const WelcomeTourScreen: React.FC = ({}) => {
  const {navigate, replace} = useNavigation();
  const {t, i18n} = useTranslation();
  const insets = useSafeAreaInsets();
  const styles = getStyleObj({insets});
  const keyExtractor = useCallback(item => `StartupScreen#${item.id}`, []);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  const slidesRef = useRef(null);
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);
  const bannerData = useMemo(
    () => [
      {
        id: '0',
        title: t('screens.welcomeTour.chooseLanguage'),
        description: '',
        png: require('assets/introductionSVG/Tour01.png'),
      },
      {
        id: '1',
        title: t('screens.welcomeTour.currency'),
        description: t('screens.welcomeTour.currencyDescription'),
        png: require('assets/introductionSVG/Tour02.png'),
      },
      {
        id: '2',
        title: t('screens.welcomeTour.petrol'),
        description: t('screens.welcomeTour.petrolDescription'),
        png: require('assets/introductionSVG/Tour03.png'),
      },
    ],
    [t],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [percentage, setPercentage] = useState();
  const [savedLanguage, setSavedLanguage] =
    useRecoilState(getSavedLanguageAtom);

  const graphsData = useMemo(() => {
    return [
      {
        label: t('screens.settings.geo'),
        value: 0, //'ka-US',
      },
      {
        label: t('screens.settings.eng'),
        value: 1, //'en',
      },
    ];
  }, [t]);

  const animation = (toValue = 0) => {
    try {
      if (toValue >= 0 && toValue <= 100) {
        return Animated.timing(progressAnimation, {
          toValue,
          duration: 250,
          useNativeDriver: true,
        }).start();
      }
    } catch (err) {
      console.log('WelcomeTourScreen#animation', err);
    }
  };

  const updatedIntroductionValue = useCallback(async () => {
    await writeStorage(INTRODUCTION_PASSED, 'true');
  }, []);

  const calculateStrokePosition = useCallback(page => {
    const pageSizes = 4;
    const transformCount = page + 1;
    return transformCount * (100 / (pageSizes - 1));
  }, []);

  useEffect(() => {
    setPercentage(() => calculateStrokePosition(currentIndex));
  }, [currentIndex]);

  const renderItem = useCallback(({item: {description, title, png}, index}) => {
    return (
      <View style={styles.center}>
        <FastImage
          style={styles.banner}
          resizeMode={FastImage.resizeMode.contain}
          source={png}
        />
        <View style={[styles.info]}>
          <Text style={[styles.title]}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          {index === 0 && (
            <TabSwitchButton
              defaultValue={savedLanguage?.language === 'en' ? 1 : 0}
              tabData={graphsData}
              onChange={item => {
                i18n.changeLanguage(item.value ? 'en' : 'ka-US');
              }}
            />
          )}
        </View>
      </View>
    );
  }, []);

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(
      value => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;
        if (progressRef?.current) {
          progressRef.current.setNativeProps({strokeDashoffset});
        }
      },
      [percentage],
    );
    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);

  const scrollTo = useCallback(async () => {
    if (currentIndex < bannerData.length - 1) {
      slidesRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      try {
        // last item press action
        updatedIntroductionValue();
        replace('homeScreen');
      } catch (err) {
        navigate('homeScreen');
      }
    }
  }, [bannerData.length, currentIndex, navigate, replace]);

  const viewableItemsChange = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0]?.index);
  }).current;

  const skipText = useMemo(() => t('screens.welcomeTour.skip'), [t]);

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <StatusBar backgroundColor={colors.white} barStyle={'light-content'} />
      <View style={styles.logoWrapper}>
        <Logo width={56} height={56} />
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => {
            updatedIntroductionValue();
            navigate('homeScreen');
          }}>
          <Text style={styles.skip}>{skipText}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainContainer}>
        <FlatList
          ref={slidesRef}
          data={bannerData}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={keyExtractor}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChange}
          viewabilityConfig={viewConfig}
          // contentContainerStyle={styles.listItemContainer}
        />
      </View>
      <View style={styles.nextButtonWrapper}>
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {/* Render indicator */}
          {bannerData.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [0.1, 1, 0.1],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={index}
                style={[styles.indicator, {opacity: dotWidth}]}
              />
            );
          })}
        </View>
        <Pressable style={styles.centerWrapper} onPress={scrollTo}>
          <Svg width={size} height={size}>
            <G rotation={'-90'} origin={center}>
              <Circle
                cx={center}
                cy={center}
                r={radius}
                strokeWidth={strokeWidth}
                stroke={colors.white}
              />
              <Circle
                ref={progressRef}
                cx={center}
                cy={center}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                // strokeDashoffset={circumference + (circumference * 25) / 100}
                stroke={currentIndex == 2 ? colors.purple : colors.purple03}
                fill={colors.purple01}
              />
            </G>
          </Svg>
          <View style={styles.nextButton}>
            <RightArrow
              fill={currentIndex == 2 ? colors.purple : colors.white}
              width={40}
              height={24}
            />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeTourScreen;
