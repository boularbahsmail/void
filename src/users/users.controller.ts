import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users') // (routes)
export class UsersController {
  // Dependency injection
  constructor(private usersService: UsersService) {}

  @Get() // GET => /users OR /users?role=value
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.findAll(role);
  }

  @Get(':id') // GET => /users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    // (+) unary
    return this.usersService.findOne(id);
  }

  @Post() // POST => /users
  create(
    @Body(ValidationPipe)
    user: CreateUserDto,
  ) {
    return this.usersService.create(user);
  }

  @Patch(':id') // PATCH/PUT/UPDATE => /users/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    user: UpdateUserDto,
  ) {
    // (+) unary
    return this.usersService.update(id, user);
  }

  @Delete(':id') // DELETE => /users/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    // (+) unary
    return this.usersService.delete(id);
  }
}
