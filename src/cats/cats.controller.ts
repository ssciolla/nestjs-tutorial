import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { CreateCatDto, UpdateCatDto } from './cats.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    const newID = this.catsService.getNextID();
    const newCat = { id: newID, ...createCatDto };
    this.catsService.create(newCat);
    return newCat;
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Cat> {
    const result = this.catsService.find(id);
    if (result === undefined) throw new NotFoundException();
    return result;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<string> {
    const catToUpdate = { id: id, ...updateCatDto };
    const result = this.catsService.update(catToUpdate);
    if (!result) throw new NotFoundException();
    return `Cat with id ${id} was updated: ${JSON.stringify(catToUpdate)}`;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const result = this.catsService.delete(id);
    if (!result) throw new NotFoundException();
    return `Cat with id ${id} was removed.`;
  }
}
