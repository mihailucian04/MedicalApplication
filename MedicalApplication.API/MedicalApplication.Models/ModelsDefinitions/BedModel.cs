using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalApplication.Models.ModelsDefinitions
{
    public class BedModel:BaseModel
    {
        public int BedNumber { get; set; }

        public bool Status { get; set; }

        public Guid HospitalSalonGuid { get; set; }

        [ForeignKey("HospitalSalonGuid")]
        public virtual HospitalSalonModel HospitalSalon { get; set; }
    }
}
