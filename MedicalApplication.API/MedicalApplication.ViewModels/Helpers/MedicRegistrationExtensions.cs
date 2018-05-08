using MedicalApplication.Models.ModelsDefinitions;
using MedicalApplication.ViewModels.ViewModelsDefinitions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalApplication.ViewModels.Helpers
{
    public static class MedicRegistrationExtensions
    {
        public static MedicModel ToMedicModel(this MedicRegistrationViewModel medicRegistrationViewModel)
        {
            var medicModel = new MedicModel
            {
                FirstName = medicRegistrationViewModel.Firstname,
                LastName = medicRegistrationViewModel.Lastname,
                Sex = medicRegistrationViewModel.Sex,
                Speciality = medicRegistrationViewModel.Speciality
            };

            return medicModel;
        }
    }
}
