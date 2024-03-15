import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './controllers/user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../../ormconfig';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
      imports: [
        TypeOrmModule.forRoot(dataSourceOptions),
        TypeOrmModule.forFeature([User]),
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const user = new User();
      user.uuid = '689df679-29a7-468f-8688-ef37b9a8ac82';
      user.identification = '123456';
      user.name = 'Juan Sebastian';
      user.lastName = 'Franco Cervera';
      user.email = 'jsfc2198@gmail.com';
      user.password = '123456';
      user.phone = null;
      user.cellphone = null;
      const result = [user];

      jest
        .spyOn(userService, 'findAll')
        .mockImplementation(() => Promise.resolve(result));

      expect(await userController.findAll()).toBe(result);
    });
  });
});
