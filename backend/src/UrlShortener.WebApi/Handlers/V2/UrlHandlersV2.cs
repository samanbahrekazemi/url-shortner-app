using Microsoft.AspNetCore.Mvc;
using UrlShortener.Application.DTOs;
using UrlShortener.Application.Services.V2;
using UrlShortener.Domain.Interfaces;
using UrlShortener.WebApi.Filters;

namespace UrlShortener.WebApi.Handlers.V2;

public static class UrlHandlersV2
{
    private const int MaxUrls = 100;

    public static async Task<IResult> CreateUrl(
        CreateUrlRequest request,
        IUrlServiceV2 urlService,
        IUrlRepository urlRepository,
        CancellationToken cancellationToken)
    {
        var count = await urlRepository.GetCountAsync(cancellationToken);
        if (count >= MaxUrls)
            return Results.BadRequest(new { message = $"Demo limit of {MaxUrls} URLs reached." });

        var response = await urlService.CreateShortUrlAsync(request, cancellationToken);
        return Results.Created($"/urls/{response.Slug}", response);
    }

    public static async Task<IResult> ListUrls(
        [AsParameters] UrlListRequest request,
        IUrlServiceV2 urlService,
        CancellationToken cancellationToken)
    {
        var response = await urlService.ListUrlsAsync(request, cancellationToken);
        return Results.Ok(response);
    }

    public static async Task<IResult> GetStats(
        string slug,
        IUrlServiceV2 urlService,
        CancellationToken cancellationToken)
    {
        var response = await urlService.GetStatsAsync(slug, cancellationToken);
        return response is not null ? Results.Ok(response) : Results.NotFound();
    }
}
