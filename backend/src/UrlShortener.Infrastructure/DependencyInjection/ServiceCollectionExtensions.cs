using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using UrlShortener.Domain.Interfaces;
using UrlShortener.Infrastructure.Data;
using UrlShortener.Infrastructure.Repositories;

namespace UrlShortener.Infrastructure.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var connectionString = ResolveConnectionString(configuration);

        if (!string.IsNullOrEmpty(connectionString))
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(connectionString));
        }
        else
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseInMemoryDatabase("UrlShortener"));
        }

        services.AddScoped<IUrlRepository, UrlRepository>();
        services.AddScoped<ISlugCounterRepository, SlugCounterRepository>();

        return services;
    }

    private static string ResolveConnectionString(IConfiguration configuration)
    {
        return configuration["CONNECTION_STRING"]
               ?? Environment.GetEnvironmentVariable("CONNECTION_STRING")
               ?? configuration.GetConnectionString("DefaultConnection");
    }
}

    