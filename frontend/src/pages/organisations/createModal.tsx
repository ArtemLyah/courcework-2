import React, { useEffect, useState } from 'react';
import { ModalCreateProps } from '../tablePage';
import { Button, Form, Modal } from 'react-bootstrap';
import { OrganisationCreateDTO, OrganisationResponse, SerializedException } from '@courcework/common';
import ShowErrors from '../../components/showErrors/errors';
import organisationsService from '../../api/services/organisations.service';
import { AxiosError } from 'axios';

const OrganisationCreateModal = ({ show, setShow, onCreate }: ModalCreateProps<OrganisationResponse>) => {
  const [createData, setCreateData] = useState<OrganisationCreateDTO>({
    name: '',
  });
  const [error, setError] = useState<SerializedException>();

  useEffect(() => {
    setError(undefined);
  }, [show]);

  const onHandleCreate = () => {
    return organisationsService.create(createData).then((data) => {
      onCreate(data);
    }).catch((e: AxiosError<SerializedException>) => {
      setError(e.response?.data);
    })
  }

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
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" onChange={(e) => {
              setCreateData({
                ...createData,
                name: e.target.value
              })
            }}/>
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
 
export default OrganisationCreateModal;