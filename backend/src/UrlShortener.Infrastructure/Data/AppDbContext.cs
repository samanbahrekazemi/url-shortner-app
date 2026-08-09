using Microsoft.EntityFrameworkCore;
using UrlShortener.Domain.Entities;

namespace UrlShortener.Infrastructure.Data;

public sealed class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<UrlEntry> UrlEntries => Set<UrlEntry>();
    public DbSet<SlugCounter> SlugCounters => Set<SlugCounter>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UrlEntry>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Slug).IsUnique();
            entity.Property(e => e.Slug).HasMaxLength(20).IsRequired();
            entity.Property(e => e.OriginalUrl).HasMaxLength(2048).IsRequired();
            entity.Property(e => e.ClickCount).HasDefaultValue(0);
        });

        // Seed data handled in migration. HasData omitted to avoid
        // PendingModelChangesWarning from dynamic DateTime.UtcNow in constructors.
    }
}
