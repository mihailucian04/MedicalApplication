using MedicalApplication.DAL;
using MedicalApplication.Models.ModelsDefinitions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalApplication.BLL.Repositories
{
    public class RegistryOfficeRepository
    {
        private readonly Repository<RegistrationModel> _service;

        public RegistryOfficeRepository(BaseDbContext context, BllUnitOfWork bll, bool persistContext = false)
        {
            _service = new Repository<RegistrationModel>(context, bll, persistContext);
        }

        public async Task<RegistrationModel> GetRegistryOfficeByGuid(Guid registryOfficeGuid)
        {
            var registryOffice = await _service.FindAsync(t => t.Guid == registryOfficeGuid);

            return registryOffice;
        }

        public async Task<bool> CheckIfRegistryOfficeExists(string department)
        {
            var result = await _service.FindAsync(t => t.Department.Name == department);

            if (result != null)
                return true;

            return false;
        }

        public async Task<bool> AddNewRegistryOffice(RegistrationModel model)
        {
            var result = await _service.AddAsync(model);

            if (result != null)
                return true;

            return false;
        }
    }
}
