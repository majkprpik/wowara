using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using wowara.DTOs;

public interface ICreatureService
{
    Task<IEnumerable<CreatureDTO>> GetAll();
    Task<CreatureDTO> GetById(int id);
    Task<bool> AddCreature(CreatureDTO creatureDTO);
}

public class CreatureService : ICreatureService
{
    private DataContext _context;
    private readonly IMapper _mapper;
    protected readonly IConfiguration Configuration;

    public CreatureService(
        DataContext context,
        IMapper mapper,
        IConfiguration configuration)
    {
        _context = context;
        _mapper = mapper;
        Configuration = configuration;
    }

    public async Task<IEnumerable<CreatureDTO>> GetAll()
    {
        return await _context.Creatures
            .Where(a => a.IsActive && !a.IsDeleted)
            .OrderBy(a => a.Id)
            .ProjectTo<CreatureDTO>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task<CreatureDTO> GetById(int id)
    {
        return await _context.Creatures
            .Where(a => a.IsActive && !a.IsDeleted && a.Id == id)
            .ProjectTo<CreatureDTO>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();
    }

    public async Task<bool> AddCreature(CreatureDTO creatureDTO)
    {
        bool sameAttack = await _context.Creatures.AnyAsync(a => a.Attack == creatureDTO.Attack);
        if (sameAttack)
        {
            throw new Exception("Attack " + creatureDTO.Attack + " is already taken");
        }
        var creature = new Creature();
        creature.Name = creatureDTO.Name;
        creature.ImageUrl = creatureDTO.ImageUrl;
        creature.Attack = creatureDTO.Attack;
        creature.IsActive = true;
        creature.IsDeleted = false;
        _context.Creatures.Add(creature);
        await _context.SaveChangesAsync();
        return true;
    }
}