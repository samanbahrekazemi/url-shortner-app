namespace UrlShortener.Domain.ValueObjects;

public sealed class SlugGenerator
{
    private const string Characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private const int DefaultLength = 7;
    private static readonly Random Random = new();

    public static string Generate(int length = DefaultLength)
    {
        return string.Create(length, Characters, (span, chars) =>
        {
            for (int i = 0; i < span.Length; i++)
            {
                span[i] = chars[Random.Next(chars.Length)];
            }
        });
    }
}
