using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using wowara.DTOs;

public interface IHighestScoreService
{
    Task<IEnumerable<HighestScoreDTO>> GetAll(int page = 1, int pageSize = 10);
    Task<HighestScoreDTO> GetById(int id);
    Task<bool> AddNewScore(HighestScoreDTO highestScoreDTO);
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

    public async Task<IEnumerable<HighestScoreDTO>> GetAll(int page = 1, int pageSize = 10)
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

    public async Task<bool> AddNewScore(HighestScoreDTO highestScoreDTO)
    {
        var highestScore = _mapper.Map<HighestScore>(highestScoreDTO);
        highestScore.IsActive = true;
        highestScore.IsDeleted = false;
        
        await _context.HighestScores.AddAsync(highestScore);
        await _context.SaveChangesAsync();

        return true;
    }    
}