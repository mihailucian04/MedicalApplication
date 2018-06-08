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
            var currentRole = roles.ToList().FirstOrDefault(t => t.Name == "Medic");
            var roleResult = UserManager.AddToRole(currentUser.Id, "Medic");

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
                viewModel = await _bll.MedicRepository.GetMedicByID(user.User_ID);
            }

            //TODO: Complete this with for all the roles

            return Ok(viewModel);
        }
    }
}
