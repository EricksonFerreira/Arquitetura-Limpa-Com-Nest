import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-memory.repository';
import { NotFoundError } from '@/shared/domain/erros/not-found-error';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-date-builder';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { DeleteUserUseCase } from '../../deleteuser.usecase';

describe('DeleteUserUseCase unit tests', () => {
  let sut: DeleteUserUseCase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    sut = new DeleteUserUseCase.UseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    await expect(() => sut.execute({ id: 'fake' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('should delete a user', async () => {
    const spyDelete = jest.spyOn(repository, 'delete');
    const items = [new UserEntity(UserDataBuilder({}))];
    repository.items = items;

    await sut.execute({ id: items[0].id });
    expect(spyDelete).toHaveBeenCalledTimes(1);
    expect(repository.items).toHaveLength(0);
  });
});
