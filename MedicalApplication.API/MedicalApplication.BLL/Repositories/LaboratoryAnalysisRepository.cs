using MedicalApplication.DAL;
using MedicalApplication.Models.ModelsDefinitions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalApplication.BLL.Repositories
{
    public class LaboratoryAnalysisRepository
    {
        public readonly Repository<LaboratoryModel> _service;

        public LaboratoryAnalysisRepository(BaseDbContext context, BllUnitOfWork bll, bool persistContext = false)
        {
            _service = new Repository<LaboratoryModel>(context, bll, persistContext);
        }

        public async Task<LaboratoryModel> GetLaboratoryByGuid(Guid laboratoryGuid)
        {
            var laboratory = await _service.FindAsync(t => t.Guid == laboratoryGuid);

            return laboratory;
        }

        public async Task<bool> CheckIfLaboratoryExists(string name)
        {
            var result = await _service.FindAsync(t => t.Name == name);

            if (result != null)
                return true;

            return false;
        }

        public async Task<bool> AddNewLaboratory(LaboratoryModel laboratoryModel)
        {
            var result = await _service.AddAsync(laboratoryModel);

            if (result != null)
                return true;

            return false;
        }
    }
}
