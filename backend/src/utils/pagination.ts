import { PaginationDTO, PaginationResponse } from "@courcework/common";

export const Paginate = async <D, A extends { where?: any }=any>(repository: any, args: A, { page, pageSize }: PaginationDTO) => {
  if (page === undefined && pageSize === undefined) {
    const data: D[] = await repository.findMany({}, {
      ...args,
    });
    return {
      data,
      pagination: {
        page: 0,
        pageSize: data.length,
        total: data.length,
        totalPages: 1,
      } as PaginationResponse,
    }
  }

  page = page || 0;
  pageSize = pageSize || 10;

  const data: D[] = await repository.findMany({}, {
    ...args,
    skip: page * pageSize,
    take: pageSize,
  });

  const total = await repository.count({
    where: args?.where,
  });
  const totalPages = Math.ceil(total / pageSize);

  return {
    data,
    pagination: {
      page,
      pageSize,
      total,
      totalPages,
    } as PaginationResponse,
  };
}