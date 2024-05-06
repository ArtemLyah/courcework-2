import React, { Dispatch, SetStateAction, useRef } from 'react';
import { PaginationDTO, PaginationResponse } from '@courcework/common';
import { Pagination as BootPagination, Form } from 'react-bootstrap';
import './pagination.css';

interface PaginationProps {
  pagination: PaginationResponse;
  setPagination: Dispatch<SetStateAction<PaginationDTO>>;
}

const Pagination = ({ pagination, setPagination }: PaginationProps) => {
  const { page, totalPages, pageSize } = pagination;
  const timeout = useRef<NodeJS.Timeout>();

  return (
    <div className='pagination-container'>
      <BootPagination>
        
        <BootPagination.First 
          onClick={() => setPagination({ ...pagination, page: 0 })} 
          disabled={page === 0}
        />
        <BootPagination.Prev 
          onClick={() => setPagination({ ...pagination, page: page-1 })}
          disabled={page === 0}
        />

        {
          page >= 2 && 
          <BootPagination.Item onClick={() => setPagination({ ...pagination, page: page-2 })}>
            {page-1}
          </BootPagination.Item>
        }

        { 
          page >= 1 && 
          <BootPagination.Item onClick={() => setPagination({ ...pagination, page: page-1 })}>
            {page}
          </BootPagination.Item>
        }
        
        <BootPagination.Item active>{page+1}</BootPagination.Item>

        {
          page+1 < totalPages && 
          <BootPagination.Item onClick={() => setPagination({ ...pagination, page: page+1 })}>
            {page+2}
          </BootPagination.Item>
        }
        {
          page+2 < totalPages && 
          <BootPagination.Item onClick={() => setPagination({ ...pagination, page: page+2 })}>
            {page+3}
          </BootPagination.Item>
        }

        <BootPagination.Next 
          onClick={() => setPagination({ ...pagination, page: page+1 })}
          disabled={totalPages === page+1}
        />
        <BootPagination.Last 
          onClick={() => setPagination({ ...pagination, page: totalPages-1 })}
          disabled={totalPages === page+1}
        />
      </BootPagination>
      <Form>
        <Form.Label>Page size</Form.Label>
        <Form.Control 
          type='number' 
          defaultValue={pageSize}
          onChange={(e) => {
            clearTimeout(timeout.current);
            timeout.current = setTimeout(() => {
              setPagination({ page: pagination.page, pageSize: +e.target.value });
            }, 500);
          }}
        />
      </Form>
    </div>
  );
}
 
export default Pagination;