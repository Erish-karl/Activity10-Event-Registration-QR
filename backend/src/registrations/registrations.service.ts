import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Registration } from '../entities/registration.entity';
import { Event } from '../entities/event.entity';
import { Attendee } from '../entities/attendee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(Registration)
    private registrationsRepo: Repository<Registration>,

    @InjectRepository(Event)
    private eventsRepo: Repository<Event>, // ✅ Inject Event repo

    @InjectRepository(Attendee)
    private attendeesRepo: Repository<Attendee>, // ✅ Inject Attendee repo
  ) {}

  // Create a new registration
  async create(registration: Partial<Registration>): Promise<Registration> {
    // Check if event exists
    const event = await this.eventsRepo.findOne({ where: { id: registration.eventId } });
    if (!event) throw new BadRequestException('Event not found');

    // Check if attendee exists
    const attendee = await this.attendeesRepo.findOne({ where: { id: registration.attendeeId } });
    if (!attendee) throw new BadRequestException('Attendee not found');

    // Prevent duplicate registration
    const exists = await this.registrationsRepo.findOne({
      where: { eventId: registration.eventId, attendeeId: registration.attendeeId },
    });
    if (exists) throw new BadRequestException('Attendee already registered for this event');

    // Generate ticket code and QR code
    const ticketCode = uuidv4();
    const qrCode = await QRCode.toDataURL(ticketCode);

    // Create and save registration
    const newReg = this.registrationsRepo.create({
      ...registration,
      ticketCode,
      qrCode,
      status: 'pending',
    });

    return this.registrationsRepo.save(newReg);
  }

  // Get all registrations
  findAll(): Promise<Registration[]> {
    return this.registrationsRepo.find();
  }

  // Get all registrations for a specific event
  findAllByEvent(eventId: string): Promise<Registration[]> {
    return this.registrationsRepo.find({ where: { eventId } });
  }

  // Get one registration by ID
  async findOne(id: string): Promise<Registration> {
    const reg = await this.registrationsRepo.findOne({ where: { id } });
    if (!reg) throw new NotFoundException('Registration not found');
    return reg;
  }

  // Check-in a registration
  async checkIn(id: string): Promise<Registration> {
    const reg = await this.findOne(id);
    reg.status = 'checked-in';
    return this.registrationsRepo.save(reg);
  }
}
