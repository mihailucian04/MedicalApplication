using MedicalApplication.BLL;
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
    public class AnalyzeController : BaseApiController
    {
        private BllUnitOfWork _bll;

        public AnalyzeController()
        {
            _bll = HttpContext.Current.GetOwinContext().Get<BllUnitOfWork>();
        }

        [HttpGet]
        [Route("api/analyze/{itemsPerPage}/{page}")]
        public async Task<IHttpActionResult> GetPatientsByFirstName(int itemsPerPage, int page)
        {
            var analyzestList= await _bll.AnalysisTypeModelRepository.GetAnalyzes( itemsPerPage, page);

            var count = await _bll.AnalysisTypeModelRepository.GetNumberOfAnalyzes();
            var result = new { Data = analyzestList, Count = count };

            return Ok(result);
        }
    }
}