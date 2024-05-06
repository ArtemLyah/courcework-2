import React, { useEffect, useState } from 'react';
import { OrderStatus, OrdersResponse, OrdersUpdateDTO, SerializedException } from '@courcework/common';
import { ModalEditProps } from '../tablePage';
import { Button, Form, Modal } from 'react-bootstrap';
import { AxiosError } from 'axios';
import ShowErrors from '../../components/showErrors/errors';
import ordersService from '../../api/services/orders.service';
import { getStringDateTime } from '../../utils/stringUtils';

const OrderEditModal = ({ show, setShow, data, onEdit }: ModalEditProps<OrdersResponse>) => {
  const [initialData, setInitialData] = useState<OrdersResponse>({
    id: data?.id,
    status: data?.status,
    createdAt: data?.createdAt,
    fishingStart: data?.fishingStart,
    fishingEnd: data?.fishingEnd,
    fisher: data?.fisher,
    place: data?.place,
  });
  const [editData, setEditData] = useState<OrdersUpdateDTO>({});
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
    return ordersService.update(data.id, editData).then((data) => {
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
          Update order
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onUpdate}>
          <Form.Group className='modal-group'>
            <Form.Label>Status</Form.Label>
            <Form.Select 
              value={initialData.status}
              onChange={(e) => {
                setEditData({
                  ...editData,
                  status: e.target.value as OrderStatus,
                });
                setInitialData({
                  ...initialData,
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
              value={getStringDateTime(initialData.fishingStart)}
              onChange={(e) => {
                setEditData({
                  ...editData,
                  fishingStart: e.target.value,
                });
                setInitialData({
                  ...initialData,
                  fishingStart: e.target.value,
                });
              }}
            />
          </Form.Group>
          <Form.Group className='modal-group'>
            <Form.Label>Fishing end</Form.Label>
            <Form.Control 
              type="datetime-local" 
              value={getStringDateTime(initialData.fishingEnd)}
              onChange={(e) => {
                console.log(e.target.value);
                setEditData({
                  ...editData,
                  fishingEnd: e.target.value
                });
                setInitialData({
                  ...initialData,
                  fishingEnd: e.target.value,
                });
              }}
            />
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
 
export default OrderEditModal;