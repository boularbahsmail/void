import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  // Static users array
  private users = [
    {
      id: 1,
      name: 'Ismail Boularbah',
      email: 'boularbahismail01@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'doejohn01@gmail.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Bruce Wayne',
      email: 'waynebruce@gmail.com',
      role: 'ADMIN',
    },
  ];

  // Find/Get all users
  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }

    return this.users;
  }

  // Find one user
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return 'User Not Found';
    }

    return user;
  }

  // Create user
  create(user: CreateUserDto) {
    const highestId = [...this.users].sort((x, y) => y.id - x.id);
    const newUser = {
      id: highestId[0].id + 1, // Generating the next highest id
      ...user,
    };

    this.users.push(newUser);
    return newUser;
  }

  // Update user
  update(id: number, updatedUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }

      return user;
    });

    // Find the updated user
    return this.findOne(id);
  }

  // Delete user
  delete(id: number) {
    const userToBeRemoved = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);

    return userToBeRemoved;
  }
}
