using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalApplication.Models.ModelsDefinitions
{
    public class RegistrationModel:BaseModel
    {
        public int BedCount { get; set; }

        public Guid SectionGuid { get; set; }
    }
}
