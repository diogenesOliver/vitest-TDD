import { Appointment } from '../entities/appointment'
import { AppointmentRepository } from '../repositories/appointmentRepository'

interface CreateAppointmentRequest{
    customer: string,
    startsAt: Date,
    endsAt: Date
}

type CreateAppointmentResponse = Appointment

export class CreateAppointment{
    constructor(
        private appointmentRepository: AppointmentRepository
    ){}

    async execute({ customer, startsAt, endsAt }: CreateAppointmentRequest): Promise<CreateAppointmentResponse>{
        const overLappingAppointment = await this.appointmentRepository.findOverLappingAppointment(
            startsAt,
            endsAt
        )

        if(overLappingAppointment)
            throw new Error('Another appointment overlaps this appointment dates')

        const appointment = new Appointment({
            customer,
            startsAt,
            endsAt
        })

        await this.appointmentRepository.create(appointment)

        return appointment
    }
}