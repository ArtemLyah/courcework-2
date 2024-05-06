import React, { Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react';
import { Exception, PaginationDTO, PaginationResponse } from '@courcework/common';
import { Button, Container, Table } from 'react-bootstrap';
import Pagination from '../../components/pagination/pagination';

export interface ModalCreateProps<R> {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  onCreate: (data: R) => void;
}

export interface ModalEditProps<R> {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  data: R;
  onEdit: (data: R) => void;
}

interface TablePageProps<R> {
  title: string;
  theadNames: string[];
  fieldEntity: string;
  service: any;
  dataParser: (data: R) => any;
  CreateModal: (props: ModalCreateProps<R>) => ReactElement;
  EditModal: (props: ModalEditProps<R>) => ReactElement;
}

const TablePage = <R extends { id: number }>({ 
  title, 
  theadNames, 
  fieldEntity, 
  service, 
  dataParser, 
  CreateModal, 
  EditModal 
}: TablePageProps<R>) => {
  const [ data, setData ] = useState<R[]>([]);
  const [ editData, setEditData ] = useState<R>({ id: 0 } as R);
  const [ errors, setErrors ] = useState<Exception[]>([]);
  const [ showCreateModal, setShowCreateModal ] = useState<boolean>(false);
  const [ showEditModal, setShowEditModal ] = useState<boolean>(false);
  const [ paginationDTO, setPaginationDTO ] = useState<PaginationDTO>({ 
    page: 0, 
    pageSize: 10, 
  });
  const [ pagination, setPagination ] = useState<PaginationResponse>({
    page: 0,
    pageSize: 10,
    totalPages: 0,
    total: 0,
  });

  useEffect(() => {
    const fetchFishers = async () => {
      const table = await service.getAll(paginationDTO);
      setData(table[fieldEntity]);
      setPagination(table.pagination);
    }

    fetchFishers();
  }, [paginationDTO])

  const onDelete = (id: number, service: any) => {
    return async () => {
      await service.delete(id).catch((error: Exception) => {
        setErrors([...errors, error]);
      });
  
      window.location.reload();
    }
  }

  const onEdit = (data: R) => {
    return () => {
      setShowEditModal(true);
      setEditData(data);
    };
  };

  const renderFishers = data.map((dataRow, index) => {
    const parsedDataRow = dataParser(dataRow);

    const renderFields = Object.keys(parsedDataRow).map((field, index) => (
      <td key={index}>{parsedDataRow[field]}</td>
    ));

    return (
      <tr key={index}>
        <td className='editRow'> 
          <a href="#" onClick={onEdit(dataRow)}>Edit</a> | <a href="#" onClick={onDelete(dataRow.id, service)}>Delete</a>
        </td>
        {renderFields}
      </tr>
    );
  });

  const renderThead = theadNames.map((name, index) => (
    <td key={index}>{name}</td>
  ));

  return (
    <Container className='page fishers'>
      <div className="description">
        <h1 className='title'>{title}</h1>
        <p className='total'>Total: {pagination.total}</p>
      </div>

      <Container className='content-table'>
        <Button className='create-button' onClick={() => {
          setShowCreateModal(true);
        }}>Create</Button>
        <Table bordered hover>
          <thead>
            <tr>
              <td></td>
              { renderThead }
            </tr>
          </thead>
          <tbody>
            {renderFishers}
          </tbody>
        </Table>
        
        <Pagination pagination={pagination} setPagination={setPaginationDTO}/>
      </Container>

      <CreateModal show={showCreateModal} setShow={setShowCreateModal} onCreate={(newData) => {
        setShowCreateModal(false);
        setData([...data, newData]);
        setPagination({
          ...pagination,
          total: pagination.total + 1,
        });
      }}/>
      <EditModal show={showEditModal} setShow={setShowEditModal} data={editData} onEdit={(changedData) => {
        setShowEditModal(false);
        setData(data.map((dataRow) => dataRow.id === changedData.id ? changedData : dataRow));
      }}/>
    </Container>
  );
}
 
export default TablePage;