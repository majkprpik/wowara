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
        IHighestScoreService highestScoreService,
        IMapper mapper,
        IConfiguration configuration)
    {
        _highestScoreService = highestScoreService;
        _mapper = mapper;
        Configuration = configuration;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var scores = await _highestScoreService.GetAll();
        return Ok(scores);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var scores = _highestScoreService.GetById(id);
        return Ok(scores);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody]HighestScoreDTO highestScore)
    {
        try
        {
            if(highestScore.Name == "test")
                return Ok();
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