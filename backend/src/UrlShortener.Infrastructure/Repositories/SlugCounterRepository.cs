using Microsoft.EntityFrameworkCore;
using UrlShortener.Domain.Entities;
using UrlShortener.Domain.Interfaces;
using UrlShortener.Infrastructure.Data;

namespace UrlShortener.Infrastructure.Repositories;

public sealed class SlugCounterRepository : ISlugCounterRepository
{
    private readonly AppDbContext _context;

    public SlugCounterRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<long> GetNextAsync(CancellationToken cancellationToken = default)
    {
        var counter = await _context.SlugCounters
            .FirstOrDefaultAsync(c => c.Id == 1, cancellationToken);

        if (counter is null)
        {
            counter = new SlugCounter(1, 0);
            _context.SlugCounters.Add(counter);
        }

        var next = counter.Next();
        await _context.SaveChangesAsync(cancellationToken);
        return next;
    }
}
