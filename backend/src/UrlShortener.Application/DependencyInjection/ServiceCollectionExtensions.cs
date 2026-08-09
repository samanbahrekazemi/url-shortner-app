using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using UrlShortener.Application.Services.V1;
using UrlShortener.Application.Services.V2;

namespace UrlShortener.Application.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IUrlServiceV1, UrlServiceV1>();
        services.AddScoped<IUrlServiceV2, UrlServiceV2>();
        services.AddValidatorsFromAssemblyContaining<IUrlServiceV1>();
        return services;
    }
}