using MedicalApplication.BLL.Repositories;
using MedicalApplication.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalApplication.BLL
{
    public class BllUnitOfWork: IDisposable
    {
        private bool _disposed;
        private readonly bool _persistContext;
        private readonly BaseDbContext _dbContext;

        private MedicRepository _medicRepository;
        private IdentityRoleRepository _identityRoleRepository;
        private PatientRepository _patientRepository;

        public virtual BaseDbContext DbContext
        {
            get { return _dbContext; }
        }
        public static BllUnitOfWork Instance()
        {
            return new BllUnitOfWork();
        }
        public BllUnitOfWork(bool persistContext = false)
        {
            _persistContext = persistContext;
            _dbContext = new EFDbContext();
        }

        public BllUnitOfWork(BaseDbContext context, bool persistContext = false)
        {
            _persistContext = persistContext;
            _dbContext = context;
        }
        public virtual MedicRepository MedicRepository
        {
            get
            {
                return _medicRepository ?? (_medicRepository = new MedicRepository(_dbContext,this,_persistContext));
            }
        }

        public virtual PatientRepository PatientRepository
        {
            get
            {
                return _patientRepository ?? (_patientRepository = new PatientRepository(_dbContext, this, _persistContext));
            }
        }
        public virtual IdentityRoleRepository IdentityRoleRepository
        {
            get
            {
                return _identityRoleRepository ?? (_identityRoleRepository = new IdentityRoleRepository(_dbContext));
            }
        }

        #region Dispose
        public virtual void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _dbContext.Dispose();
                }
            }
            _disposed = true;
        }
        #endregion
    }
}
