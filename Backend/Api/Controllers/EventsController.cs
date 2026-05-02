using Api.Models;
using Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController : ControllerBase
{
    private readonly AppDbContext _context;

    public EventsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult> GetEvents()
    {
        var events = await _context.Events.Select(e => new
        {
            e.Id,
            e.Name,
            e.DateTime,
            e.MaxParticipants,
            RegisteredCount = _context.Registrations.Count(r => r.EventId == e.Id)
        }).ToListAsync();
        return Ok(events);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Event>> CreateEvent(Event newEvent)
    {
        if (string.IsNullOrWhiteSpace(newEvent.Name))
            return BadRequest("Sündmuse nimi on kohustuslik");
        if (newEvent.MaxParticipants <= 0)
            return BadRequest("Osalejate arv peab olema vähemalt 1");
        if (newEvent.DateTime == default)
            return BadRequest("Kuupäev ja kellaaeg on kohustuslik");
        _context.Events.Add(newEvent);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetEvents), new { id = newEvent.Id }, newEvent);
    }

    [HttpPost("{id}/register")]
    public async Task<ActionResult<Registration>> Register(int id, Registration registration)
    {
        if (string.IsNullOrWhiteSpace(registration.FirstName) ||
            string.IsNullOrWhiteSpace(registration.LastName) ||
            string.IsNullOrWhiteSpace(registration.PersonalCode))
        {
            return BadRequest("Kõik väljad on kohustuslikud");
        }
        if (registration.PersonalCode.Length != 11)
        {
            return BadRequest("Isikukood peab olema 11-kohaline");
        }

        using var transaction = await _context.Database.BeginTransactionAsync(System.Data.IsolationLevel.Serializable);
        try
        {
            var eventItem = await _context.Events.FindAsync(id);
            if (eventItem == null)
            {
                return NotFound();
            }

            var currentCount = await _context.Registrations.CountAsync(r => r.EventId == id);
            if (currentCount >= eventItem.MaxParticipants)
            {
                return BadRequest("Sündmus on täis");
            }

            registration.EventId = id;
            _context.Registrations.Add(registration);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            return Ok(registration);
        }
        catch (DbUpdateException)
        {
            return BadRequest("Sama isik on juba registreeritud");
        }
        catch (Exception)
        {
            return BadRequest("Registreerimine ebaõnnestus");
        }
    }
}