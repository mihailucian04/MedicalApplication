using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalApplication.Models.ModelsDefinitions
{
    public class MappingMedicAnalysisModel : BaseModel
    {
        public Guid MedicGuid { get; set; }

        public Guid PatientGuid { get; set; }

        public Guid AnalysisTypeGuid { get; set; }

        public Guid LaboratoryGuyGuid { get; set; }

        public string Result { get; set; }

        public DateTime ProcessAnalysisDate { get; set; }

        [ForeignKey("MedicGuid")]
        public virtual MedicModel Medic { get; set; }

        [ForeignKey("PatientGuid")]
        public virtual PatientModel Patient { get; set; }

        [ForeignKey("AnalysisTypeGuid")]
        public virtual AnalysisTypeModel Analysis { get; set; }
    }
}
