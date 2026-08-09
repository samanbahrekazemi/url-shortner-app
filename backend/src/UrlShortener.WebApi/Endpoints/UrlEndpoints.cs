using Microsoft.AspNetCore.Mvc;
using UrlShortener.WebApi.Endpoints.V1;
using UrlShortener.WebApi.Endpoints.V2;
using UrlShortener.WebApi.Handlers;

namespace UrlShortener.WebApi.Endpoints;

public static class UrlEndpoints
{
    public static void MapUrlEndpoints(this WebApplication app)
    {
        app.MapUrlEndpointsV1();
        app.MapUrlEndpointsV2();

        app.MapGet("/{slug}", SharedHandlers.Redirect)
            .WithName("Redirect")
            .WithDescription("Redirect to original URL (version-agnostic)")
            .WithTags("Shared")
            .Produces(StatusCodes.Status301MovedPermanently)
            .Produces(StatusCodes.Status302Found)
            .ProducesProblem(StatusCodes.Status404NotFound);
    }
}
