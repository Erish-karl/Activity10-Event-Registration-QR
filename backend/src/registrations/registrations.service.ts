import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Registration } from '../entities/registration.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(Registration)
    private registrationsRepo: Repository<Registration>,
  ) {}

  async create(registration: Partial<Registration>): Promise<Registration> {
    const exists = await this.registrationsRepo.findOne({
      where: { eventId: registration.eventId, attendeeId: registration.attendeeId },
    });
    if (exists) throw new BadRequestException('Attendee already registered for this event');

    const ticketCode = uuidv4();
    const qrCode = await QRCode.toDataURL(ticketCode);

    const newReg = this.registrationsRepo.create({
      ...registration,
      ticketCode,
      qrCode,
      status: 'pending',
    });

    return this.registrationsRepo.save(newReg);
  }

  findAll(): Promise<Registration[]> {
    return this.registrationsRepo.find();
  }

  findAllByEvent(eventId: string): Promise<Registration[]> {
    return this.registrationsRepo.find({ where: { eventId } });
  }

  async findOne(id: string): Promise<Registration> {
    const reg = await this.registrationsRepo.findOne({ where: { id } });
    if (!reg) throw new NotFoundException('Registration not found');
    return reg;
  }

  async checkIn(id: string): Promise<Registration> {
    const reg = await this.findOne(id);
    reg.status = 'checked-in';
    return this.registrationsRepo.save(reg);
  }
}
