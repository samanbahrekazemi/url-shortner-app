using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace UrlShortener.Infrastructure.Data;

public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var connectionString = ResolveConnectionString();
        if (string.IsNullOrEmpty(connectionString))
            throw new InvalidOperationException(
                "Set CONNECTION_STRING env var or add it to .env file at project root.");

        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
        optionsBuilder.UseNpgsql(connectionString);

        return new AppDbContext(optionsBuilder.Options);
    }

    private static string? ResolveConnectionString()
    {
        var env = Environment.GetEnvironmentVariable("DATABASE_URL")
                  ?? Environment.GetEnvironmentVariable("CONNECTION_STRING");
        if (!string.IsNullOrEmpty(env))
            return env;

        var dir = Directory.GetCurrentDirectory();
        for (var i = 0; i < 4; i++)
        {
            var envPath = Path.Combine(dir, ".env");
            if (File.Exists(envPath))
            {
                var line = File.ReadLines(envPath)
                    .FirstOrDefault(l => l.StartsWith("DATABASE_URL=", StringComparison.OrdinalIgnoreCase)
                                     || l.StartsWith("CONNECTION_STRING=", StringComparison.OrdinalIgnoreCase));
                if (line != null)
                {
                    var separatorIndex = line.IndexOf('=');
                    return line[(separatorIndex + 1)..].Trim('"', '\'', ' ');
                }
            }
            dir = Path.GetDirectoryName(dir);
        }

        return null;
    }
}
