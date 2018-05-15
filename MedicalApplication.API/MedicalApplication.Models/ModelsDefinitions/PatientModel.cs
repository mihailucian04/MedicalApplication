using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalApplication.Models.ModelsDefinitions
{
    public class PatientModel:BaseModel
    {
        public Guid MedicGuid { get; set; }
        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(100)]
        public string LastName { get; set; }
        [Required]
        [MaxLength(15)]
        public string CNP { get; set; }
        public int Sex { get; set; }
        public string Address { get; set; }
        public DateTime DOB { get; set; }
        public bool Assuranced { get; set; }
        [Required]
        [MaxLength(20)]
        public string Telephone { get; set; }
        public string PatientFile { get; set; }
        public bool IsDeleted { get; set; }
    }
}

