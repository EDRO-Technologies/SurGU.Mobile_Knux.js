import { Injectable } from '@nestjs/common';
import { UserResponse } from '../user/responses/user.response';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SocialUser } from './types/socialUser';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import axios, { AxiosHeaders } from 'axios';

@Injectable()
export class AuthService {
  private JWT_SECRET: string;

  constructor(
    private readonly jwtService: JwtService, 
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    this.JWT_SECRET = configService.get<string>('AUTH_JWT_SECRET');
  }

  jwtSign(payload: object): string {
    return this.jwtService.sign(payload, { secret: this.JWT_SECRET });
  } 

  async weeekLogin(weeekToken: string): Promise<SocialUser> {
    try {
      const { data } = await axios.get(`https://api.weeek.net/public/v1/user/me`, {
        headers: {
          Authorization: `Bearer ${weeekToken}` 
        }
      });

      const { user } = data;

      const socialUser = new SocialUser({
        email: user.email,
        picture: user.logoLink,
        firstName: user.firstName,
        lastName: user.middleName ?? '',
      })

      return socialUser;

    } catch (e) {
      throw new Error('No weeek user');
    }
  }

  async socialLogin(user: SocialUser) {
    let dbUser = await this.userRepository.findOne({where: {
      email: user.email
    }})

    if (dbUser === null) {
      dbUser = await this.userRepository.save(
        this.userRepository.create({...user})
      );
    }

    const userResponse = new UserResponse({...dbUser});

    return {
      ...userResponse,
      accessToken: this.jwtSign({...userResponse })
    };
  }

  async getUserFromToken(token: string): Promise<User | null> {
    const payload = this.jwtService.verify(token, {
      secret: this.JWT_SECRET,
    });

    const userId = payload as UserResponse;

    if (userId) {
        return this.userRepository.findOne({where: {
          id: userId.id
        }});
    }
  }

}
