namespace UrlShortener.Domain.Entities;

public sealed class SlugCounter
{
    public int Id { get; private set; }
    public long CurrentValue { get; private set; }

    private SlugCounter() { }

    public SlugCounter(int id, long initialValue = 0)
    {
        Id = id;
        CurrentValue = initialValue;
    }

    public long Next()
    {
        CurrentValue++;
        return CurrentValue;
    }
}
