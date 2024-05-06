import React from 'react';
import TablePage from '../tablePage';
import fishersService from '../../api/services/fishers.service';
import { getStringDate } from '../../utils/stringUtils';
import { FisherResponse } from '@courcework/common';
import FishersCreateModal from './createModal';
import FishersEditModal from './editModal';

const FishersPage = () => {
  return (
    <TablePage<FisherResponse> 
      title='Fishers'
      theadNames={['Id', 'Full Name', 'Email', 'Phone', 'Birth Date']}
      fieldEntity='fishers' 
      service={fishersService} 
      dataParser={(data) => {
        return {
          id: data.id,
          fullName: `${data.lastName} ${data.firstName} ${data.middleName}`,
          email: data.email,
          phone: data.phone,
          birthDate: getStringDate(data.birthDate)
        }
      }}
      CreateModal={FishersCreateModal}
      EditModal={FishersEditModal}
    />
  )
}
 
export default FishersPage;