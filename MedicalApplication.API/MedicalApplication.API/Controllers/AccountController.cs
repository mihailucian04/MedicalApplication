using MedicalApplication.BLL;
using MedicalApplication.BLL.Services;
using MedicalApplication.Models.ModelsDefinitions;
using MedicalApplication.ViewModels.Helpers;
using MedicalApplication.ViewModels.ViewModelsDefinitions;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace MedicalApplication.API.Controllers
{
    //[Route("api/account/")]
    public class AccountController : BaseApiController
    {
        private BllUnitOfWork _bll;
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }
        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.Current.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set { _signInManager = value; }
        }
        private AccountController()
        {
            _bll = HttpContext.Current.GetOwinContext().Get<BllUnitOfWork>();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public async Task<IHttpActionResult> Login([FromBody] LoginViewModel loginViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await SignInManager.PasswordSignInAsync(loginViewModel.Username, loginViewModel.Password, true, shouldLockout: false);

            return Ok(result);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("api/account/create-medic")]
        public async Task<IHttpActionResult> CreateMedic([FromBody] MedicRegistrationViewModel medicRegistrationViewModel)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var medicExists = await _bll.MedicRepository.CheckIfMedicExists(medicRegistrationViewModel.Firstname, medicRegistrationViewModel.Lastname);

            if (medicExists)
                return BadRequest("This medic already exists in database!");

            var medicModel = medicRegistrationViewModel.ToMedicModel();
            medicModel.Guid = Guid.NewGuid();

            var createResult = await _bll.MedicRepository.AddNewMedic(medicModel);

            if (!createResult)
                return InternalServerError();

            var applicationModel = new ApplicationUserModel
            {
                UserName = medicRegistrationViewModel.Email,
                Email = medicRegistrationViewModel.Email,
                FirstName = medicRegistrationViewModel.Firstname,
                LastName = medicRegistrationViewModel.Lastname,
                Level = 2,
                JoinDate = DateTime.Now.Date,
                User_ID = medicModel.Guid
            };

            IdentityResult addUserResult = await this.AppUserManager.CreateAsync(applicationModel, medicRegistrationViewModel.Password);
            var roles = _bll.IdentityRoleRepository.GetAll();

            var currentUser = await UserManager.FindByEmailAsync(applicationModel.Email);

            if (medicRegistrationViewModel.Speciality == "Medic")
            {
                var roleResult = UserManager.AddToRole(currentUser.Id, "Medic");
            }
            else
            {
                var roleResult = UserManager.AddToRole(currentUser.Id, "RegistryOffice");
            }

            if (!addUserResult.Succeeded)
                return InternalServerError();

            return Ok();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("api/account/create-registryOffice")]
        public async Task<IHttpActionResult> CreateRegistryOffice([FromBody] RegistryOfficeViewModel registryOfficeViewModel)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var registryOfficeExists = await _bll.RegistryOfficeRepository.CheckIfRegistryOfficeExists(registryOfficeViewModel.DepartmentName);

            if (registryOfficeExists)
                return BadRequest("This registryOffice already exists in database!");

            var departmentModel = await _bll.DepartmentRepository.GetDepartmentByName(registryOfficeViewModel.DepartmentName);

            var registryModel = new RegistrationModel
            {
                Guid = Guid.NewGuid(),
                BedCount = registryOfficeViewModel.BedCount,
                DepartmentGuid = departmentModel.Guid
            };

            var createResult = await _bll.RegistryOfficeRepository.AddNewRegistryOffice(registryModel);

            if (!createResult)
                return InternalServerError();

            var applicationModel = new ApplicationUserModel
            {
                UserName = registryOfficeViewModel.Email,
                Email = registryOfficeViewModel.Email,
                FirstName = registryOfficeViewModel.Email,
                LastName = registryOfficeViewModel.Email,
                Level = 2,
                JoinDate = DateTime.Now.Date,
                User_ID = registryModel.Guid
            };

            IdentityResult addUserResult = await this.AppUserManager.CreateAsync(applicationModel, registryOfficeViewModel.Password);
            var roles = _bll.IdentityRoleRepository.GetAll();

            var currentUser = await UserManager.FindByEmailAsync(applicationModel.Email);

            var roleResult = UserManager.AddToRole(currentUser.Id, "RegistryOffice");

            if (!addUserResult.Succeeded)
                return InternalServerError();

            return Ok();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("api/account/create-laboratoryAnalysis")]
        public async Task<IHttpActionResult> CreateLaboratoryAnalysis([FromBody] LaboratoryAnalysisViewModel laboratoryAnalysis)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var laboratoryAnalysisExists = await _bll.LaboratoryAnalysisRepository.CheckIfLaboratoryExists(laboratoryAnalysis.Name);

            if (laboratoryAnalysisExists)
                return BadRequest("This laboratoryAnalysis already exists in database!");

            var laboratoryAnalysisModel = new LaboratoryModel
            {
                Guid = Guid.NewGuid(),
                Name = laboratoryAnalysis.Name
            };

            var createResult = await _bll.LaboratoryAnalysisRepository.AddNewLaboratory(laboratoryAnalysisModel);

            if (!createResult)
                return InternalServerError();

            var applicationModel = new ApplicationUserModel
            {
                UserName = laboratoryAnalysis.Email,
                Email = laboratoryAnalysis.Email,
                FirstName = laboratoryAnalysis.Email,
                LastName = laboratoryAnalysis.Email,
                Level = 2,
                JoinDate = DateTime.Now.Date,
                User_ID = laboratoryAnalysisModel.Guid
            };

            IdentityResult addUserResult = await this.AppUserManager.CreateAsync(applicationModel, laboratoryAnalysis.Password);
            var roles = _bll.IdentityRoleRepository.GetAll();

            var currentUser = await UserManager.FindByEmailAsync(applicationModel.Email);

            var roleResult = UserManager.AddToRole(currentUser.Id, "LaboratoryAnalysis");

            if (!addUserResult.Succeeded)
                return InternalServerError();

            return Ok();

        }

        [Authorize]
        [HttpGet]
        [Route("api/account/{username}")]
        public async Task<IHttpActionResult> GetAccountByUsername(string username)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(username);
            username = System.Text.Encoding.UTF8.GetString(base64EncodedBytes);

            var user = await this.AppUserManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound();
            }

            var roleID = user.Roles.FirstOrDefault();

            var role = _bll.IdentityRoleRepository.GetRole(roleID.RoleId);

            dynamic viewModel = new Object();

            if (role.Name.Equals("Medic"))
            {
                viewModel.Model = await _bll.MedicRepository.GetMedicByID(user.User_ID);
                viewModel.Role = "Medic";
            }

            else if (role.Name.Equals("RegistryOffice"))
            {
                viewModel.Model = await _bll.RegistryOfficeRepository.GetRegistryOfficeByGuid(user.User_ID);
                viewModel.Role = "RegistryOffice";
            }
            else if (role.Name.Equals("LaboratoryAnalysis"))
            {
                viewModel.Model = await _bll.LaboratoryAnalysisRepository.GetLaboratoryByGuid(user.User_ID);
                viewModel.Role = "LaboratoryAnalysis";
            }

            return Ok(viewModel);
        }
    }
}
