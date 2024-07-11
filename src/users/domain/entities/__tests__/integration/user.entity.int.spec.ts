import { UserDataBuilder } from '@/users/domain/testing/helpers/user-date-builder';
import { UserEntity, UserProps } from '../../user.entity';
import { EntityValidationError } from '@/shared/domain/erros/validation-error';

describe('UserEntity integratios tests', () => {
  describe('Constructor method', () => {
    it('Should throw an error when creating a user with invalid name', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        name: null,
      };
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        name: '',
      };

      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);
      props = {
        ...UserDataBuilder({}),
        name: 1 as any,
      };
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        name: 'a'.repeat(256),
      };
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);
    });

    it('Should throw an error when creating a user with invalid email', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        email: null,
      };
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        email: '',
      };

      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);
      props = {
        ...UserDataBuilder({}),
        email: 1 as any,
      };
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        email: 'a'.repeat(256),
      };
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);
    });

    it('Should throw an error when creating a user with invalid password', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        password: null,
      };
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        password: '',
      };

      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);
      props = {
        ...UserDataBuilder({}),
        password: 1 as any,
      };
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        password: 'a'.repeat(101),
      };
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);
    });

    it('Should throw an error when creating a user with invalid createdAt', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        createdAt: '2023' as any,
      };
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        createdAt: 1 as any,
      };
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);
    });

    it('Should a valid user', () => {
      expect.assertions(0);
      const props: UserProps = {
        ...UserDataBuilder({}),
      };
      const sut = new UserEntity(props);

      new UserEntity(props);
      expect(sut.props.name).toEqual(props.name);
      expect(sut.props.email).toEqual(props.email);
      expect(sut.props.password).toEqual(props.password);
      expect(sut.props.createdAt).toBeInstanceOf(Date);
    });
  });
});
