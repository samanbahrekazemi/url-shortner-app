using Asp.Versioning;
using DotNetEnv;
using Microsoft.AspNetCore.Http.Json;
using Scalar.AspNetCore;
using System.Text.Json;
using UrlShortener.Application.Common;
using UrlShortener.Application.DependencyInjection;
using UrlShortener.Domain.DependencyInjection;
using UrlShortener.Infrastructure.DependencyInjection;
using UrlShortener.WebApi.Endpoints;
using UrlShortener.WebApi.Filters;
using UrlShortener.WebApi.HealthChecks;
using UrlShortener.WebApi.Init;

var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsDevelopment())
{
    var envPath = Path.Combine(Directory.GetCurrentDirectory(), "..", ".env");
    if (File.Exists(envPath))
    {
        Env.Load(envPath);
    }
}

builder.Configuration.AddEnvironmentVariables();

var apiVersions = new[]
{
    new { Name = "v1", Title = "UrlShortener API V1", Version = "1.0" },
    new { Name = "v2", Title = "UrlShortener API V2", Version = "2.0" }
};

builder.Services.AddFlexibleEnums();
builder.Services.AddDomain();
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddHealthChecks().AddCheck<DatabaseHealthCheck>("database");

builder.Services.Configure<JsonOptions>(options =>
{
    options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower;
    options.SerializerOptions.Converters.Add(new FlexibleEnumJsonConverterFactory());
});

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower;
});

builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.ApiVersionReader = new UrlSegmentApiVersionReader();
})
.AddApiExplorer(options =>
{
    options.GroupNameFormat = "'v'VVV";
    options.SubstituteApiVersionInUrl = true;
});

foreach (var version in apiVersions)
{
    builder.Services.AddOpenApi(version.Name, options =>
    {
        options.AddDocumentTransformer((document, context, cancellationToken) =>
        {
            document.Info.Version = version.Version;
            document.Info.Title = version.Title;
            return Task.CompletedTask;
        });
    });
}

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        var origins = builder.Configuration["CorsOrigins"];
        if (!string.IsNullOrWhiteSpace(origins) && origins != "*")
        {
            policy.WithOrigins(origins.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        }
        else
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        }
    });
});

var app = builder.Build();

await DatabaseInitializer.ApplyMigrationsAsync(app);

const string docUrl = "/doc";
app.MapGet("/", () => Results.Redirect(docUrl)).ExcludeFromDescription();

app.MapOpenApi();
app.MapScalarApiReference(docUrl, options =>
{
    options.Title = "UrlShortener API";

    foreach (var version in apiVersions)
    {
        options.AddDocument(
            version.Name,
            version.Title,
            $"/openapi/{version.Name}.json"
        );
    }
});

app.UseCors();
app.MapHealthChecks("/health");
app.MapUrlEndpoints();

app.Run();