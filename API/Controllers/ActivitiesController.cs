using Microsoft.AspNetCore.Mvc;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context;
        public ActivitiesController(DataContext context)
        {
            _context = context;
        }

        //creiamo 2 endpoints

        [HttpGet] //api/activities
        public async Task<ActionResult<List<Domain.Activity>>> GetActivities()
        {
            return await _context.Activities.ToListAsync();
        }

        [HttpGet("{id}")] //api/activities/guidSpecificato

        public async Task<ActionResult<Domain.Activity>> GetActivity(Guid id)
        {
            return await _context.Activities.FindAsync(id);
        }

    }
}