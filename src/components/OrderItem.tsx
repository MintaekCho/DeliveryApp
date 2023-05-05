import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import orderSlice, {Order} from '../slices/order';
import {useAppDispatch} from '../store';

export default function OrderItem({item}: {item: Order}) {
  const dispatch = useAppDispatch();

  const [detail, setDetail] = useState(false);
  const toggleDetail = useCallback(() => {
    setDetail(!detail);
  }, [detail]);

  return (
    <>
      <TouchableOpacity onPress={toggleDetail} style={styles.orderWrap}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text>주문</Text>
            <Text>{`배송비 : ${item.price}원`}</Text>
          </View>
          <View style={styles.addressWrap}>
            <Text>성수동</Text>
            <Text>자양동</Text>
          </View>
        </View>

        {detail ? (
          <View>
            <View style={styles.selectWrap}>
              <TouchableOpacity
                onPress={() =>
                  dispatch(orderSlice.actions.acceptOrder(item.orderId))
                }
                style={[styles.selectButton, {marginRight: 10}]}>
                <Text style={[styles.selectText]}>수락</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  dispatch(orderSlice.actions.rejectOrder(item.orderId))
                }
                style={styles.selectButton}>
                <Text style={styles.selectText}>거절</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  orderWrap: {
    width: '100%',
    backgroundColor: 'white',
    marginTop: 10,
    padding: 10,
    borderRadius: 6,
  },

  selectWrap: {
    marginTop: 10,
    flexDirection: 'row',
  },

  selectButton: {
    backgroundColor: 'blue',
    padding: 6,
    borderRadius: 8,
  },

  selectText: {
    color: 'white',
    fontWeight: 'bold',
  },

  addressWrap: {
    flexDirection: 'row',
    display: 'flex',
    gap: 10,
  },
});
