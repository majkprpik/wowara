using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using wowara.DTOs;
using wowara.Helpers;

public class HighestScoreController : ApiBase
{
    private IHighestScoreService _highestScoreService;
    private IMapper _mapper;
    protected readonly IConfiguration Configuration;

    public HighestScoreController(
        IHighestScoreService _highestScoreService,
        IMapper mapper,
        IConfiguration configuration)
    {
        _highestScoreService = _highestScoreService;
        _mapper = mapper;
        Configuration = configuration;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var activities = await _highestScoreService.GetAll();
        return Ok(activities);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var activity = _highestScoreService.GetById(id);
        return Ok(activity);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody]HighestScoreDTO highestScore)
    {
        try
        {
            // save 
            await _highestScoreService.AddNewScore(highestScore);
            return Ok();
        }
        catch (Exception ex)
        {
            // return error message if there was an exception
            return BadRequest(new { message = ex.Message });
        }
    }
}