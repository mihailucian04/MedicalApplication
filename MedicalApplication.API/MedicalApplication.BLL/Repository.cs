using MedicalApplication.DAL;
using MedicalApplication.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace MedicalApplication.BLL
{
    public class Repository<T> where T : BaseModel
    {
        private readonly BaseDbContext _context;

        public Repository(BaseDbContext context, BllUnitOfWork bll, bool persistContext = false)
        {
            _context = persistContext ? context : new EFDbContext();

            Bll = bll;
        }

        protected BllUnitOfWork Bll { get; private set; }

        public ICollection<T> GetAll()
        {
            return _context.Set<T>().ToList();
        }

        public async virtual Task<ICollection<T>> GetAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public bool Any(Expression<Func<T, bool>> match)
        {
            return _context.Set<T>().Any(match);
        }

        public async Task<bool> AnyAsync(Expression<Func<T, bool>> match)
        {
            return await _context.Set<T>().AnyAsync(match);
        }

        public T Get(long id)
        {
            return _context.Set<T>().Find(id);
        }

        public async Task<T> GetAsync(long id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public T Find(Expression<Func<T, bool>> match)
        {
            return _context.Set<T>().SingleOrDefault(match);
        }

        public async virtual Task<T> FindAsync(Expression<Func<T, bool>> match)
        {
            return await _context.Set<T>().SingleOrDefaultAsync(match);
        }

        public ICollection<T> FindAll(Expression<Func<T, bool>> match)
        {
            return _context.Set<T>().Where(match).ToList();
        }

        public async virtual Task<ICollection<T>> FindAllAsync(Expression<Func<T, bool>> match)
        {
            return await _context.Set<T>().Where(match).ToListAsync();
        }

        public T Add(T t)
        {
            _context.Set<T>().Add(t);
            _context.SaveChanges();
            return t;
        }

        public async Task<T> AddAsync(T t)
        {
            _context.Set<T>().Add(t);
            await _context.SaveChangesAsync();
            return t;
        }

        public T Update(T updated, int key)
        {
            if (updated == null)
                return null;

            T existing = _context.Set<T>().Find(key);
            if (existing != null)
            {
                _context.Entry(existing).CurrentValues.SetValues(updated);
                _context.SaveChanges();
            }
            return existing;
        }

        public async virtual Task<T> UpdateAsync(T updated)
        {
            if (updated == null)
                return null;

            T existing = await _context.Set<T>().FindAsync(updated.Guid);
            if (existing != null)
            {
                _context.Entry(existing).CurrentValues.SetValues(updated);
                await _context.SaveChangesAsync();
            }
            return existing;
        }

        public void Delete(T t)
        {
            _context.Set<T>().Remove(t);
            _context.SaveChanges();
        }

        public async Task<int> DeleteAsync(T t)
        {
            _context.Set<T>().Remove(t);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> DeleteAsync(Guid key)
        {
            var entity = await _context.Set<T>().SingleOrDefaultAsync(t => t.Guid == key);

            if (entity == null) throw new KeyNotFoundException();

            _context.Set<T>().Remove(entity);

            return await _context.SaveChangesAsync();
        }

        public int Count()
        {
            return _context.Set<T>().Count();
        }

        public async Task<int> CountAsync()
        {
            return await _context.Set<T>().CountAsync();
        }

        public async Task<T> AddOrUpdateAsync(T entity)
        {
            if (entity == null)
                return null;

            T existing = await _context.Set<T>().FindAsync(entity.Guid);
            if (existing != null)
            {
                _context.Entry(existing).CurrentValues.SetValues(entity);
                await _context.SaveChangesAsync();
                return existing;
            }
            var inserted = await AddAsync(entity);
            return inserted;
        }
    }
}
