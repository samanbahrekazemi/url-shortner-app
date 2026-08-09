using UrlShortener.Application.Common;
using UrlShortener.Application.DTOs;
using UrlShortener.Domain.Entities;

namespace UrlShortener.Application.Filters;

public sealed class UrlSearchFilter
{
    public IQueryable<UrlEntry> Apply(IQueryable<UrlEntry> query, UrlListRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Search))
            return query;

        var search = request.Search.ToLower();
        return query.Where(x =>
            x.Slug.ToLower().Contains(search) ||
            x.OriginalUrl.ToLower().Contains(search));
    }
}

public sealed class UrlSorter
{
    public IQueryable<UrlEntry> Apply(IQueryable<UrlEntry> query, UrlListRequest request)
    {
        var order = SortOrderParser.Parse(request.Order);
        return request.Sort?.ToLower() switch
        {
            "slug" => order == SortOrder.Asc
                ? query.OrderBy(x => x.Slug)
                : query.OrderByDescending(x => x.Slug),
            "clickcount" => order == SortOrder.Asc
                ? query.OrderBy(x => x.ClickCount)
                : query.OrderByDescending(x => x.ClickCount),
            "originalurl" => order == SortOrder.Asc
                ? query.OrderBy(x => x.OriginalUrl)
                : query.OrderByDescending(x => x.OriginalUrl),
            "createdat" => order == SortOrder.Asc
                ? query.OrderBy(x => x.CreatedAt)
                : query.OrderByDescending(x => x.CreatedAt),
            _ => order == SortOrder.Asc
                ? query.OrderBy(x => x.CreatedAt)
                : query.OrderByDescending(x => x.CreatedAt)
        };
    }
}
