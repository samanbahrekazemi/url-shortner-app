using Microsoft.EntityFrameworkCore;
using UrlShortener.Application.DTOs;
using UrlShortener.Application.Services.V1;
using UrlShortener.Domain.Interfaces;

namespace UrlShortener.WebApi.Handlers.V1;

public static class UrlHandlersV1
{
    private const int MaxUrls = 100;

    public static async Task<IResult> CreateUrl(
        CreateUrlRequest request,
        IUrlServiceV1 urlService,
        IUrlRepository urlRepository,
        CancellationToken cancellationToken)
    {
        var count = await urlRepository.GetCountAsync(cancellationToken);
        if (count >= MaxUrls)
            return Results.BadRequest(new { message = $"Demo limit of {MaxUrls} URLs reached." });

        var response = await urlService.CreateShortUrlAsync(request, cancellationToken);
        return Results.Created("", response);
    }

    public static async Task<IResult> ListUrls(
        [AsParameters] UrlListRequest request,
        IUrlServiceV1 urlService,
        CancellationToken cancellationToken)
    {
        var response = await urlService.ListUrlsAsync(request, cancellationToken);
        return Results.Ok(response);
    }

    public static async Task<IResult> GetStats(
        string slug,
        IUrlServiceV1 urlService,
        CancellationToken cancellationToken)
    {
        var response = await urlService.GetStatsAsync(slug, cancellationToken);
        return response is not null ? Results.Ok(response) : Results.NotFound();
    }

    public static async Task<IResult> GetDashboardStats(
        IUrlRepository urlRepository,
        CancellationToken cancellationToken)
    {
        var query = urlRepository.GetQueryable();

        var totalCount = await query.CountAsync(cancellationToken);
        var totalClicks = await query.SumAsync(x => x.ClickCount, cancellationToken);
        var activeUrls = await query.CountAsync(x => x.ClickCount > 0, cancellationToken);
        var recentUrls = await query
            .OrderByDescending(x => x.CreatedAt)
            .Take(5)
            .Select(x => new { x.Id, x.Slug, x.OriginalUrl, x.ClickCount, x.CreatedAt })
            .ToListAsync(cancellationToken);

        return Results.Ok(new
        {
            total_urls = totalCount,
            total_clicks = totalClicks,
            active_urls = activeUrls,
            recent_urls = recentUrls
        });
    }
}
