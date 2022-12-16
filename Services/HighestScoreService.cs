using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using wowara.DTOs;

public interface IHighestScoreService
{
    Task<IEnumerable<HighestScoreDTO>> GetAll();
    Task<HighestScoreDTO> GetById(int id);
}

public class HighestScoreService : IHighestScoreService
{
    private DataContext _context;
    private readonly IMapper _mapper;
    protected readonly IConfiguration Configuration;

    public HighestScoreService(
        DataContext context,
        IMapper mapper,
        IConfiguration configuration)
    {
        _context = context;
        _mapper = mapper;
        Configuration = configuration;
    }

    public async Task<IEnumerable<HighestScoreDTO>> GetAll()
    {
        return await _context.HighestScores
            .Where(a => a.IsActive && !a.IsDeleted)
            .OrderBy(a => a.Id)
            .ProjectTo<HighestScoreDTO>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task<HighestScoreDTO> GetById(int id)
    {
        return await _context.HighestScores
            .Where(a => a.IsActive && !a.IsDeleted && a.Id == id)
            .ProjectTo<HighestScoreDTO>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();
    }
}