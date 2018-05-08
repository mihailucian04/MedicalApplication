using MedicalApplication.Models;
using MedicalApplication.Models.ModelsDefinitions;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace MedicalApplication.DAL
{
    public class BaseDbContext : IdentityDbContext<ApplicationUserModel>
    {
        public BaseDbContext() : base("name=MedicalApplicationContext") { }
        public new virtual DbSet<TEntity> Set<TEntity>() where TEntity : BaseModel
        {
            return base.Set<TEntity>();
        }
    }
}
