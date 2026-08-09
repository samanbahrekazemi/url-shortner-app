using Asp.Versioning;
using Asp.Versioning.Builder;
using UrlShortener.Application.Common;
using UrlShortener.Application.DTOs;
using UrlShortener.WebApi.Filters;
using UrlShortener.WebApi.Handlers.V2;

namespace UrlShortener.WebApi.Endpoints.V2;

public static class UrlEndpointsV2
{
    public static void MapUrlEndpointsV2(this WebApplication app)
    {

        ApiVersionSet versionSet = app.NewApiVersionSet().HasApiVersion(new ApiVersion(2)).ReportApiVersions().Build();

        RouteGroupBuilder routeGroupBuilder = app.MapGroup("api/v{apiVersion:apiVersion}").WithApiVersionSet(versionSet);

        routeGroupBuilder.MapGet("health", () => Results.Ok(new { status = "healthy", version = "v2" }))
            .WithName("HealthCheckV2")
            .WithTags("Health")
            .WithDescription("Health check for API v2")
            .Produces(StatusCodes.Status200OK);

        routeGroupBuilder.MapPost("urls", UrlHandlersV2.CreateUrl)
            .WithName("CreateUrlV2")
            .WithTags("Urls")
            .WithDescription("Create a short URL (v2 - counter-based base62)")
            .AddEndpointFilter<ValidationFilter<CreateUrlRequest>>()
            .Produces<CreateUrlResponse>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest);

        routeGroupBuilder.MapGet("urls", UrlHandlersV2.ListUrls)
            .WithName("GetUrlsListV2")
            .WithTags("Urls")
            .WithDescription("List URLs with pagination, search and filter (v2)")
            .Produces<PaginatedResponse<UrlListItemResponse>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest);

        routeGroupBuilder.MapGet("urls/{slug}", UrlHandlersV2.GetStats)
            .WithName("GetUrlStatsV2")
            .WithTags("Urls")
            .WithDescription("Get URL statistics (v2)")
            .Produces<UrlStatsResponse>()
            .ProducesProblem(StatusCodes.Status404NotFound);
    }
}
