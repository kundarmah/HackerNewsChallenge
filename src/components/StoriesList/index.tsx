import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import StoryCard from '../StoryCard';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {
  getStories,
  selectAll,
  StoriesState,
} from '../../stores/stories.reducer';
import {colors} from '../../utils/colors';
import {screenWidth} from '../../utils/screen';

const StoriesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const storiesState = useAppSelector(selectAll) as StoriesState;

  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {storiesState.loading === 'idle' ? (
        <FlatList
          style={styles.flatlist}
          data={storiesState.data}
          keyExtractor={(item, index) => `${item?.id}${index}`}
          renderItem={StoryCard}
        />
      ) : (
        <ActivityIndicator style={styles.activity} />
      )}
    </View>
  );
};

export default StoriesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flatlist: {
    width: screenWidth,
  },
  activity: {flex: 1, alignSelf: 'center'},
});
