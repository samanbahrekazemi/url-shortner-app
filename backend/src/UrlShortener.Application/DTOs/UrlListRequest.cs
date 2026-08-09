using System.ComponentModel;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using UrlShortener.Application.Common;

namespace UrlShortener.Application.DTOs;

public class UrlListRequest : PaginatedRequest
{
    [Description("Filter by creation date from (ISO 8601), inclusive.")]
    [FromQuery(Name = "created_from")]
    public DateTime? CreatedFrom { get; set; }
    [Description("Filter by creation date to (ISO 8601), inclusive.")]
    [FromQuery(Name = "created_to")]
    public DateTime? CreatedTo { get; set; }
    [Description("Minimum click count.")]
    [FromQuery(Name = "min_clicks")]
    public long? MinClicks { get; set; }
    [Description("Maximum click count.")]
    [FromQuery(Name = "max_clicks")]
    public long? MaxClicks { get; set; }
}