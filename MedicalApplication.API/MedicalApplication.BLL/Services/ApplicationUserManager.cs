using MedicalApplication.Models.ModelsDefinitions;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalApplication.BLL.Services
{
    public class ApplicationUserManager : UserManager<ApplicationUserModel>
    {
        public ApplicationUserManager(IUserStore<ApplicationUserModel> store)
            : base(store)
        { }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            var appDbContext = context.Get<BllUnitOfWork>().DbContext;
            var appUserManager = new ApplicationUserManager(new UserStore<ApplicationUserModel>(appDbContext));

            return appUserManager;
        }

    }
}
