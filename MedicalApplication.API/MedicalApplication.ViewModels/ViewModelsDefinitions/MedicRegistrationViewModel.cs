using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalApplication.ViewModels.ViewModelsDefinitions
{
    public class MedicRegistrationViewModel
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public int Sex { get; set; }
        public string Speciality { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
