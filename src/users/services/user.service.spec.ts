import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../Entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  const save = jest.fn();
  const find = jest.fn();
  const remove = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save,
            findOne: () => false,
            find,
            delete: remove
          }
        }
      ],

    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('save method should call save in the UserRepository', async () => {
    await userService.save("email","password");

    expect(save).toBeCalled();

  })
  
  it('findALl method should call find in the UserRepository', async () => {
    await userService.findAll();

    expect(find).toBeCalled();
  })
  
  it('findOne method should call find in the UserRepository', async () => {
    const shouldBeFalse = await userService.findOne('10912klkslsds0dis');
    
    expect(shouldBeFalse).toEqual(false);
  })
  
  it('remove method should call remove in the UserRepository', async () => {
    await userService.remove('10912klkslsds0dis');
    
    expect(remove).toBeCalled();
  })
});
