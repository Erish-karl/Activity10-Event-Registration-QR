import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Event } from './entities/event.entity';
import { Attendee } from './entities/attendee.entity';
import { Registration } from './entities/registration.entity';

// Controllers
import { AppController } from './app.controller';
import { EventsController } from 'src/events/events.controller';
import { AttendeesController } from 'src/attendees/attendees.controller';
import { RegistrationsController } from 'src/registrations/registrations.controller';

// Services
import { AppService } from 'src/app.service';
import { EventsService } from 'src/events/events.service';
import { AttendeesService } from 'src/attendees/attendees.service';
import { RegistrationsService } from 'src/registrations/registrations.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'eventdb',
      entities: [Event, Attendee, Registration],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Event, Attendee, Registration]),
  ],
  controllers: [
    AppController,
    EventsController,
    AttendeesController,
    RegistrationsController,
  ],
  providers: [
    AppService,
    EventsService,
    AttendeesService,
    RegistrationsService,
  ],
})
export class AppModule {}

