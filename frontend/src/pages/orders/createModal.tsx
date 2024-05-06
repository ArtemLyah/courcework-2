import React, { useEffect, useState } from 'react';
import { ModalCreateProps } from '../tablePage';
import { Button, Form, Modal } from 'react-bootstrap';
import { FisherResponse, FishingPlacesResponse, OrderStatus, OrdersCreateDTO, OrdersResponse, SerializedException } from '@courcework/common';
import ShowErrors from '../../components/showErrors/errors';
import { AxiosError } from 'axios';
import ordersService from '../../api/services/orders.service';
import placesService from '../../api/services/places.service';
import fishersService from '../../api/services/fishers.service';

const OrderCreateModal = ({ show, setShow, onCreate }: ModalCreateProps<OrdersResponse>) => {
  const [createData, setCreateData] = useState<OrdersCreateDTO>({
    fisherId: 0,
    placeId: 0,
    fishingStart: '',
    fishingEnd: '',
    status: OrderStatus.PENDING,
  });
  const [places, setPlaces] = useState<FishingPlacesResponse[]>([]);
  const [fishers, setFishers] = useState<FisherResponse[]>([]);
  const [error, setError] = useState<SerializedException>();

  useEffect(() => {
    if (show) {
      placesService.getAll().then((data) => {
        setPlaces(data.fishingPlaces);
      });

      fishersService.getAll().then((data) => {
        setFishers(data.fishers);
      });
    }
    setError(undefined);
  }, [show]);

  const onHandleCreate = () => {
    console.log(createData);
    return ordersService.create(createData).then((data) => {
      onCreate(data);
    }).catch((e: AxiosError<SerializedException>) => {
      setError(e.response?.data);
    })
  }

  const renderFisherOptions = fishers.map((fisher, index) => (
    <option key={index} value={fisher.id}>{fisher.id} | {fisher.lastName} {fisher.firstName} {fisher.middleName}</option>
  ));

  const renderPlaceOptions = places.map((place, index) => (
    <option key={index} value={place.id}>{place.id} | {place.name} | {place.organisation.name}</option>
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
          Create organisation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={onHandleCreate}>
          <Form.Group className='modal-group'>
            <Form.Label>Fisher</Form.Label>
            <Form.Select onChange={(e) => {
              setCreateData({
                ...createData,
                fisherId: +e.target.value,
              });
            }}>
              <option value={0} disabled selected>Select fisher</option>
              {renderFisherOptions}
            </Form.Select>
          </Form.Group>
          <Form.Group className='modal-group'>
            <Form.Label>Place</Form.Label>
            <Form.Select onChange={(e) => {
              setCreateData({
                ...createData,
                placeId: +e.target.value,
              });
            }}>
              <option value={0} disabled selected>Select place</option>
              {renderPlaceOptions}
            </Form.Select>
          </Form.Group>
          <Form.Group className='modal-group'>
            <Form.Label>Status</Form.Label>
            <Form.Select 
              defaultValue={OrderStatus.PENDING}
              onChange={(e) => {
                setCreateData({
                  ...createData,
                  status: e.target.value as OrderStatus,
                });
              }}
            >
              <option value={OrderStatus.PENDING}>PENDING</option>
              <option value={OrderStatus.APPROVED}>APPROVED</option>
              <option value={OrderStatus.DENIED}>DENIED</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className='modal-group'>
            <Form.Label>Fishing start</Form.Label>
            <Form.Control 
              type="datetime-local" 
              onChange={(e) => {
                setCreateData({
                  ...createData,
                  fishingStart: e.target.value
                });
              }}
            />
          </Form.Group>
          <Form.Group className='modal-group'>
            <Form.Label>Fishing end</Form.Label>
            <Form.Control 
              type="datetime-local" 
              onChange={(e) => {
                setCreateData({
                  ...createData,
                  fishingEnd: e.target.value
                });
              }}
            />
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
 
export default OrderCreateModal;