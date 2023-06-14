import {useFont, Text} from '@shopify/react-native-skia';
import React from 'react';
import {useDerivedValue} from 'react-native-reanimated';

import {colors} from 'styles/colors';
import {GraphPoint} from 'react-native-graph';

const Montserrat = require('assets/fonts/Montserrat-Regular.ttf');
const format = (value: number) => {
  'worklet';
  return (
    '$ ' +
    Math.round(value)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  );
};

interface LabelProps {
  state: GraphPoint;
  width: number;
  height: number;
}

export const Label = ({state, width, height}: LabelProps) => {
  const titleFont = useFont(Montserrat, 64);
  const subtitleFont = useFont(Montserrat, 24);
  const translateY = height + 20;
  const label = new Date(state?.date);
  const titleX = useDerivedValue(() => {
    if (!titleFont) {
      return 0;
    }
    // const title = format(label || 0);
    const titleWidth = titleFont.getTextWidth(label);
    return width / 2 - titleWidth / 2;
  }, [state, titleFont]);

  const subtitleWidth =
    subtitleFont?.getTextWidth(String(state?.value) || '') + 2 || 0;

  return (
    <>
      <Text
        x={titleX}
        y={translateY - 120}
        text={label}
        font={titleFont}
        color={colors.Purple50}
      />
      <Text
        x={width / 2 - subtitleWidth / 2}
        y={translateY - 60}
        text={state?.value}
        font={subtitleFont}
        color={colors.Green400}
      />
    </>
  );
};
