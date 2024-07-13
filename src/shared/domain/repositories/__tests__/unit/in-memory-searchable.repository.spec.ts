import { Entity } from '@/shared/domain/entities/entity';
import { InMemoryRepository } from '../../in-memory.repository';
import { NotFoundError } from '@/shared/domain/erros/not-found-error';
import { InMemorySeachableRepository } from '../../in-memory-searchable.repository';
import { de } from '@faker-js/faker';

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorySearchableRepository extends InMemorySeachableRepository<StubEntity> {
  sortableFields: string[] = ['name'];

  protected async applyFilter(
    items: StubEntity[],
    filter: string | null,
  ): Promise<StubEntity[]> {
    if (!filter) {
      return items;
    }

    return items.filter((item) => {
      return item.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }
}

describe('InMemoryRepository unit tests', () => {
  let sut: StubInMemorySearchableRepository;

  beforeEach(() => {
    sut = new StubInMemorySearchableRepository();
  });

  describe('applyFilter method', () => {});

  describe('applySort method', () => {});

  describe('applyPaginate method', () => {});

  describe('search method', () => {});
});
