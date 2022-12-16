using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using wowara.Helpers;

public class CreatureController : ApiBase
{
    private ICreatureService _creatureService;
    private IMapper _mapper;
    protected readonly IConfiguration Configuration;

    public CreatureController(
        ICreatureService creatureService,
        IMapper mapper,
        IConfiguration configuration)
    {
        _creatureService = creatureService;
        _mapper = mapper;
        Configuration = configuration;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var activities = await _creatureService.GetAll();
        return Ok(activities);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var activity = _creatureService.GetById(id);
        return Ok(activity);
    }
}