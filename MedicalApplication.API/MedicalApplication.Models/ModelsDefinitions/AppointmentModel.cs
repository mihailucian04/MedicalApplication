﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalApplication.Models.ModelsDefinitions
{
    public class AppointmentModel:BaseModel
    {
        public Guid PatientGuid { get; set; }
        public Guid MedicGuid { get; set; }
        public DateTime Date { get; set; }
        public int Status { get; set; }

        [ForeignKey("PatientGuid")]
        public  virtual PatientModel Patient { get; set; }

        [ForeignKey("MedicGuid")]
        public virtual MedicModel Medic { get; set; }
    }
}
