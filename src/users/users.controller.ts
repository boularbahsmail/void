import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // (routes)
export class UsersController {
  // Dependency injection
  constructor(private usersService: UsersService) {}

  @Get() // GET => /users OR /users?role=value
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.findAll(role);
  }

  @Get(':id') // GET => /users/:id
  findOne(@Param('id') id: number) {
    // (+) unary
    return this.usersService.findOne(+id);
  }

  @Post() // POST => /users
  create(
    @Body()
    user: {
      name: string;
      email: string;
      role: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    return this.usersService.create(user);
  }

  @Patch(':id') // PATCH/PUT/UPDATE => /users/:id
  update(
    @Param('id') id: number,
    @Body()
    userUpdate: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    // (+) unary
    return this.usersService.update(+id, userUpdate);
  }

  @Delete(':id') // DELETE => /users/:id
  delete(@Param('id') id: number) {
    // (+) unary
    return this.usersService.delete(+id);
  }
}
