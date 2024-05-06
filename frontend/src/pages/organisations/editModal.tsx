import React, { useEffect, useState } from 'react';
import { FishingPlacesUpdateDTO, OrganisationResponse, SerializedException } from '@courcework/common';
import { ModalEditProps } from '../tablePage';
import { Button, Form, Modal } from 'react-bootstrap';
import { AxiosError } from 'axios';
import ShowErrors from '../../components/showErrors/errors';
import organisationsService from '../../api/services/organisations.service';

const OrganisationEditModal = ({ show, setShow, data, onEdit }: ModalEditProps<OrganisationResponse>) => {
  const [initialData, setInitialData] = useState<OrganisationResponse>({
    id: data.id,
    name: data.name,
  });
  const [editData, setEditData] = useState<FishingPlacesUpdateDTO>({});
  const [error, setError] = useState<SerializedException>();

  useEffect(() => {
    if (data) {
      setInitialData(data);
      setEditData({});
    }
  }, [data]);

  useEffect(() => {
    setError(undefined);
  }, [show]);

  const onUpdate = () => {
    return organisationsService.update(data.id, editData).then((data) => {
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
 
export default OrganisationEditModal;