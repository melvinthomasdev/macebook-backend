import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import User from './entities/user.entity'

@Injectable()
export class UserService {
  constructor (
    @InjectRepository (User)
    private readonly userRepository: Repository<User>,
    // private readonly jwtService : JwtService,
  ){}
  async createUser(data: any): Promise<any> {
    try {
        const { email,password } = data;
        const user = await this.userRepository.findOne({
          email: email.toLowerCase(),
        });
        if (user) {
          if (!user.password) {
            const hash = await bcrypt.hash(password, 10);
            const data = {
              password: hash,
            };
            await this.userRepository.update(user.id, data);
          }
          return {
            success: false,
            message: 'User Exist',
            data: {
              email: 'User already exist, please login.',
            },
          };
        } else {
          data.password = await bcrypt.hash(data.password, 10);
          data.status = 'ACTIVE';
          data.uid = uuidv4();
          const fetchUser = await this.userRepository.save(data);
          const { ...result } = fetchUser;
          delete result.password;
          return {
            success: true,
            message: 'Success',
            data: result,
          };
        }

    } catch (err) {
      console.log('err', err);
      return {
        success: false,
        message: 'Something went wrong..! Registration failed.',
      };
    }
  }
}
