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
    class AppointmentModelMigration : EntityTypeConfiguration<AppointmentModel>
    {
        public AppointmentModelMigration()
        {
            HasKey(t => t.Guid);

            Property(t => t.Guid).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            Property(t => t.MedicGuid);
            Property(t => t.PatientGuid);
            Property(t => t.Status);
            Property(t => t.Date);

            ToTable("AppointmentModels");
        }

    }
}
