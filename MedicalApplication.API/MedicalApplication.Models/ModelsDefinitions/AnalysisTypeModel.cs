using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalApplication.Models.ModelsDefinitions
{
    public class AnalysisTypeModel : BaseModel
    {
        public string Name { get; set; }

        public string Result { get; set; }

        public string UM { get; set; }

        public bool Type { get; set; }

        public string RangeValue { get; set; }

    }
}
