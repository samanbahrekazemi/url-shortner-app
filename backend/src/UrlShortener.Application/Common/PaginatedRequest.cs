using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;

namespace UrlShortener.Application.Common;

public sealed class PaginatedResponse<T>
{
    public List<T> Items { get; init; } = [];
    public int TotalCount { get; init; }
    public int FilteredCount { get; init; }
    public int Page { get; init; }
    public int PageSize { get; init; }
    public int TotalPages => (int)Math.Ceiling(FilteredCount / (double)PageSize);
    public bool HasPrevious => Page > 1;
    public bool HasNext => Page < TotalPages;
}

public class PaginatedRequest
{
    [Description("Page number (1-based).")]
    [FromQuery(Name = "page")]
    public int? Page { get; set; } = 1;
    [Description("Items per page.")]
    [FromQuery(Name = "limit")]
    [Range(1, 2000, ErrorMessage = "Limit must be between {0} and {1}.")]
    public int? Limit { get; set; } = 10;
    [Description("Free-text search across slug and original URL.")]
    [FromQuery(Name = "search")]
    public string? Search { get; set; } = string.Empty;
    [Description("Sort field. Valid values: id | slug | original_url | click_count | created_at.")]
    [FromQuery(Name = "sort")]
    public string? Sort { get; set; } = string.Empty;
    [Description("Sort direction. Valid values: asc | desc | 1 | 2.")]
    [FromQuery(Name = "order")]
    public string? Order { get; set; }
}

