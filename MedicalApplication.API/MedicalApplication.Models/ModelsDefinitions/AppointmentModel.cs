using System;
using System.Collections.Generic;
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
    }
}
