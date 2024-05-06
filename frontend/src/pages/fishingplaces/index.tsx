import React from 'react';
import TablePage from '../tablePage';
import { FishingPlacesResponse } from '@courcework/common';
import placesService from '../../api/services/places.service';
import FishingPlacesCreateModal from './createModal';
import FishingPlacesEditModal from './editModal';

const FishingPlacesPage = () => {
  return (
    <TablePage<FishingPlacesResponse> 
      title='Fishing Places'
      theadNames={['Id', 'Name', 'Price', 'Square', 'Organisation id', 'Organisation name']}
      fieldEntity='fishingPlaces' 
      service={placesService} 
      dataParser={(data) => {
        return {
          id: data.id,
          name: data.name,
          price: data.price,
          square: data.square,
          organisationId: data.organisation.id,
          organisationName: data.organisation.name,
        }
      }}
      CreateModal={FishingPlacesCreateModal}
      EditModal={FishingPlacesEditModal}
    />
  )
}
 
export default FishingPlacesPage;