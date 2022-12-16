using wowara.Entities;

public class HighestScore : AuditableBaseEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Score { get; set; }
    // public virtual ICollection<Creature> Creatures { get; set; }
}