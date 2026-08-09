namespace UrlShortener.Domain.Entities;

public sealed class UrlEntry
{
    public Guid Id { get; private set; }
    public string Slug { get; private set; } = string.Empty;
    public string OriginalUrl { get; private set; } = string.Empty;
    public long ClickCount { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime? ExpiresAt { get; private set; }

    private UrlEntry() { }

    public UrlEntry(string slug, string originalUrl, DateTime? expiresAt = null)
    {
        Id = Guid.NewGuid();
        Slug = slug;
        OriginalUrl = originalUrl;
        ClickCount = 0;
        CreatedAt = DateTime.UtcNow;
        ExpiresAt = expiresAt;
    }

    public UrlEntry(Guid id, string slug, string originalUrl)
    {
        Id = id;
        Slug = slug;
        OriginalUrl = originalUrl;
        ClickCount = 0;
        CreatedAt = DateTime.UtcNow;
    }

    public void IncrementClickCount()
    {
        ClickCount++;
    }

    public bool IsExpired => ExpiresAt.HasValue && ExpiresAt.Value < DateTime.UtcNow;
}
