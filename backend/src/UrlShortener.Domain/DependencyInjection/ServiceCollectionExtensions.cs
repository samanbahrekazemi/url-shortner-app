using Microsoft.Extensions.DependencyInjection;

namespace UrlShortener.Domain.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDomain(this IServiceCollection services)
    {
        return services;
    }
}