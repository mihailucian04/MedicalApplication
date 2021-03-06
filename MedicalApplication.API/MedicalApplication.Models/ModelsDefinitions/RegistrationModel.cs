﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalApplication.Models.ModelsDefinitions
{
    public class RegistrationModel:BaseModel
    {
        public int BedCount { get; set; }

        public Guid DepartmentGuid { get; set; }

        [ForeignKey("DepartmentGuid")]
        public virtual DepartmentModel Department { get; set; }
    }
}
