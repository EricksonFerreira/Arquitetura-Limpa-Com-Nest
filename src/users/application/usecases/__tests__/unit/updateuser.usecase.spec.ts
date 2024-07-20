import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-memory.repository';
import { NotFoundError } from '@/shared/domain/erros/not-found-error';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-date-builder';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UpdateUserUseCase } from '../../updateuser.usecase';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';

describe('UpdateUserUseCase unit tests', () => {
  let sut: UpdateUserUseCase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    sut = new UpdateUserUseCase.UseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    await expect(() =>
      sut.execute({ id: 'fake', name: 'test name' }),
    ).rejects.toThrow(new NotFoundError('Entity not found'));
  });
  it('should throws error when name not provided', async () => {
    await expect(() => sut.execute({ id: 'fake', name: '' })).rejects.toThrow(
      new BadRequestError('Name not provided'),
    );
  });

  it('should update a user', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');
    const items = [new UserEntity(UserDataBuilder({}))];
    repository.items = items;

    const result = await sut.execute({ id: items[0].id, name: 'new name' });
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(result).toMatchObject({
      id: items[0].id,
      name: 'new name',
      email: items[0].email,
      password: items[0].password,
      createdAt: items[0].createdAt,
    });
  });
});
