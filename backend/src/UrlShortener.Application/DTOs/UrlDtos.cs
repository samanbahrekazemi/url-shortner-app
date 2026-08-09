namespace UrlShortener.Application.DTOs;

public sealed class CreateUrlRequest
{
    public string OriginalUrl { get; init; } = string.Empty;
}

public sealed class CreateUrlResponse
{
    public CreateUrlResponse(Guid id, string slug, string shortUrl, DateTime createdAt)
    {
        Id = id;
        Slug = slug;
        ShortUrl = shortUrl;
        CreatedAt = createdAt;
    }

    public Guid Id { get; }
    public string Slug { get; }
    public string ShortUrl { get; }
    public DateTime CreatedAt { get; }
}

public sealed class UrlStatsResponse
{
    public UrlStatsResponse(Guid id, string slug, string originalUrl, long clickCount, DateTime createdAt)
    {
        Id = id;
        Slug = slug;
        OriginalUrl = originalUrl;
        ClickCount = clickCount;
        CreatedAt = createdAt;
    }

    public Guid Id { get; }
    public string Slug { get; }
    public string OriginalUrl { get; }
    public long ClickCount { get; }
    public DateTime CreatedAt { get; }
}
