using wowara.Entities;

public class Creature : AuditableBaseEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string ImageUrl { get; set; }
    public int Attack { get; set; }
}