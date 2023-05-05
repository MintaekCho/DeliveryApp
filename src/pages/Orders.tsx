import React, {useCallback} from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import OrderItem from '../components/OrderItem';
import orderSlice, {Order} from '../slices/order';
import {useAppDispatch} from '../store';
import {RootState} from '../store/reducer';

export default function Orders() {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const dispatch = useAppDispatch();

  const renderItem = useCallback(({item}: {item: Order}) => {
    return <OrderItem item={item} />;
  }, []);

  return (
    <FlatList
      style={styles.scrollView}
      data={orders} // DataList
      keyExtractor={item => item.orderId} // key값 (함수형태로)
      renderItem={renderItem} // View return
    />
  );
}

const styles = StyleSheet.create({
  scrollView: {
    padding: 10,
  },
});
