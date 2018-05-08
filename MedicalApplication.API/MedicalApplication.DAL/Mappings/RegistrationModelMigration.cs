﻿using MedicalApplication.Models.ModelsDefinitions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary2.Mappings
{
    class RegistrationModelMigration : EntityTypeConfiguration<RegistrationModel>
    {
        public RegistrationModelMigration()
        {
            HasKey(t => t.Guid);

            Property(t => t.Guid).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            Property(t => t.BedCount);
            Property(t => t.DepartmentGuid);

            ToTable("RegistrationModels");
        }
    }
}
