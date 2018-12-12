using MedicalApplication.DAL;
using MedicalApplication.Models.ModelsDefinitions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalApplication.BLL.Repositories
{
    public class DepartmentRepository
    {
        private readonly Repository<DepartmentModel> _service;

        public DepartmentRepository(BaseDbContext context, BllUnitOfWork bll, bool persistContext = false)
        {
            _service = new Repository<DepartmentModel>(context, bll, persistContext);
        }

        public async Task<DepartmentModel> GetDepartmentByName(string departmentName)
        {
            var departmentModel = await _service.FindAsync(t => t.Name == departmentName);

            return departmentModel;
        }

        public async Task<IEnumerable<DepartmentModel>> GetAllDepartments()
        {
            var departmentsModels = await _service.GetAllAsync();

            return departmentsModels;
        }
    }
}
