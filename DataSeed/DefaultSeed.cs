using Newtonsoft.Json;

namespace wowara.DataSeed
{
    public class DefaultSeed
    {
        public static void SeedData(DataContext context)
        {
            if (!context.Creatures.Any())
            {
                // TODO - fetch data from a remote API
                
                var creaturesData = System.IO.File.ReadAllText("DataSeed/CreaturesSeedData.json");
                var creatures = JsonConvert.DeserializeObject<List<Creature>>(creaturesData);
                foreach (var creature in creatures)
                {
                    context.Creatures.Add(creature);
                }
                context.SaveChanges();
            }
        }
    }
}