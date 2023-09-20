import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';

const Loading = () => {
  return (
    <>
      <View style={styles.container}>
        <ActivityIndicator size={'small'} color="black" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Loading;
