namespace UrlShortener.Application.Common;

public enum SortOrder
{
    Asc = 1,
    Desc = 2
}

public static class SortOrderParser
{
    public static SortOrder Parse(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
            return SortOrder.Desc;

        if (Enum.TryParse<SortOrder>(value, ignoreCase: true, out var result))
            return result;

        return value switch
        {
            "1" => SortOrder.Asc,
            "2" => SortOrder.Desc,
            _ => SortOrder.Desc
        };
    }
}
