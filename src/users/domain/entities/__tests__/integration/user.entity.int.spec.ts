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
      new UserEntity(props);
    });
  });

  describe('Update method', () => {
    it('Should throw an error when update a user with invalid name', () => {
      const entity = new UserEntity(UserDataBuilder({}));
      expect(() => entity.update(null)).toThrowError(EntityValidationError);
      expect(() => entity.update('')).toThrowError(EntityValidationError);
      expect(() => entity.update(1 as any)).toThrowError(EntityValidationError);
      expect(() => entity.update('a'.repeat(256))).toThrowError(
        EntityValidationError,
      );
    });
    it('Should a valid user', () => {
      expect.assertions(0);
      const props: UserProps = {
        ...UserDataBuilder({}),
      };
      const entity = new UserEntity(props);
      entity.update('other name');
    });
  });
  describe('Update password method', () => {
    it('Should throw an error when update a user with invalid name', () => {
      const entity = new UserEntity(UserDataBuilder({}));
      expect(() => entity.updatePassword(null)).toThrowError(
        EntityValidationError,
      );
      expect(() => entity.updatePassword('')).toThrowError(
        EntityValidationError,
      );
      expect(() => entity.updatePassword(1 as any)).toThrowError(
        EntityValidationError,
      );
      expect(() => entity.updatePassword('a'.repeat(101))).toThrowError(
        EntityValidationError,
      );
    });
    it('Should a valid user', () => {
      expect.assertions(0);
      const props: UserProps = {
        ...UserDataBuilder({}),
      };
      const entity = new UserEntity(props);
      entity.updatePassword('other password');
    });
  });
});
