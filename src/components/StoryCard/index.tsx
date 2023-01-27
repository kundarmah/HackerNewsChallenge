import {ListRenderItem, StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '../Text';
import {colors} from '../../utils/colors';
import moment from 'moment';
import Karma from '../Karma';

interface StoryProps {
  id: number;
  title: string;
  url: string;
  score: number;
  by: string;
  time: number;
  authorKarma: number;
}

const StoryCard: ListRenderItem<StoryProps> = ({item}) => {
  //Since some entries has url some has not
  function getDomainName(url: string): string | null {
    const match = url.match(/^(?:https?:\/\/)?(?:www\.)?([^/]+)/i);
    if (match) {
      return match[1];
    }
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleCont}>
        <Text style={styles.titleText} text={item?.title} />
      </View>
      {item?.url && (
        <Text
          style={[styles.descText, styles.url]}
          text={`(${getDomainName(item?.url)})`}
        />
      )}
      <View style={styles.desc}>
        <Text style={styles.descText} text={`${item?.score} points `} />
        <Text style={styles.descText} text={`by ${item?.by} `} />
        <Karma id={item?.by} />
        <Text
          style={styles.descText}
          text={` • ${moment.unix(item?.time).fromNow()}`}
        />
      </View>
    </View>
  );
};

export default StoryCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.secondary,
    marginBottom: 10,
    paddingVertical: 4,
    padding: 10,
  },
  text: {
    color: 'black',
  },
  desc: {
    flexDirection: 'row',
  },
  descText: {
    color: colors.text,
    fontSize: 12,
  },
  titleCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  url: {
    fontSize: 10,
  },
  titleText: {
    color: colors.black,
  },
});
