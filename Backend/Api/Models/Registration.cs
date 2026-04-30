namespace Api.Models;

public class Registration
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PersonalCode { get; set; }
    public int EventId { get; set; }
    public Event Event { get; set; }
}