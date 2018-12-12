using MedicalApplication.BLL;
using MedicalApplication.Models.ModelsDefinitions;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace MedicalApplication.API.Controllers
{
    [Authorize]
    public class MappingMedicAnalysisController : BaseApiController
    {
        private BllUnitOfWork _bll;

        public MappingMedicAnalysisController()
        {
            _bll = HttpContext.Current.GetOwinContext().Get<BllUnitOfWork>();
        }

        [HttpPost]
        [Route("api/analyze/add-analyzeOfPatient")]
        public async Task<IHttpActionResult> GetPatientsListByMedicGuid([FromBody] MappingMedicAnalysisModel mapping)
        {
            var analyzeIds = mapping.Result.Split(',');
            mapping.Result = string.Empty;
            try
            {
                foreach (var id in analyzeIds)
                {
                    var mapp = new MappingMedicAnalysisModel() {
                        AnalysisTypeGuid= Guid.Parse(id),
                        Guid=mapping.Guid,
                        MedicGuid=mapping.MedicGuid,
                        LaboratoryGuyGuid=mapping.LaboratoryGuyGuid,
                        Result=mapping.Result,
                        PatientGuid=mapping.PatientGuid,
                        ProcessAnalysisDate= DateTime.Now
                    };
                    
                    await _bll.MappingMedicAnalysisModelRepository.AddMapping(mapp);

                }
            }
            catch (Exception ex)
            {
                return InternalServerError();
            }

            return Ok();
        }
        [HttpGet]
        [Route("api/analyze/get-mappingAnalyze/{items}/{page}")]
        public async Task<IHttpActionResult> GetAllMappingAnalyzeLab(int items,int page)
        {
            var mappingAnalyzeList = await _bll.MappingMedicAnalysisModelRepository.GetAllMappingAnalyzes(items, page);
            var count = await _bll.MappingMedicAnalysisModelRepository.GetCount();

            ///asa ceva nu se face!!
            List<object> resultList= new List<object>();
            foreach (var item in mappingAnalyzeList)
            {
                var medic = await _bll.MedicRepository.GetMedicByID(item.MedicGuid);
                var patient = await _bll.PatientRepository.GetPatientByGuid(item.PatientGuid);
                var analyze = await _bll.AnalysisTypeModelRepository.GetAnalyzesByGuid(item.AnalysisTypeGuid);
                var result = new
                {
                    MappingGuid = item.Guid,
                    MedicName = medic.FirstName +" " + medic.LastName,
                    PatientName = patient.FirstName + " " + patient.LastName,
                    CNP = patient.CNP,
                    AnalysisName = analyze.Name,
                    Result = ""
                };

                resultList.Add(result);
            }
            return Ok(new { Data = resultList, Count = count });
        }
    }
}