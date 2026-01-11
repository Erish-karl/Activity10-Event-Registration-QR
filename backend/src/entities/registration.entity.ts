import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Event } from './event.entity';
import { Attendee } from './attendee.entity';

@Entity()
export class Registration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  eventId: string;

  @Column()
  attendeeId: string;

  @ManyToOne(() => Event)
  @JoinColumn({ name: 'eventId' })
  event: Event;

  @ManyToOne(() => Attendee)
  @JoinColumn({ name: 'attendeeId' })
  attendee: Attendee;

  // 🎟 Unique ticket reference (UUID)
  @Column({ unique: true })
  ticketCode: string;

  // 📱 QR code data (base64 or string)
  @Column({ type: 'text' })
  qrCode: string;

  // 🚦 Ticket status
  @Column({ default: 'VALID' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
