import { useForm } from "react-hook-form"
import ErrorComponent from "./ErrorComponent"
import type { DraftPatient } from "../types"
import { usePatientStore } from "../store"
import { useEffect } from "react"
import { toast } from "react-toastify"
export default function PatientsForm() {

    const addPatient = usePatientStore(state => state.addPatient)
    const activeId = usePatientStore(state => state.activeId)
    const patients = usePatientStore(state => state.patients)
    const updatePatient = usePatientStore(state => state.updatePatient)


    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<DraftPatient>()

    useEffect(() => {
        if (activeId) {
            const activePatient = patients.filter(patient => patient.id === activeId)[0]
            setValue('name', activePatient.name)
            setValue('caretaker', activePatient.caretaker)
            setValue('date', activePatient.date)
            setValue('email', activePatient.email)
            setValue('symptoms', activePatient.symptoms)
        }
    }, [activeId])

    const registerPatient = (data: DraftPatient) => {
        if (activeId) {
            updatePatient(data)
            toast.success('Patient Updated Successfully')
        } else {
            addPatient(data)
            toast.success('Patient Registered Correctly')
        }
        reset()
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5" >
            <h2 className="font-black text-3xl text-center">Patient Follow-up</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Add Patients and {''}
                <span className="text-indigo-600 font-bold">Manage</span>
            </p>

            <form
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
                noValidate
                onSubmit={handleSubmit(registerPatient)}
            >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Patient
                    </label>
                    <input
                        id="name"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Patient Name"
                        {...register('name', {
                            required: 'The Patients Name is Mandatory'
                        })}
                    />
                    {errors.name && (
                        <ErrorComponent>
                            {errors.name?.message}
                        </ErrorComponent>
                    )}

                </div>

                <div className="mb-5">
                    <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                        Owner
                    </label>
                    <input
                        id="caretaker"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Owner Name"
                        {...register('caretaker', {
                            required: 'The Owner Name is Mandatory'
                        })}
                    />
                    {errors.caretaker && (
                        <ErrorComponent>
                            {errors.caretaker?.message}
                        </ErrorComponent>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="text-sm uppercase font-bold">
                        Email
                    </label>
                    <input
                        id="email"
                        className="w-full p-3  border border-gray-100"
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: "The Email is Mandatory",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid Email'
                            }
                        })}
                    />
                    {errors.email && (
                        <ErrorComponent>
                            {errors.email?.message}
                        </ErrorComponent>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="date" className="text-sm uppercase font-bold">
                        High Date
                    </label>
                    <input
                        id="date"
                        className="w-full p-3  border border-gray-100"
                        type="date"
                        {...register('date', {
                            required: 'High date is Mandatory'
                        })}
                    />
                    {errors.date && (
                        <ErrorComponent>
                            {errors.date?.message}
                        </ErrorComponent>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                        Symptoms
                    </label>
                    <textarea
                        id="symptoms"
                        className="w-full p-3  border border-gray-100"
                        placeholder="Patient Symptoms"
                        {...register('symptoms', {
                            required: 'Symptoms is Mandatory'
                        })}
                    />
                    {errors.symptoms && (
                        <ErrorComponent>
                            {errors.symptoms?.message}
                        </ErrorComponent>
                    )}
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value='Save Patient'
                />
            </form>
        </div>
    )
}
