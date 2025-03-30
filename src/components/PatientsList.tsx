import { usePatientStore } from "../store"
import PatientDetail from "./PatientDetail"

export default function PatientsList() {

  const patients = usePatientStore(state => state.patients)

  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      {patients.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Patients List</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Manage your  {" "}
            <span className="text-indigo-600 font-bold">Patients and Appointments</span>
          </p>
          {patients.map(patient => (
            <PatientDetail
              key={patient.id}
              patient={patient}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">
            There are not Patients
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Add Patients {" "}
            <span className="text-indigo-600 font-bold">to Apear</span>
          </p>
        </>
      )
      }
    </div >
  )
}
