import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

const user = new User();
// user.uuid = '689df679-29a7-468f-8688-ef37b9a8ac82';
user.identification = '123456';
user.name = 'Juan Sebastian';
user.lastName = 'Franco Cervera';
user.email = 'jsfc2198@gmail.com';
user.password = '123456';
user.phone = null;
user.cellphone = null;
describe('UserService', () => {
  let userService: UserService;
  let userRepositoryMock: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(user),
          },
        },
      ],
      imports: [],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepositoryMock = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return one user', async () => {
      //arrange
      const uuid = 'an uuid';
      const repoSpy = jest.spyOn(userRepositoryMock, 'findOne');

      //act
      const userFound = userService.findOne(uuid);

      //assert
      expect(userFound).resolves.toEqual(user);
      expect(repoSpy).toHaveBeenCalledTimes(1);
      expect(repoSpy).toHaveBeenCalledWith({
        where: { uuid },
        relations: { creditCards: true, addresses: true },
      });
    });
  });
});
