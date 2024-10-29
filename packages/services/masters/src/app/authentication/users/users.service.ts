import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';
import { CreateUser } from '../../../../../../libs/shared-models/src/authentication/create-user';
import { GlobalResponseObject } from '../../../../../../libs/backend-utils/src/common-elements/common.response';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(req: CreateUser): Promise<GlobalResponseObject> {
    const { email, password } = req;
    const existingUser = await this.findOne(email);
    if (existingUser) {
        return GlobalResponseObject.createResponse(false, 409, 'User with this email already exists.'); 
    }

    const user = new User(); 
    user.email = email; 
    user.password = bcrypt.hashSync(password, 10); 

    const savedUser = await this.usersRepository.save(user); 

    return GlobalResponseObject.createResponse(true, 201, 'User created successfully.', [savedUser]); 
}

}
