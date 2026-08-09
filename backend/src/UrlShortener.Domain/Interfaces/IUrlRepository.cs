using UrlShortener.Domain.Entities;

namespace UrlShortener.Domain.Interfaces;

public interface IUrlRepository
{
    IQueryable<UrlEntry> GetQueryable();
    Task<UrlEntry?> GetBySlugAsync(string slug, CancellationToken cancellationToken = default);
    Task<UrlEntry?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<UrlEntry> AddAsync(UrlEntry urlEntry, CancellationToken cancellationToken = default);
    Task IncrementClickCountAsync(string slug, CancellationToken cancellationToken = default);
    Task<bool> SlugExistsAsync(string slug, CancellationToken cancellationToken = default);
    Task<int> GetCountAsync(CancellationToken cancellationToken = default);
    Task<(List<UrlEntry> Items, int TotalCount, int FilteredCount)> GetPagedAsync(
        IQueryable<UrlEntry> query,
        int page,
        int pageSize,
        CancellationToken cancellationToken = default);
}