using MedicalApplication.BLL;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace MedicalApplication.API.Controllers
{
    public class MedicController : BaseApiController
    {
        private BllUnitOfWork _bll;

        public MedicController()
        {
            _bll = HttpContext.Current.GetOwinContext().Get<BllUnitOfWork>();
        }

        [HttpGet]
        [Route("api/medic/get-all")]
        public async Task<IHttpActionResult> GetAllMedics()
        {
            var medics = await _bll.MedicRepository.GetAllMedics();

            return Ok(medics);
        }

        [HttpGet]
        [Route("api/medic/getbyGuid/{medicID}")]
        public async Task<IHttpActionResult> GetMedicByID(Guid medicID)
        {
            var medic = await _bll.MedicRepository.GetMedicByID(medicID);

            return Ok(medic);
        }
    }
}
