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
    public class DepartmentController : BaseApiController
    {
        private BllUnitOfWork _bll;

        public DepartmentController()
        {
            _bll = HttpContext.Current.GetOwinContext().Get<BllUnitOfWork>();
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("api/department/get-all")]
        public async Task<IHttpActionResult> GetAllDepartments()
        {
            var departments = await _bll.DepartmentRepository.GetAllDepartments();

            return Ok(departments);
        }
    }
}