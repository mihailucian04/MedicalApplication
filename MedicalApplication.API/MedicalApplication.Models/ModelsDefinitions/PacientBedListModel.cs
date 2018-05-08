using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalApplication.Models.ModelsDefinitions
{
    public class PacientBedListModel:BaseModel
    {
        public Guid PatientGuid { get; set; }
        public Guid BedGuid { get; set; }

        [ForeignKey("PatientGuid")]
        public virtual PatientModel Patient { get; set; }

        [ForeignKey("BedGuid")]
        public virtual BedModel Bed { get; set; }
    }
}
