import React, { useEffect, useState } from 'react';
import { FishingPlacesResponse, FishingPlacesUpdateDTO, SerializedException } from '@courcework/common';
import { ModalEditProps } from '../tablePage';
import { Button, Form, Modal } from 'react-bootstrap';
import placesService from '../../api/services/places.service';
import { AxiosError } from 'axios';
import ShowErrors from '../../components/showErrors/errors';

const FishingPlacesEditModal = ({ show, setShow, data, onEdit }: ModalEditProps<FishingPlacesResponse>) => {
  const [initialData, setInitialData] = useState<FishingPlacesResponse>({
    id: data?.id,
    name: data?.name,
    price: data?.price,
    square: data?.square,
    organisation: data?.organisation,
  });
  const [editData, setEditData] = useState<FishingPlacesUpdateDTO>({});
  const [error, setError] = useState<SerializedException>();

  useEffect(() => {
    setError(undefined);
  }, [show]);

  useEffect(() => {
    if (data) {
      setInitialData(data);
      setEditData({});
    }
  }, [data]);

  const onUpdate = () => {
    return placesService.update(data.id, editData).then((data) => {
      onEdit(data);
    }).catch((e: AxiosError<SerializedException>) => {
      setError(e.response?.data);
    });
  }

  return (
    <Modal
      onHide={() => setShow(false)}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update fishing place
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onUpdate}>
          <Form.Group className='modal-group'>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" value={initialData.name} onChange={(e) => {
              setEditData({
                ...editData,
                name: e.target.value
              });
              setInitialData({
                ...initialData,
                name: e.target.value
              });
            }}/>
          </Form.Group>
          <Form.Group className='modal-group'>
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="Price" value={initialData.price} onChange={(e) => {
              setEditData({
                ...editData,
                price: +e.target.value
              });
              setInitialData({
                ...initialData,
                price: +e.target.value
              });
            }}/>
          </Form.Group>
          <Form.Group className='modal-group'>
            <Form.Label>Square</Form.Label>
            <Form.Control type="number" placeholder="Square" value={initialData.square} onChange={(e) => {
              setEditData({
                ...editData,
                square: +e.target.value
              });
              setInitialData({
                ...initialData,
                square: +e.target.value
              });
            }}/>
          </Form.Group>
        </Form>
        <ShowErrors error={error} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onUpdate} variant='success'>Update</Button>
        <Button onClick={() => setShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
 
export default FishingPlacesEditModal;