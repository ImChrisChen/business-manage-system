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
  constructor(@InjectRepository(Todo) private readonly todoRepository: Repository<Todo>) {}
  create(createTodoDto: CreateTodoDto) {
    let todo = new Todo()
    todo = this.todoRepository.merge(todo, createTodoDto)
    return this.todoRepository.save(todo)
  }

  findAll() {
    return this.todoRepository.createQueryBuilder().select('*').getRawMany()
  }

  async findOne(id: number) {
    const todo = await this.todoRepository.createQueryBuilder().where({ id }).getOne()
    if (!todo) {
      return new SystemExceptionFilter(ResponseCodes.RESOURCE_NOT_FOUND)
    }
    return todo
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    let todo = await this.todoRepository.findOneBy({ id })
    todo = this.todoRepository.merge(todo, updateTodoDto)
    return this.todoRepository.save(todo)
  }

  async remove(id: number) {
    const res = await this.todoRepository.delete(id)
    if (res.affected) {
      return new SystemExceptionFilter(ResponseCodes.OK, {}, '删除成功')
    } else {
      return new SystemExceptionFilter(ResponseCodes.OK, {}, '资源不存在,删除失败')
    }
  }
}
