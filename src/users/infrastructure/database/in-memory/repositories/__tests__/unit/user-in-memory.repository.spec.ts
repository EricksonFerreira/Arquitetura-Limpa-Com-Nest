import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserInMemoryRepository } from '../../user-in-memory.repository';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-date-builder';
import { NotFoundError } from '@/shared/domain/erros/not-found-error';
import { ConflictError } from '@/shared/domain/erros/conflict-error';

describe('UserInMemoryRepository unit tests', () => {
  let sut: UserInMemoryRepository;

  beforeEach(() => {
    sut = new UserInMemoryRepository();
  });

  it('Should throw error when not found - findByEmail method', async () => {
    await expect(sut.findByEmail('a@a.com')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should find a entity by email - findByEmail method', async () => {
    const entity = new UserEntity(UserDataBuilder({}));
    await sut.insert(entity);
    const result = await sut.findByEmail(entity.email);

    expect(entity.toJSON()).toStrictEqual(result.toJSON());
  });

  it('Should throw error when not found - emailExists method', async () => {
    const entity = new UserEntity(UserDataBuilder({}));
    await sut.insert(entity);
    await expect(sut.emailExists(entity.email)).rejects.toThrow(
      new ConflictError('Email address already used'),
    );
  });

  it('Should find a entity by email - emailExists method', async () => {
    expect.assertions(0);
    await sut.emailExists('a@a.com');
  });
});
