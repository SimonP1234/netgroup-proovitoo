namespace Api.Models;

public class Registration
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } =  string.Empty;
    public string PersonalCode { get; set; } = string.Empty;
    public int EventId { get; set; }
    public Event? Event { get; set; } = null!;
}