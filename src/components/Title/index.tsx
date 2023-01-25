import {Text} from 'react-native';
import React from 'react';

type Props = {
  text?: string;
  style?: any;
};

const Title = ({text, style}: Props) => {
  return <Text style={style}>{text}</Text>;
};

export default Title;
