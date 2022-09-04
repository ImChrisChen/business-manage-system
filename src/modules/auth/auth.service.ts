import { Injectable } from '@nestjs/common';
import { UserService } from "../user/user.service";
import { User } from "../user/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {
  }

  async vailddateUser (username:string, password: string):Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findOne({name: username})
    if (user && user.password === password) {
      const {password, ...result} = user
      return result
    }
    return null
  }
}
