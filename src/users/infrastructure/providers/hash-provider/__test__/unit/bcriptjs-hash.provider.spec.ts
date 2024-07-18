import { BcryptjsHashProvider } from '../../bcryptjs-hash.provider';

describe('BcryptJsHashProvider unit tests', () => {
  let sut: BcryptjsHashProvider;

  beforeEach(() => {
    sut = new BcryptjsHashProvider();
  });

  it('Should return encryoted password', async () => {
    const hash = await sut.generateHash('password');
    expect(hash).toBeDefined();
  });

  it('Should return false on invalid password and hash comparion', async () => {
    const hash = await sut.generateHash('123456');
    const result = await sut.compareHash('fake', hash);
    expect(result).toBeFalsy();
  });

  it('Should return true on valid password and hash comparion', async () => {
    const hash = await sut.generateHash('123456');
    const result = await sut.compareHash('123456', hash);
    expect(result).toBeTruthy();
  });
});
