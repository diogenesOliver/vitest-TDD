import { Appointment } from "../entities/appointment";

export interface AppointmentRepository{
    create(appointments: Appointment): Promise<void>
    findOverLappingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null>
}