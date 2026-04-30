namespace Api.Models;

public class Event
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTime DateTime { get; set; }
    public int MaxParticipants { get; set; }
}