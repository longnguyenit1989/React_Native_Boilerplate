import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {authAction} from '../redux/slices/authSlice';
import Loading from '../components/loading';
import {ListRequest, UserListResponse} from '../data/apis/listApi';
import {
  homeAction,
  listSelector,
  loadingSelector,
  userSelector,
} from '../redux/slices/homeSlice';

type Props = {
  navigation: any;
};

const Item = (item: UserListResponse) => {
  return (
    <View style={styles.item}>
      <Text>{item.name}</Text>
      <Text>{item.website}</Text>
    </View>
  );
};

const Home = (props: Props) => {
  const [items, setItems] = useState<UserListResponse[]>([]);
  const [title, setTile] = useState('Home');
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(loadingSelector);
  const dataUser = useAppSelector(userSelector);
  const dataList = useAppSelector(listSelector);

  const logout = () => {
    dispatch(authAction.logout());
    dispatch(homeAction.reset());
  };

  useEffect(() => {
    if (dataUser) {
      setTile(dataUser.name ?? '');
    }
  }, [dataUser]);

  useEffect(() => {
    if (dataList && dataList.array) {
      setItems(dataList.array);
    }
  }, [dataList]);

  useEffect(() => {
    const payload: ListRequest = {
      queryParameters: {page: 1, sort: 'ascending'},
    };
    dispatch(homeAction.init(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    props.navigation.setOptions({
      title: title,
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            logout();
          }}>
          <Text>Logout</Text>
        </TouchableOpacity>
      ),
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            const payload: ListRequest = {
              queryParameters: {page: 1, sort: 'ascending'},
            };
            dispatch(homeAction.init(payload));
          }}>
          <Text>Reload</Text>
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <FlatList
        data={items}
        renderItem={({item}) => Item(item)}
        keyExtractor={item => (item.id ?? 0).toString()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 10,
    margin: 10,
  },
});

export default Home;
