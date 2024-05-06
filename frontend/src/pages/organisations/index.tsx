import * as React from 'react';
import { OrganisationResponse } from '@courcework/common';
import TablePage from '../tablePage';
import organisationsService from '../../api/services/organisations.service';
import OrganisationCreateModal from './createModal';
import OrganisationEditModal from './editModal';

const OrganisationsPage = () => {
  return (
    <TablePage<OrganisationResponse> 
      title='Organisations'
      theadNames={['Id', 'Province']}
      fieldEntity='organisations' 
      service={organisationsService} 
      dataParser={(data) => {
        return {
          id: data.id,
          name: data.name,
        }
      }}
      CreateModal={OrganisationCreateModal}
      EditModal={OrganisationEditModal}
    />
  )
}
 
export default OrganisationsPage;