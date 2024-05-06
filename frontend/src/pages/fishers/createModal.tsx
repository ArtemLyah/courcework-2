import React, { useEffect, useState } from 'react';
import { FisherCreateDTO, FisherResponse, SerializedException } from '@courcework/common';
import { Modal, Button, Form } from 'react-bootstrap';
import fishersService from '../../api/services/fishers.service';
import ShowErrors from '../../components/showErrors/errors';
import { AxiosError } from 'axios';
import { ModalCreateProps } from '../tablePage';

const FishersCreateModal = ({ show, setShow, onCreate }: ModalCreateProps<FisherResponse>) => {
  const [createData, setCreateData] = useState<FisherCreateDTO>({
    firstName: '',
    lastName: '',
    secondName: '',
    email: '',
    phone: '',
    birthDate: '',
  });
  const [error, setError] = useState<SerializedException>();

  useEffect(() => {
    setError(undefined);
  }, [show]);

  const onHandleCreate = () => {
    return fishersService.create(createData).then((data) => {
      onCreate(data);
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
          Create fisher
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onHandleCreate}>
          <Form.Group className='modal-group'>
            <Form.Label>Firsh name</Form.Label>
            <Form.Control type="text" placeholder="First name" onChange={(e) => {
              setCreateData({
                ...createData,
                firstName: e.target.value
              })
            }}/>
          </Form.Group>
          <Form.Group className='modal-group'>
            <Form.Label>Last name</Form.Label>
            <Form.Control type="text" placeholder="Last name" onChange={(e) => {
              setCreateData({
                ...createData,
                lastName: e.target.value
              })
            }}/>
          </Form.Group>
          <Form.Group className='modal-group'>
            <Form.Label>Middle name</Form.Label>
            <Form.Control type="text" placeholder="Middle name" onChange={(e) => {
              setCreateData({
                ...createData,
                secondName: e.target.value
              })
            }}/>
          </Form.Group>
          <Form.Group className='modal-group'>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" onChange={(e) => {
              setCreateData({
                ...createData,
                email: e.target.value
              })
            }}/>
          </Form.Group>
          <Form.Group className='modal-group'>
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" placeholder="Phone" onChange={(e) => {
              setCreateData({
                ...createData,
                phone: e.target.value
              })
            }}/>
          </Form.Group>
          <Form.Group className='modal-group'>
            <Form.Label>Birth date</Form.Label>
            <Form.Control type="date" onChange={(e) => {
              setCreateData({
                ...createData,
                birthDate: e.target.value,
              });
            }}/>
          </Form.Group>
        </Form>
        <ShowErrors error={error}/>
      </Modal.Body>
      <Modal.Footer>
        <Button type='button' variant="success" onClick={onHandleCreate}>Create</Button>
        <Button onClick={() => setShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
 
export default FishersCreateModal;