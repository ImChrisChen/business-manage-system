import { Injectable } from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Todo } from './entities/todo.entity'
import { Repository } from 'typeorm'
import { SystemExceptionFilter } from '../../common/filters/system-exception.filter'
import { ResponseCodes } from '../../config'

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private readonly repository: Repository<Todo>) {}
  create(createTodoDto: CreateTodoDto) {
    let todo = new Todo()
    todo = this.repository.merge(todo, createTodoDto)
    return this.repository.save(todo)
  }

  findAll() {
    return this.repository.createQueryBuilder().getMany()
  }

  async findOne(id: number) {
    const todo = await this.repository.findOneBy({ id })
    if (!todo) {
      throw new SystemExceptionFilter(ResponseCodes.RESOURCE_NOT_FOUND)
    }
    return todo
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    let todo = await this.repository.findOneBy({ id })
    todo = this.repository.merge(todo, updateTodoDto)
    return this.repository.save(todo)
  }

  async remove(id: number) {
    const res = await this.repository.delete(id)
    if (!res.affected) {
      throw new SystemExceptionFilter(ResponseCodes.OK, {}, '资源不存在,删除失败')
    }
    return res
  }
}
