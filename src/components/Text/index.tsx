import {Text as TextRN} from 'react-native';
import React from 'react';

type Props = {
  text?: string;
  style?: any;
};

const Text = ({text, style}: Props) => {
  return <TextRN style={style}>{text}</TextRN>;
};

export default Text;
