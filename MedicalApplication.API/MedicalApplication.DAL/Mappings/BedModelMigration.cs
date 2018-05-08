using MedicalApplication.Models.ModelsDefinitions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary2.Mappings
{
    class BedModelMigration : EntityTypeConfiguration<BedModel>
    {
        public BedModelMigration()
        {
            HasKey(t => t.Guid);

            Property(t => t.Guid).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            Property(t => t.BedNumber);
            Property(t => t.Status);
            Property(t => t.HospitalSalonGuid);

            ToTable("BedModels");
        }
    }
}
