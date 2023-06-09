import {View} from 'react-native';
import {GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Canvas,
  Path,
  Group,
  LinearGradient,
  vec,
} from '@shopify/react-native-skia';

import {Cursor} from './componentsChild/Cursor';
import {Label} from './componentsChild/Label';

export default function GraphComponent(
  width: number,
  height: number,
  state: any,
) {
  return (
    <View>
      <Canvas style={{width, height: 2 * height + 30}}>
        <Label
          state={state}
          y={y}
          graphs={graphs}
          width={width}
          height={height}
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
  );
}
