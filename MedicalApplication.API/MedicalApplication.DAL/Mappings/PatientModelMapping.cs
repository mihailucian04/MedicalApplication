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
    class PatientModelMapping : EntityTypeConfiguration<PatientModel>
    {
        public PatientModelMapping()
        {
            HasKey(t => t.Guid);

            Property(t => t.Guid).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity); 
            Property(t => t.FirstName);
            Property(t => t.LastName);
            Property(t => t.CNP);
            Property(t => t.Sex);
            Property(t => t.Address);           
            Property(t => t.DOB);
            Property(t => t.Assuranced);
            Property(t => t.Telephone);
            Property(t => t.PatientFile);

            ToTable("PatientModels");
        }
    }
}
