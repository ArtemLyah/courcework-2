import { FisherResponse, FisherUpdateDTO, SerializedException } from '@courcework/common';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import fishersService from '../../api/services/fishers.service';
import ShowErrors from '../../components/showErrors/errors';
import { AxiosError } from 'axios';
import { ModalEditProps } from '../tablePage';
import { getStringDate } from '../../utils/stringUtils';

const FishersEditModal = ({ show, setShow, data, onEdit }: ModalEditProps<FisherResponse>) => {
  const [initialData, setInitialData] = useState<FisherResponse>({
    id: data?.id,
    firstName: data?.firstName,
    lastName: data?.lastName,
    middleName: data?.middleName,
    email: data?.email,
    phone: data?.phone,
    birthDate: data?.birthDate,
  });
  const [editData, setEditData] = useState<FisherUpdateDTO>({});
  const [initEmail, setInitEmail] = useState<string>(data?.email);
  const [initPhone, setInitPhone] = useState<string>(data?.phone);
  const [error, setError] = useState<SerializedException>();

  const onUpdate = () => {
    return fishersService.update(data.id, editData).then((data) => {
      onEdit(data);
    }).catch((e: AxiosError<SerializedException>) => {
      setError(e.response?.data);
    });
  }

  useEffect(() => {
    setError(undefined);
  }, [show]);

  useEffect(() => {
    if (data) {
      setInitialData(data);
      setInitEmail(data.email);
      setInitPhone(data.phone);
      setEditData({});
    }
  }, [data]);

  if (!data) {
    return <></>;
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
        <Form onSubmit={onUpdate}>
          <Form.Group className='modal-group'>
            <Form.Label>Firsh name</Form.Label>
            <Form.Control type="text" placeholder="First name" value={initialData.firstName} onChange={(e) => {
              setEditData({
                ...editData,
                firstName: e.target.value
              });
              setInitialData({
                ...initialData,
                firstName: e.target.value
              });
            }}/>
          </Form.Group>
          <Form.Group className='modal-group'>
            <Form.Label>Last name</Form.Label>
            <Form.Control type="text" placeholder="Last name" value={initialData.lastName} onChange={(e) => {
              setEditData({
                ...editData,
                lastName: e.target.value
              });
              setInitialData({
                ...initialData,
                lastName: e.target.value
              });
            }}/>
          </Form.Group>
          <Form.Group className='modal-group'>
            <Form.Label>Middle name</Form.Label>
            <Form.Control type="text" placeholder="Middle name" value={initialData.middleName} onChange={(e) => {
              setEditData({
                ...editData,
                secondName: e.target.value
              });
              setInitialData({
                ...initialData,
                middleName: e.target.value
              });
            }}/>
          </Form.Group>
          <Form.Group className='modal-group'>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" value={initialData.email} onChange={(e) => {
              setEditData({
                ...editData,
                email: e.target.value === initEmail ? undefined : e.target.value
              });
              setInitialData({
                ...initialData,
                email: e.target.value
              });
            }}/>
          </Form.Group>
          <Form.Group className='modal-group'>
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" placeholder="Phone" value={initialData.phone} onChange={(e) => {
              setEditData({
                ...editData,
                phone: e.target.value === initPhone ? undefined : e.target.value
              });
              setInitialData({
                ...initialData,
                phone: e.target.value
              });
            }}/>
          </Form.Group>
          <Form.Group className='modal-group'>
            <Form.Label>Birth date</Form.Label>
            <Form.Control type="date" value={getStringDate(initialData.birthDate)} onChange={(e) => {
              setEditData({
                ...editData,
                birthDate: e.target.value,
              });
              setInitialData({
                ...initialData,
                birthDate: e.target.value,
              });
            }}/>
          </Form.Group>
        </Form>
        <ShowErrors error={error}/>
      </Modal.Body>
      <Modal.Footer>
        <Button type='button' variant="success" onClick={onUpdate}>Update</Button>
        <Button onClick={() => setShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
 
export default FishersEditModal;