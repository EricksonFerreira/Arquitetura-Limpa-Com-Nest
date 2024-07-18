import { UserRepository } from '@/users/domain/repositories/user.repository';
import { ConflictError } from '@/shared/domain/erros/conflict-error';
import { NotFoundError } from '@/shared/domain/erros/not-found-error';
import { InMemorySeachableRepository } from '@/shared/domain/repositories/in-memory-searchable.repository';
import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts';
import { UserEntity } from '@/users/domain/entities/user.entity';

export class UserInMemoryRepository
  extends InMemorySeachableRepository<UserEntity>
  implements UserRepository.Repository
{
  sortableFields: string[] = ['name', 'createdAt'];

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
      throw new ConflictError('Email address already used');
    }
  }

  protected async applyFilter(
    items: UserEntity[],
    filter: UserRepository.Filter,
  ): Promise<UserEntity[]> {
    if (!filter) {
      return items;
    }

    return items.filter((item) => {
      return item.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }
  protected async applySort(
    items: UserEntity[],
    sort: string | null,
    sortDir: SortDirection | null,
  ): Promise<UserEntity[]> {
    return !sort
      ? super.applySort(items, 'createdAt', 'desc')
      : super.applySort(items, sort, sortDir);
  }
}
