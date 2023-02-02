import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';

const index: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoCont}>
        <Text style={styles.logoText}>Y</Text>
      </View>
      <Text style={styles.headerText}>Hacker News</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.black,
  },
  logoText: {
    color: colors.background,
    fontSize: 20,
  },
  logoCont: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
    marginRight: 10,
  },
});
