using UrlShortener.Domain.Entities;

namespace UrlShortener.Domain.Interfaces;

public interface ISlugCounterRepository
{
    Task<long> GetNextAsync(CancellationToken cancellationToken = default);
}
