import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AttendeesService } from './attendees.service';
import { Attendee } from '../entities/attendee.entity';

@Controller('attendees')
export class AttendeesController {
  constructor(private readonly attendeesService: AttendeesService) {}

  @Get()
  findAll(): Promise<Attendee[]> {
    return this.attendeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Attendee> {
    return this.attendeesService.findOne(id);
  }

  @Post()
  create(@Body() attendee: Partial<Attendee>): Promise<Attendee> {
    return this.attendeesService.create(attendee);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Attendee>): Promise<Attendee> {
    return this.attendeesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendeesService.remove(id);
  }
}
