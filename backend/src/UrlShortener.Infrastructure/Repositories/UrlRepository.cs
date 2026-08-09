using Microsoft.EntityFrameworkCore;
using UrlShortener.Domain.Entities;
using UrlShortener.Domain.Interfaces;
using UrlShortener.Infrastructure.Data;

namespace UrlShortener.Infrastructure.Repositories;

public sealed class UrlRepository : IUrlRepository
{
    private readonly AppDbContext _context;

    public UrlRepository(AppDbContext context)
    {
        _context = context;
    }

    public IQueryable<UrlEntry> GetQueryable()
    {
        return _context.UrlEntries.AsQueryable();
    }

    public async Task<UrlEntry?> GetBySlugAsync(string slug, CancellationToken cancellationToken = default)
    {
        return await _context.UrlEntries
            .FirstOrDefaultAsync(x => x.Slug == slug, cancellationToken);
    }

    public async Task<UrlEntry?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.UrlEntries
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<UrlEntry> AddAsync(UrlEntry urlEntry, CancellationToken cancellationToken = default)
    {
        await _context.UrlEntries.AddAsync(urlEntry, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return urlEntry;
    }

    public async Task IncrementClickCountAsync(string slug, CancellationToken cancellationToken = default)
    {
        var entry = await _context.UrlEntries
            .FirstOrDefaultAsync(x => x.Slug == slug, cancellationToken);

        if (entry is not null)
        {
            entry.IncrementClickCount();
            await _context.SaveChangesAsync(cancellationToken);
        }
    }

    public async Task<bool> SlugExistsAsync(string slug, CancellationToken cancellationToken = default)
    {
        return await _context.UrlEntries
            .AnyAsync(x => x.Slug == slug, cancellationToken);
    }

    public async Task<int> GetCountAsync(CancellationToken cancellationToken = default)
    {
        return await _context.UrlEntries.CountAsync(cancellationToken);
    }

    public async Task<(List<UrlEntry> Items, int TotalCount, int FilteredCount)> GetPagedAsync(
        IQueryable<UrlEntry> query,
        int page,
        int pageSize,
        CancellationToken cancellationToken = default)
    {
        var totalCount = await _context.UrlEntries.CountAsync(cancellationToken);
        var filteredCount = await query.CountAsync(cancellationToken);

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        return (items, totalCount, filteredCount);
    }
}
