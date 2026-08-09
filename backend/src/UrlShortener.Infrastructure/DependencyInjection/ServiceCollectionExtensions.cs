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

    private static string? ResolveConnectionString(IConfiguration configuration)
    {
        var value = configuration["DATABASE_URL"]
                    ?? Environment.GetEnvironmentVariable("DATABASE_URL")
                    ?? configuration["CONNECTION_STRING"]
                    ?? Environment.GetEnvironmentVariable("CONNECTION_STRING");

        if (string.IsNullOrEmpty(value))
            return null;

        if (value.StartsWith("postgresql://", StringComparison.OrdinalIgnoreCase)
            || value.StartsWith("postgres://", StringComparison.OrdinalIgnoreCase))
        {
            var uri = new Uri(value);
            var userInfo = uri.UserInfo.Split(':', 2);
            var user = Uri.UnescapeDataString(userInfo[0]);
            var password = userInfo.Length > 1 ? Uri.UnescapeDataString(userInfo[1]) : "";
            return $"Host={uri.Host};Port={(uri.Port > 0 ? uri.Port : 5432)};Database={uri.AbsolutePath.TrimStart('/')};Username={user};Password={password}";
        }

        return value;
    }
}

    