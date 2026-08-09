namespace UrlShortener.Domain.ValueObjects;

public sealed class CounterSlugGenerator
{
    private const string Characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    public static string Generate(long counter)
    {
        if (counter == 0) return Characters[0].ToString();

        var result = new System.Text.StringBuilder();
        while (counter > 0)
        {
            result.Insert(0, Characters[(int)(counter % Characters.Length)]);
            counter /= Characters.Length;
        }
        return result.ToString();
    }
}
