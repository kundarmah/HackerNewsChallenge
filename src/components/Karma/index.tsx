import React, {Suspense, useEffect, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {fetchUserId} from '../../stores/stories.reducer';
import {colors} from '../../utils/colors';

type Props = {
  id: string;
};

const Karma = ({id}: Props) => {
  const [karma, setKarma] = useState();
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    async function getKarma() {
      const resp = await fetchUserId(id);
      setKarma(resp.karma);
      setRefreshing(false);
    }

    getKarma();
  }, [id]);

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <View style={styles.container}>
        <Text style={styles.descText}>{`[ ${karma || ''} karma ] `}</Text>
      </View>
    </Suspense>
  );
};

const styles = StyleSheet.create({
  descText: {
    color: colors.text,
    fontSize: 12,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(Karma);
