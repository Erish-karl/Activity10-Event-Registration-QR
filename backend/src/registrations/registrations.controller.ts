import { Controller, Get, Post, Param, Body, Patch } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { Registration } from '../entities/registration.entity';

@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post()
  create(@Body() registration: Partial<Registration>): Promise<Registration> {
    return this.registrationsService.create(registration);
  }

  @Get(':eventId')
  findAllByEvent(@Param('eventId') eventId: string): Promise<Registration[]> {
    return this.registrationsService.findAllByEvent(eventId);
  }

  @Patch(':id/checkin')
  checkIn(@Param('id') id: string): Promise<Registration> {
    return this.registrationsService.checkIn(id);
  }
  @Get()
findAll(): Promise<Registration[]> {
  return this.registrationsService.findAll(); // ✅ call the service
}

}
