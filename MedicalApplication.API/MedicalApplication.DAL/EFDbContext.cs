using MedicalApplication.DAL;
using MedicalApplication.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace MedicalApplication.DAL
{
    public class EFDbContext : BaseDbContext
    {
        public EFDbContext() : base()
        {
            var type = typeof(System.Data.Entity.SqlServer.SqlProviderServices);
        }

        public static EFDbContext Create()
        {
            return new EFDbContext();
        }

        public new DbSet<TEntity> Set<TEntity>() where TEntity : BaseModel
        {
            return base.Set<TEntity>();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //get all configuration mappings
            var typesToRegister = Assembly.GetExecutingAssembly().GetTypes()
           .Where(type => !String.IsNullOrEmpty(type.Namespace))
           .Where(type => type.BaseType != null && type.BaseType.IsGenericType
                && type.BaseType.GetGenericTypeDefinition() == typeof(EntityTypeConfiguration<>));

            //create an instance of the classes and add it to the builder
            foreach (var type in typesToRegister)
            {
                dynamic configurationInstance = Activator.CreateInstance(type);
                modelBuilder.Configurations.Add(configurationInstance);
            }
            //call the base functionality
            base.OnModelCreating(modelBuilder);
        }
    }
}
