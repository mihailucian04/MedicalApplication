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

        public async Task<IEnumerable<MappingMedicAnalysisModel>> GetAllMappingAnalyzes(int itemsPerPage, int page)
        {
            var mappingList = await _service.FindAllAsync(itemsPerPage, page);
            return mappingList;
        }

        public async Task<int> GetCount()
        {
            var count = await _service.CountAsync();

            return count;
        }
    }
}
