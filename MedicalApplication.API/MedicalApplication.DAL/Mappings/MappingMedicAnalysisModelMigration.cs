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
    class MappingMedicAnalysisModelMigration : EntityTypeConfiguration<MappingMedicAnalysisModel>
    {
        public MappingMedicAnalysisModelMigration()
        {
            HasKey(t => t.Guid);

            Property(t => t.Guid).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            Property(t => t.AnalysisTypeGuid);
            Property(t => t.LaboratoryGuyGuid);
            Property(t => t.MedicGuid);
            Property(t => t.PatientGuid);
            Property(t => t.ProcessAnalysisDate);

            ToTable("MappingMedicAnalysisModel");
        }
    }
}
