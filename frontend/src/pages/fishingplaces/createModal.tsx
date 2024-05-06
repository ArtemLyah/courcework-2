import React, { useEffect, useState } from 'react';
import { ModalCreateProps } from '../tablePage';
import { Button, Form, Modal } from 'react-bootstrap';
import { FishingPlacesCreateDTO, FishingPlacesResponse, OrganisationResponse, SerializedException } from '@courcework/common';
import ShowErrors from '../../components/showErrors/errors';
import organisationsService from '../../api/services/organisations.service';
import { AxiosError } from 'axios';
import placesService from '../../api/services/places.service';

const FishingPlacesCreateModal = ({ show, setShow, onCreate }: ModalCreateProps<FishingPlacesResponse>) => {
  const [createData, setCreateData] = useState<FishingPlacesCreateDTO>({
    name: '',
    price: 0,
    square: 0,
    organisationId: 1,
  });
  const [organisations, setOrganisations] = useState<OrganisationResponse[]>([]);
  const [error, setError] = useState<SerializedException>();

  useEffect(() => {
    if (show) {
      organisationsService.getAll().then((response) => {
        setOrganisations(response.organisations);
      });
    }
    setError(undefined);
  }, [show]);

  const onHandleCreate = () => {
    return placesService.create(createData).then((data) => {
      onCreate(data);
    }).catch((e: AxiosError<SerializedException>) => {
      setError(e.response?.data);
    })
  }

  const renderSelectOrganisations = organisations.map((organisation, index) => (
    <option key={index} value={organisation.id}>{organisation.name}</option>
  ));

  return ( 
    <Modal 
      show={show} 
      onHide={() => setShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Create fishing place
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onHandleCreate}>
          <Form.Group className='modal-group'>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" onChange={(e) => {
              setCreateData({
                ...createData,
                name: e.target.value
              })
            }}/>
          </Form.Group>
          <Form.Group className='modal-group'>
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="Price" onChange={(e) => {
              setCreateData({
                ...createData,
                price: +e.target.value
              })
            }}/>
          </Form.Group>
          <Form.Group className='modal-group'>
            <Form.Label>Square</Form.Label>
            <Form.Control type="number" placeholder="Square" onChange={(e) => {
              setCreateData({
                ...createData,
                square: +e.target.value
              })
            }}/>
          </Form.Group>
          <Form.Group className='modal-group'>
            <Form.Label>Organisation</Form.Label>
            <Form.Select 
              onChange={(e) => {
                console.log(e.target.value);
                setCreateData({
                  ...createData,
                  organisationId: +e.target.value
                })
              }}
            >
              <option value={0} disabled selected>Select organisation</option>
              { renderSelectOrganisations }
            </Form.Select>
          </Form.Group>
        </Form>
        <ShowErrors error={error} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHandleCreate} variant='success'>Create</Button>
        <Button onClick={() => setShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
 
export default FishingPlacesCreateModal;