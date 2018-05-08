using MedicalApplication.DAL;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalApplication.BLL.Repositories
{
    public class IdentityRoleRepository
    {
        private readonly BaseDbContext _context;

        public IdentityRoleRepository(BaseDbContext context)
        {
            _context = context;
        }

        public IList<IdentityRole> GetAll()
        {
            return _context.Roles.ToList();
        }

        public IdentityRole GetRole(string role_ID)
        {
            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(_context));

            IdentityRole role = roleManager.FindById(role_ID);

            return role;

        }
    }
}
