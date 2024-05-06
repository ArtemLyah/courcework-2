import React from 'react';
import TablePage from '../tablePage';
import { OrdersResponse } from '@courcework/common';
import { getStringDate, getStringDateTime } from '../../utils/stringUtils';
import ordersService from '../../api/services/orders.service';
import OrderCreateModal from './createModal';
import OrderEditModal from './editModal';

const OrdersPage = () => {
  return (
    <TablePage<OrdersResponse> 
      title='Orders'
      theadNames={['Id', 'Status', 'Fishing start', 'Fishing end', 'Created', 'Fisher id', 'Place id']}
      fieldEntity='orders' 
      service={ordersService} 
      dataParser={(data) => {
        return {
          id: data.id,
          status: data.status,
          fishingStart: getStringDateTime(data.fishingStart),
          fishingEnd: getStringDateTime(data.fishingEnd),
          createdAt: getStringDate(data.createdAt),
          fisherId: data.fisher.id,
          placeId: data.place.id,
        }
      }}
      CreateModal={OrderCreateModal}
      EditModal={OrderEditModal}
    />
  )
}
 
export default OrdersPage;