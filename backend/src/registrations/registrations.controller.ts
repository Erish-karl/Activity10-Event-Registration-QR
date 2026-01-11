// registrations.controller.ts
import { Controller, Get, Param, Put, Post, Body } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { Registration } from '../entities/registration.entity';

@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Get('event/:eventId')
  getEventRegistrations(@Param('eventId') eventId: string): Promise<Registration[]> {
    return this.registrationsService.findAllByEvent(eventId);
  }

  @Put(':id/check-in')
  checkIn(@Param('id') id: string): Promise<Registration> {
    return this.registrationsService.checkIn(id);
  }

  @Post()
  create(@Body() body: { eventId: string; attendeeId: string }): Promise<Registration> {
    return this.registrationsService.create(body);
  }
}
