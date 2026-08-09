using UrlShortener.Application.Common;
using UrlShortener.Application.DTOs;

namespace UrlShortener.Application.Services.V2;

public interface IUrlServiceV2
{
    Task<CreateUrlResponse> CreateShortUrlAsync(CreateUrlRequest request, CancellationToken cancellationToken = default);
    Task<UrlStatsResponse?> GetStatsAsync(string slug, CancellationToken cancellationToken = default);
    Task<PaginatedResponse<UrlListItemResponse>> ListUrlsAsync(UrlListRequest request, CancellationToken cancellationToken = default);
}