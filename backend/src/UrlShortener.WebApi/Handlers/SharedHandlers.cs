using UrlShortener.Application.DTOs;
using UrlShortener.Application.Services.V1;
using UrlShortener.Domain.Interfaces;
using UrlShortener.Domain.ValueObjects;

namespace UrlShortener.WebApi.Handlers;

public static class SharedHandlers
{
    public static async Task<IResult> Redirect(
        string slug,
        IUrlServiceV1 urlServiceV1,
        IUrlRepository urlRepository,
        CancellationToken cancellationToken)
    {
        var stats = await urlServiceV1.GetStatsAsync(slug, cancellationToken);
        if (stats is null)
            return Results.NotFound();

        await urlRepository.IncrementClickCountAsync(slug, cancellationToken);
        return Results.Redirect(stats.OriginalUrl);
    }
}
