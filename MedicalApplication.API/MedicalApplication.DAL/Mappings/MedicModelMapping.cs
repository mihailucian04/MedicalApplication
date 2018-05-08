using MedicalApplication.Models.ModelsDefinitions;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MedicalApplication.DAL.Mappings
{
    class MedicModelMapping: EntityTypeConfiguration<MedicModel>
    {
        public MedicModelMapping()
        {
            HasKey(t=>t.Guid);

            Property(t=>t.Guid).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity); ;
            Property(t=>t.FirstName);
            Property(t =>t.LastName);
            Property(t =>t.Sex);
            Property(t =>t.Speciality);

            ToTable("MedicModels");
        }
    }
}
