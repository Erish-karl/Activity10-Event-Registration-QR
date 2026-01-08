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

  @Column({ unique: true })
  ticketCode: string;

  @Column({ type: 'longtext' }) // 🔥 IMPORTANT FIX
  qrCode: string;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
