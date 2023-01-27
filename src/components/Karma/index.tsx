import React, {Suspense, useEffect, useState} from 'react';
import {Text, ActivityIndicator, StyleSheet} from 'react-native';
import {fetchUserId} from '../../stores/stories.reducer';
import {colors} from '../../utils/colors';

type Props = {
  id: string;
};

const Karma = ({id}: Props) => {
  const [karma, setKarma] = useState();
  useEffect(() => {
    async function getKarma() {
      const resp = await fetchUserId(id);
      setKarma(resp.karma);
    }

    getKarma();
  }, [id]);

  return (
    <Suspense fallback={<ActivityIndicator />}>
      <Text style={styles.descText}>{`[ ${karma || ''} karma ] `}</Text>
    </Suspense>
  );
};

const styles = StyleSheet.create({
  descText: {
    color: colors.text,
    fontSize: 10,
  },
});

export default Karma;
