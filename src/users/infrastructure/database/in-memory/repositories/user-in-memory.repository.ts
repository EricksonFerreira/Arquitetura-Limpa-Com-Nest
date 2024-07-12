import { ConflictError } from '@/shared/domain/erros/conflict-error';
import { NotFoundError } from '@/shared/domain/erros/not-found-error';
import { InMemorySeachableRepository } from '@/shared/domain/repositories/in-memory-searchable.repository';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserRepository } from '@/users/domain/repositories/user.repository';

export class UserInMemoryRepository
  extends InMemorySeachableRepository<UserEntity>
  implements UserRepository
{
  async findByEmail(email: string): Promise<UserEntity | null> {
    const entity = this.items.find((item) => item.email === email);
    if (!entity) {
      throw new NotFoundError('Entity not found');
    }

    return entity;
  }

  async emailExists(email: string): Promise<void> {
    const entity = this.items.find((item) => item.email === email);
    if (entity) {
      throw new ConflictError('Email addres already used');
    }
  }
}
