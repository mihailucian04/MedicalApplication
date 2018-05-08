using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalApplication.Models.ModelsDefinitions
{
    public class DepartmentModel: BaseModel
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
    }
}
