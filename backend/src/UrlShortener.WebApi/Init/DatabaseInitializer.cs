using Microsoft.EntityFrameworkCore;
using UrlShortener.Domain.Entities;
using UrlShortener.Infrastructure.Data;

namespace UrlShortener.WebApi.Init;

public static class DatabaseInitializer
{
    private const int MaxSeedUrls = 100;

    public static async Task ApplyMigrationsAsync(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");

        if (!string.IsNullOrEmpty(connectionString))
        {
            await db.Database.MigrateAsync();
        }
        else
        {
            await db.Database.EnsureCreatedAsync();
            await SeedDemoDataAsync(db);
        }
    }

    private static async Task SeedDemoDataAsync(AppDbContext db)
    {
        if (await db.UrlEntries.AnyAsync())
            return;

        var demos = new List<UrlEntry>
        {
            new("google", "https://www.google.com"),
            new("youtube", "https://www.youtube.com"),
            new("apple", "https://www.apple.com"),
            new("github", "https://github.com"),
            new("twitter", "https://twitter.com"),
            new("amazon", "https://www.amazon.com"),
            new("netflix", "https://www.netflix.com"),
            new("wikipedia", "https://www.wikipedia.org"),
        };

        db.UrlEntries.AddRange(demos);
        await db.SaveChangesAsync();
    }
}
