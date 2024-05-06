import { EntityIdNotFoundException } from "@courcework/common";

export const findEntityById = async (id: number, entityName: string, entityRepository: any) => {
  const entity = await entityRepository.findOne({
    id,
  });

  if (!entity) {
    throw new EntityIdNotFoundException(entityName);
  }

  return entity;
}