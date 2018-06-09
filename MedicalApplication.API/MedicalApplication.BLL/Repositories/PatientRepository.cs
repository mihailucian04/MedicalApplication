using MedicalApplication.DAL;
using MedicalApplication.Models.ModelsDefinitions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalApplication.BLL.Repositories
{
    public class PatientRepository
    {
        private readonly Repository<PatientModel> _service;

        public PatientRepository(BaseDbContext context, BllUnitOfWork bll, bool persistContext = false)
        {
            _service = new Repository<PatientModel>(context, bll, persistContext);
        }

        public async Task<IEnumerable<PatientModel>> GetPatientsByMedicGuid(Guid medicGuid)
        {
            var patientList = await _service.FindAllAsync(t => t.MedicGuid == medicGuid && !t.IsDeleted);

            return patientList;
        }

        public async Task<PatientModel> GetPatientByGuid(Guid patientGuid)
        {
            var patientModel = await _service.FindAsync(t => t.Guid == patientGuid && !t.IsDeleted);

            return patientModel;
        }

        public async Task<bool> AddPatient(PatientModel patient)
        {
            var patientExists = await _service.FindAsync(t => t.CNP == patient.CNP);
            if(patientExists == null)
            {
                patient.Guid = Guid.NewGuid();
                await _service.AddAsync(patient);
                return true;
            }

            return false;
        }

        public async Task<int> GetNumberOfPatientsByMedicGuid(Guid medicGuid)
        {
            var count = await _service.CountAllAsync(t => t.MedicGuid == medicGuid && !t.IsDeleted);

            return count;
        }

        public async Task<IEnumerable<PatientModel>> GetPatientsByMedicGuid(Guid medicGuid, int itemsPerPage, int page)
        {
            var patientList = await _service.FindAllAsync(t => t.MedicGuid == medicGuid && !t.IsDeleted,itemsPerPage,page);

            return patientList;
        }

        public async Task<bool> UpdatePatient(PatientModel patient)
        {
            var patientUpdated = await _service.UpdateAsync(patient);

            if(patientUpdated == null)
            {
                return false;
            }
            return true;
        }

        public async Task<bool> DeletePatient(Guid patientGuid)
        {
            var patient = await _service.FindAsync(t => t.Guid == patientGuid);

            patient.IsDeleted = true;

            var patientUpdated = await _service.UpdateAsync(patient);

            if(patientUpdated == null)
            {
                return false;
            }
            return true;
        }
    }
}
