import React from 'react';
import {Text, View} from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

import getStyleObj from './style';
import {colors} from 'styles/colors';

interface Props {
  title: string;
  isEnabled: boolean;
  setIsEnabled: (isEnabled: boolean) => void;
}

export default function Toggle({
  title,
  isEnabled,
  setIsEnabled = () => {},
}: Props) {
  const styles = getStyleObj();

  return (
    <View style={styles.row}>
      <Text style={[styles.toggleText, {color: colors.white}]}>{title}</Text>

      <View style={styles.spacer} />

      <SegmentedControl
        style={styles.segmentedControl}
        values={['yes', 'no']}
        selectedIndex={isEnabled ? 0 : 1}
        onValueChange={v => setIsEnabled(v === 'yes')}
      />
    </View>
  );
}
