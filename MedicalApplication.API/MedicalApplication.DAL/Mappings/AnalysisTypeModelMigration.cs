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
    class AnalysisTypeModelMigration : EntityTypeConfiguration<AnalysisTypeModel>
    {
        public AnalysisTypeModelMigration()
        {
            HasKey(t => t.Guid);

            Property(t => t.Guid).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            Property(t => t.Name);
            Property(t => t.RangeValue);
            Property(t => t.Result);
            Property(t => t.Type);
            Property(t => t.UM);

            ToTable("AnalysisTypeModels");
        }
    }
}
