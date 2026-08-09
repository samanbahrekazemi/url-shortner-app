using UrlShortener.Application.Common;
using UrlShortener.Application.DTOs;

namespace UrlShortener.Application.Services.V1;

public interface IUrlServiceV1
{
    Task<CreateUrlResponse> CreateShortUrlAsync(CreateUrlRequest request, CancellationToken cancellationToken = default);
    Task<UrlStatsResponse?> GetStatsAsync(string slug, CancellationToken cancellationToken = default);
    Task<PaginatedResponse<UrlListItemResponse>> ListUrlsAsync(UrlListRequest request, CancellationToken cancellationToken = default);
}
