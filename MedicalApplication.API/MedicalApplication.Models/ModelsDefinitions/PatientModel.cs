using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalApplication.Models.ModelsDefinitions
{
    public class PatientModel:BaseModel
    {
        public Guid MedicGuid { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CNP { get; set; }
        public int Sex { get; set; }
        public string Address { get; set; }
        public DateTime DOB { get; set; }
        public bool Assuranced { get; set; }
        public string Telephone { get; set; }
        public string PatientFile { get; set; }
    }
}
