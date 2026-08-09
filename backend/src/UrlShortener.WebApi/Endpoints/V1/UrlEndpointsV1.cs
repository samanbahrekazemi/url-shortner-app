using Asp.Versioning;
using Asp.Versioning.Builder;
using Microsoft.AspNetCore.Mvc;
using UrlShortener.Application.Common;
using UrlShortener.Application.DTOs;
using UrlShortener.Domain.Interfaces;
using UrlShortener.WebApi.Filters;
using UrlShortener.WebApi.Handlers.V1;

namespace UrlShortener.WebApi.Endpoints.V1;

public static class UrlEndpointsV1
{
    public static void MapUrlEndpointsV1(this IEndpointRouteBuilder app)
    {

        ApiVersionSet versionSet = app.NewApiVersionSet().HasApiVersion(new ApiVersion(1)).ReportApiVersions().Build();

        RouteGroupBuilder routeGroupBuilder = app.MapGroup("api/v{apiVersion:apiVersion}").WithApiVersionSet(versionSet);

        routeGroupBuilder.MapGet("health", () => Results.Ok(new { status = "healthy", version = "v1" }))
            .WithName("HealthCheckV1")
            .WithTags("Health")
            .WithDescription("Health check for API v1")
            .Produces(StatusCodes.Status200OK);

        routeGroupBuilder.MapGet("dashboard/stats", UrlHandlersV1.GetDashboardStats)
            .WithName("GetDashboardStatsV1")
            .WithTags("Dashboard")
            .WithDescription("Get dashboard overview statistics (v1)")
            .Produces(StatusCodes.Status200OK);

        routeGroupBuilder.MapPost("urls", UrlHandlersV1.CreateUrl)
            .WithName("CreateUrlV1")
            .WithTags("Urls")
            .WithDescription("Create a short URL (v1 - base62 random)")
            .AddEndpointFilter<ValidationFilter<CreateUrlRequest>>()
            .Produces<CreateUrlResponse>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest);

        routeGroupBuilder.MapGet("urls", UrlHandlersV1.ListUrls)
            .WithName("GetUrlsListV1")
            .WithTags("Urls")
            .WithDescription("List URLs with pagination, search and filter (v1)")
            .Produces<PaginatedResponse<UrlListItemResponse>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest);

        routeGroupBuilder.MapGet("urls/{slug}", UrlHandlersV1.GetStats)
            .WithName("GetUrlStatsV1")
            .WithTags("Urls")
            .WithDescription("Get URL statistics (v1)")
            .Produces<UrlStatsResponse>()
            .ProducesProblem(StatusCodes.Status404NotFound);
    }
}
