import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Event } from '../entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepo: Repository<Event>,
  ) {}

  findAll(): Promise<Event[]> {
    return this.eventsRepo.find();
  }

  async findOne(id: string): Promise<Event> {
  const event = await this.eventsRepo.findOne({ where: { id } });
  if (!event) throw new NotFoundException('Event not found');
  return event;
}

  create(event: Partial<Event>): Promise<Event> {
    const newEvent = this.eventsRepo.create(event);
    return this.eventsRepo.save(newEvent);
  }

  async update(id: string, data: Partial<Event>): Promise<Event> {
    await this.eventsRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.eventsRepo.delete(id);
  }
}
