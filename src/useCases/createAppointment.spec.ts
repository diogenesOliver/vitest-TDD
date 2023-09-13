import { describe, expect, it } from 'vitest'
import { CreateAppointment } from './createAppointment'
import { Appointment } from '../entities/appointment'
import { getFutureDate } from '../__tests__/utils/getFutureDate'
import { InMemoryAppointmentsRepository } from '../repositories/implementation/inMemoryAppointmentsRepository'

describe('Create Appointment', () => {
    it('Should be abble to create an appointment', () => {
        const startsAt = getFutureDate('2022-08-10')
        const endsAt = getFutureDate('2022-08-11')

        const appointmentRepository = new InMemoryAppointmentsRepository()
        const createAppointment = new CreateAppointment(
            appointmentRepository
        )

        expect(createAppointment.execute({
            customer: 'Jhon Doe',
            startsAt,
            endsAt,
        })).resolves.toBeInstanceOf(Appointment)
    })

    it('Should not be abble to create an appointment with overlapping dates', async () => {
        const startsAt = getFutureDate('2022-08-10')
        const endsAt = getFutureDate('2022-08-15')

        const appointmentRepository = new InMemoryAppointmentsRepository()
        const createAppointment = new CreateAppointment(
            appointmentRepository
        )

        await createAppointment.execute({
            customer: 'Jhon Doe',
            startsAt,
            endsAt,
        })

        expect(
            createAppointment.execute({
                customer: 'Jhon Doe',
                startsAt: getFutureDate('2022-08-14'),
                endsAt: getFutureDate('2022-08-18')
            })
        ).rejects.toBeInstanceOf(Error)
        
        expect(
            createAppointment.execute({
                customer: 'Jhon Doe',
                startsAt: getFutureDate('2022-08-08'),
                endsAt: getFutureDate('2022-08-12')
            })
        ).rejects.toBeInstanceOf(Error)
        
        expect(
            createAppointment.execute({
                customer: 'Jhon Doe',
                startsAt: getFutureDate('2022-08-08'),
                endsAt: getFutureDate('2022-08-17')
            })
        ).rejects.toBeInstanceOf(Error)
        
        expect(
            createAppointment.execute({
                customer: 'Jhon Doe',
                startsAt: getFutureDate('2022-08-11'),
                endsAt: getFutureDate('2022-08-12')
            })
        ).rejects.toBeInstanceOf(Error)
    })
})