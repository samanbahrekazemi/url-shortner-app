using UrlShortener.Application.Common;
using UrlShortener.Application.DTOs;
using UrlShortener.Application.Filters;
using UrlShortener.Domain.Entities;
using UrlShortener.Domain.Interfaces;

namespace UrlShortener.Application.Services.V2;

public sealed class UrlServiceV2 : IUrlServiceV2
{
    private readonly IUrlRepository _urlRepository;
    private readonly UrlSearchFilter _search = new();
    private readonly UrlSorter _sorter = new();
    private readonly XorObfuscationEncoder _encoder = new();

    public UrlServiceV2(IUrlRepository urlRepository)
    {
        _urlRepository = urlRepository;
    }

    public async Task<CreateUrlResponse> CreateShortUrlAsync(CreateUrlRequest request, CancellationToken cancellationToken = default)
    {
        var slug = await GenerateUniqueSlugAsync(cancellationToken);
        var urlEntry = new UrlEntry(slug, request.OriginalUrl);
        await _urlRepository.AddAsync(urlEntry, cancellationToken);

        return new CreateUrlResponse(
            urlEntry.Id,
            urlEntry.Slug,
            urlEntry.Slug,
            urlEntry.CreatedAt);
    }

    public async Task<UrlStatsResponse?> GetStatsAsync(string slug, CancellationToken cancellationToken = default)
    {
        var urlEntry = await _urlRepository.GetBySlugAsync(slug, cancellationToken);
        if (urlEntry is null)
            return null;

        return new UrlStatsResponse(
            urlEntry.Id,
            urlEntry.Slug,
            urlEntry.OriginalUrl,
            urlEntry.ClickCount,
            urlEntry.CreatedAt);
    }

    public async Task<PaginatedResponse<UrlListItemResponse>> ListUrlsAsync(UrlListRequest request, CancellationToken cancellationToken = default)
    {
        var query = _urlRepository.GetQueryable();

        query = ApplyFilters(query, request);
        query = _search.Apply(query, request);
        query = _sorter.Apply(query, request);

        var page = request.Page ?? 1;
        var limit = request.Limit ?? 10;

        var (items, totalCount, filteredCount) = await _urlRepository.GetPagedAsync(
            query, page, limit, cancellationToken);

        return new PaginatedResponse<UrlListItemResponse>
        {
            Items = [.. items.Select(x => new UrlListItemResponse(
                x.Id,
                x.Slug,
                x.OriginalUrl,
                x.ClickCount,
                x.CreatedAt))],
            TotalCount = totalCount,
            FilteredCount = filteredCount,
            Page = page,
            PageSize = limit
        };
    }

    private IQueryable<UrlEntry> ApplyFilters(IQueryable<UrlEntry> query, UrlListRequest filter)
    {
        if (filter.CreatedFrom.HasValue)
            query = query.Where(x => x.CreatedAt >= filter.CreatedFrom.Value);

        if (filter.CreatedTo.HasValue)
            query = query.Where(x => x.CreatedAt <= filter.CreatedTo.Value);

        if (filter.MinClicks.HasValue)
            query = query.Where(x => x.ClickCount >= filter.MinClicks.Value);

        if (filter.MaxClicks.HasValue)
            query = query.Where(x => x.ClickCount <= filter.MaxClicks.Value);

        return query;
    }

    private async Task<string> GenerateUniqueSlugAsync(CancellationToken cancellationToken)
    {
        const int maxAttempts = 3;

        for (int attempt = 0; attempt < maxAttempts; attempt++)
        {
            var slug = _encoder.GenerateRandomSlug();

            if (!await _urlRepository.SlugExistsAsync(slug, cancellationToken))
                return slug;
        }

        throw new InvalidOperationException("Failed to generate unique slug after maximum attempts.");
    }
}