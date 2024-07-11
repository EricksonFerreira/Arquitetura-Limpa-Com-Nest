import { UserDataBuilder } from '@/users/domain/testing/helpers/user-date-builder';
import {
  UserRules,
  UserValidator,
  UserValidatorFactory,
} from '../../users.validator';

let sut: UserValidator;
describe('Name field', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create();
  });

  const props = UserDataBuilder({});

  it('Validation case for user validator class', () => {
    const isValid = sut.validate(props);
    expect(isValid).toBeTruthy();
    expect(sut.validatedData).toStrictEqual(new UserRules(props));
  });

  it('Invalidation cases for name field', () => {
    let isValid = sut.validate(null as any);
    expect(isValid).toBeFalsy();
    expect(sut.errors['name']).toStrictEqual([
      'name must be shorter than or equal to 255 characters',
      'name should not be empty',
      'name must be a string',
    ]);

    isValid = sut.validate({ ...UserDataBuilder({}), name: '' as any });
    expect(isValid).toBeFalsy();
    expect(sut.errors['name']).toStrictEqual(['name should not be empty']);

    isValid = sut.validate({ ...UserDataBuilder({}), name: 10 as any });
    expect(isValid).toBeFalsy();
    expect(sut.errors['name']).toStrictEqual([
      'name must be shorter than or equal to 255 characters',
      'name must be a string',
    ]);

    isValid = sut.validate({ ...UserDataBuilder({}), name: 'a'.repeat(256) });
    expect(isValid).toBeFalsy();
    expect(sut.errors['name']).toStrictEqual([
      'name must be shorter than or equal to 255 characters',
    ]);
  });

  it('Invalidation cases for email field', () => {
    let isValid = sut.validate(null as any);
    expect(isValid).toBeFalsy();
    expect(sut.errors['email']).toStrictEqual([
      'email must be shorter than or equal to 255 characters',
      'email should not be empty',
      'email must be an email',
      'email must be a string',
    ]);

    isValid = sut.validate({ ...UserDataBuilder({}), email: '' as any });
    expect(isValid).toBeFalsy();
    expect(sut.errors['email']).toStrictEqual([
      'email should not be empty',
      'email must be an email',
    ]);

    isValid = sut.validate({ ...UserDataBuilder({}), email: 10 as any });
    expect(isValid).toBeFalsy();
    expect(sut.errors['email']).toStrictEqual([
      'email must be shorter than or equal to 255 characters',
      'email must be an email',
      'email must be a string',
    ]);

    isValid = sut.validate({ ...UserDataBuilder({}), email: 'a'.repeat(256) });
    expect(isValid).toBeFalsy();
    expect(sut.errors['email']).toStrictEqual([
      'email must be shorter than or equal to 255 characters',
      'email must be an email',
    ]);
  });

  it('Invalidation cases for password field', () => {
    let isValid = sut.validate(null as any);
    expect(isValid).toBeFalsy();
    expect(sut.errors['password']).toStrictEqual([
      'password must be shorter than or equal to 100 characters',
      'password should not be empty',
      'password must be a string',
    ]);

    isValid = sut.validate({ ...UserDataBuilder({}), password: '' as any });
    expect(isValid).toBeFalsy();
    expect(sut.errors['password']).toStrictEqual([
      'password should not be empty',
    ]);

    isValid = sut.validate({ ...UserDataBuilder({}), password: 10 as any });
    expect(isValid).toBeFalsy();
    expect(sut.errors['password']).toStrictEqual([
      'password must be shorter than or equal to 100 characters',
      'password must be a string',
    ]);

    isValid = sut.validate({
      ...UserDataBuilder({}),
      password: 'a'.repeat(101),
    });
    expect(isValid).toBeFalsy();
    expect(sut.errors['password']).toStrictEqual([
      'password must be shorter than or equal to 100 characters',
    ]);
  });

  it('Invalidation cases for createdAt field', () => {
    let isValid = sut.validate({ ...props, createdAt: 10 as any });
    expect(isValid).toBeFalsy();
    expect(sut.errors['createdAt']).toStrictEqual([
      'createdAt must be a Date instance',
    ]);

    isValid = sut.validate({ ...props, createdAt: '2023' as any });
    expect(isValid).toBeFalsy();
    expect(sut.errors['createdAt']).toStrictEqual([
      'createdAt must be a Date instance',
    ]);
  });
});
