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
    public async Task<ActionResult<List<Event>>> GetEvents()
    {
        return await _context.Events.ToListAsync();
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Event>> CreateEvent(Event newEvent)
    {
        _context.Events.Add(newEvent);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetEvents), new { id = newEvent.Id }, newEvent);
    }

    [HttpPost("{id}/register")]
    public async Task<ActionResult<Registration>> Register(int id, Registration registration)
    {
        var eventItem = await _context.Events.FindAsync(id);
        if (eventItem == null) return NotFound();

        var currentCount = await _context.Registrations.CountAsync(r => r.EventId == id);
        if (currentCount >= eventItem.MaxParticipants)
            return BadRequest("Event is full");

        registration.EventId = id;
        _context.Registrations.Add(registration);
        await _context.SaveChangesAsync();
        return Ok(registration);
    }


}