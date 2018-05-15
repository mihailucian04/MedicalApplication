using MedicalApplication.BLL;
using MedicalApplication.Models.ModelsDefinitions;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace MedicalApplication.API.Controllers
{
    [Authorize]
    public class PatientController : BaseApiController
    {
        private BllUnitOfWork _bll;

        public PatientController()
        {
            _bll = HttpContext.Current.GetOwinContext().Get<BllUnitOfWork>();
        }

        [HttpGet]
        [Route("api/patient/get-patients-by-medic/{medicGuid}")]
        public async Task<IHttpActionResult> GetPatientsListByMedicGuid(Guid medicGuid)
        {
            var patientList = await _bll.PatientRepository.GetPatientsByMedicGuid(medicGuid);

            return Ok(patientList);
        }

        [HttpGet]
        [Route("api/patient/get-patient/{patientGuid}")]
        public async Task<IHttpActionResult> GetPatientByGuid(Guid patientGuid)
        {
            var patientModel = await _bll.PatientRepository.GetPatientByGuid(patientGuid);

            return Ok(patientModel);
        }

        [HttpPut]
        [Route("api/patient/add-patient")]

        public async Task<IHttpActionResult> AddPatient([FromBody]PatientModel patient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _bll.PatientRepository.AddPatient(patient);
            if(!result)
            {
                return InternalServerError();
            }
            return Ok();
        }

        [HttpPost]
        [Route("api/patient/update-patient")]

        public async Task<IHttpActionResult> UpdatePatient([FromBody]PatientModel patient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _bll.PatientRepository.UpdatePatient(patient);
            if (!result)
            {
                return InternalServerError();
            }
            return Ok();
        }

        [HttpPost]
        [Route("api/patient/delete-patient/{patientGuid}")]
        public async Task<IHttpActionResult> DeletePatient(Guid patientGuid)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _bll.PatientRepository.DeletePatient(patientGuid);
            if (!result)
            {
                return InternalServerError();
            }
            return Ok();
        }

    }
}
