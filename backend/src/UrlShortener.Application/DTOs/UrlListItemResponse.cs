namespace UrlShortener.Application.DTOs;

public sealed record UrlListItemResponse(
    Guid Id,
    string Slug,
    string OriginalUrl,
    long ClickCount,
    DateTime CreatedAt);
