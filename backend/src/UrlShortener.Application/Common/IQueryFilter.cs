namespace UrlShortener.Application.Common;

public interface IQueryFilter<TEntity, TFilter> where TFilter : class
{
    IQueryable<TEntity> Apply(IQueryable<TEntity> query, TFilter filter);
}
