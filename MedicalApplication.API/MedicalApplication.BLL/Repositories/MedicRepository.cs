using MedicalApplication.DAL;
using MedicalApplication.Models.ModelsDefinitions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalApplication.BLL.Repositories
{
    public class MedicRepository
    {
        private readonly Repository<MedicModel> _service;

        public MedicRepository(BaseDbContext context, BllUnitOfWork bll, bool persistContext = false)
        {
            _service = new Repository<MedicModel>(context, bll, persistContext);
        }

        //TODO: Change this to check after unique field
        public async Task<bool> CheckIfMedicExists(string firstname, string lastname)
        {
            var result = await _service.FindAsync(t => t.FirstName == firstname && t.LastName == lastname);

            if (result != null)
                return true;

            return false;
        }

        public async Task<bool> AddNewMedic(MedicModel medicModel)
        {
            var result = await _service.AddAsync(medicModel);

            if (result != null)
                return true;

            return false;
        }
    }
}
