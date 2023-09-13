import { areIntervalsOverlapping } from "date-fns";

import { Appointment } from "../../entities/appointment";
import { AppointmentRepository } from "../appointmentRepository";

export class InMemoryAppointmentsRepository implements AppointmentRepository {
    public items: Appointment[] = []

    async create(appointments: Appointment): Promise<void> {
        this.items.push(appointments)
    }

    async findOverLappingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null> {
        const overLappingAppointment = this.items.find(appointment => {
            return areIntervalsOverlapping(
                { start: startsAt, end: endsAt },
                { start: appointment.startsAt, end: appointment.endsAt },
                { inclusive: true },
            )
        })

        if(!overLappingAppointment)
            return null

        return overLappingAppointment
    }
}