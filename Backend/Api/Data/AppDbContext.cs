namespace Api.Data;

using Api.Models;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Event> Events { get; set; } = null!;
    public DbSet<Registration> Registrations { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Event>()
            .Property(e => e.DateTime)
            .HasColumnType("timestamp without time zone");
        
        modelBuilder.Entity<Registration>()
            .HasIndex(r => new { r.EventId, r.PersonalCode })
            .IsUnique();

    }
}