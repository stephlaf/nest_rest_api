import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      "id": 1,
      "name": "Gilles Serge",
      "email": "gilles@serge.ca",
      "role": "admin"
    },
    {
      "id": 2,
      "name": "Paul Lanoue",
      "email": "paul@lanoe.ca",
      "role": "engineer"
    },
    {
      "id": 3,
      "name": "Solange Serge",
      "email": "solange@serge.ca",
      "role": "intern"
    },
    {
      "id": 4,
      "name": "Rejean Serge",
      "email": "rejean@serge.ca",
      "role": "intern"
    },
    {
      "id": 5,
      "name": "Marie-Josee Coache",
      "email": "mj@coache.ca",
      "role": "intern"
    },
  ]

  findAll(role?: 'intern' | 'engineer' | 'admin') {
    if (role) {
      const rolesArray = this.users.filter(user => user.role === role)
      if (rolesArray.length === 0) throw new NotFoundException('No users with that role')
      return rolesArray
    }
    return this.users
  }

  findOne(id: number) {
    const user = this.users.find(user => user.id === id)

    if (!user) throw new NotFoundException('User not found 😕')

    return user
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)

    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto
    }
    this.users.push(newUser)

    return newUser
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map(user => {
      if (user.id === id) {
        return { ...user, ...updateUserDto }
      }
      return user
    })

    return this.findOne(id)
  }

  delete(id: number) {
    const removedUser = this.findOne(id)

    this.users = this.users.filter(user => user.id !== id)

    return removedUser
  }
}
