import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Attendee } from '../entities/attendee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class AttendeesService {
  constructor(
    @InjectRepository(Attendee)
    private attendeesRepo: Repository<Attendee>,
  ) {}

  findAll(): Promise<Attendee[]> {
    return this.attendeesRepo.find();
  }

  async findOne(id: string): Promise<Attendee> {
  const attendee = await this.attendeesRepo.findOne({ where: { id } });
  if (!attendee) throw new NotFoundException('Attendee not found');
  return attendee;
}

async findByEmail(email: string): Promise<Attendee> {
  const attendee = await this.attendeesRepo.findOne({ where: { email } });
  if (!attendee) throw new NotFoundException('Attendee not found');
  return attendee;
}

  create(attendee: Partial<Attendee>): Promise<Attendee> {
    const newAttendee = this.attendeesRepo.create(attendee);
    return this.attendeesRepo.save(newAttendee);
  }

  async update(id: string, data: Partial<Attendee>): Promise<Attendee> {
    await this.attendeesRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.attendeesRepo.delete(id);
  }
}
