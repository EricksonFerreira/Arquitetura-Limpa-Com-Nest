import { Entity } from '../entities/entity';

export interface RepositoryInterface<E extends Entity> {
  insert(Entity: E): Promise<void>;
  findById(id: string): Promise<E | null>;
  findAll(): Promise<E[]>;
  update(Entity: E): Promise<void>;
  delete(id: string): Promise<void>;
}
