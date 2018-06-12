using MedicalApplication.DAL;
using MedicalApplication.Models.ModelsDefinitions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalApplication.BLL.Repositories
{
    public class AnalysisTypeModelRepository
    {
        private readonly Repository<AnalysisTypeModel> _service;

        public AnalysisTypeModelRepository(BaseDbContext context, BllUnitOfWork bll, bool persistContext = false)
        {
            _service = new Repository<AnalysisTypeModel>(context, bll, persistContext);
        }

        public async Task<IEnumerable<AnalysisTypeModel>> GetAnalyzes(int itemsPerPage, int page)
        {
            var analyzesList = await _service.FindAllAsync(itemsPerPage, page);

            return analyzesList;
        }

        public async Task<int> GetNumberOfAnalyzes()
        {
            var count = await _service.CountAsync();

            return count;
        }
    }
}
