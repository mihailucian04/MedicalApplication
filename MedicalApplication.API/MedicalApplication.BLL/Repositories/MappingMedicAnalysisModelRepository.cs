using MedicalApplication.DAL;
using MedicalApplication.Models.ModelsDefinitions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalApplication.BLL.Repositories
{
    public class MappingMedicAnalysisModelRepository
    {
        private readonly Repository<MappingMedicAnalysisModel> _service;

        public MappingMedicAnalysisModelRepository(BaseDbContext context, BllUnitOfWork bll, bool persistContext = false)
        {
            _service = new Repository<MappingMedicAnalysisModel>(context, bll, persistContext);
        }

        public async Task AddMapping(MappingMedicAnalysisModel mapping)
        {
            mapping.Guid = Guid.NewGuid();
            await _service.AddAsync(mapping);
            
        }
    }
}
