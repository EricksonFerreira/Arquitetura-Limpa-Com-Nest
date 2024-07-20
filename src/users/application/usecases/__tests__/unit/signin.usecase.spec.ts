import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-memory.repository';
import { BcryptjsHashProvider } from '@/users/infrastructure/providers/hash-provider/bcryptjs-hash.provider';
import { HashProvider } from '@/shared/application/providers/hash-provider';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-date-builder';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { SignInUseCase } from '../../signin.usecase';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { NotFoundError } from '@/shared/domain/erros/not-found-error';
import { InvalidCredentialsError } from '@/shared/application/errors/invalid-credentials-error';

describe('SigninUseCase unit tests', () => {
  let sut: SignInUseCase.UseCase;
  let repository: UserInMemoryRepository;
  let hashProvider: HashProvider;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    hashProvider = new BcryptjsHashProvider();
    sut = new SignInUseCase.UseCase(repository, hashProvider);
  });

  it('should authenticate a user', async () => {
    const spyFindByEmail = jest.spyOn(repository, 'findByEmail');
    const hashPassword = await hashProvider.generateHash('1234');
    const entity = new UserEntity(
      UserDataBuilder({ email: 'a@a.com', password: hashPassword }),
    );
    repository.items = [entity];

    const result = await sut.execute({
      email: entity.email,
      password: '1234',
    });
    expect(spyFindByEmail).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(entity.toJSON());
  });

  it('should throws error when email not provided', async () => {
    const props = { email: null, password: '1234' };
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    );
  });

  it('should throws error when password not provided', async () => {
    const props = { email: 'a@a.com', password: null };
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    );
  });

  it('should not be able to authenticate with wrong email', async () => {
    const props = { email: 'a@a.com', password: '1234' };
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });

  it('should not be able to authenticate with wrong email', async () => {
    const hashPassword = await hashProvider.generateHash('1234');
    const entity = new UserEntity(
      UserDataBuilder({ email: 'a@a.com', password: hashPassword }),
    );
    repository.items = [entity];

    const props = { email: 'a@a.com', password: 'fake' };
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    );
  });
});
