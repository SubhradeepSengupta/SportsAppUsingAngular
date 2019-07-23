using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWebApp.Models;

namespace SportsWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly SportsDbContext context;

        public UserController(SportsDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var Users = await context.Users.ToListAsync();
            return Ok(Users);
        }

        [HttpGet("Athlete")]
        public async Task<IActionResult> GetTestTypeAsync()
        {
            return Ok(await context.Users.Where(u => u.Role == UserRole.Athlete).ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById([FromRoute] int id)
        {
            var Users = await context.Users.Where(u => u.ID == id).ToListAsync();
            return Ok(Users);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUserAsync([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            context.Users.Add(user);
            await context.SaveChangesAsync();

            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditUserAsync([FromRoute] int id, [FromBody] User user)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if(id != user.ID)
            {
                return BadRequest();
            }

            User edituser = await context.Users.Where(u => u.ID == id).FirstOrDefaultAsync();
            edituser.Name = user.Name;
            edituser.Role = user.Role;
            context.Users.Update(edituser);
            await context.SaveChangesAsync();

            return Ok(user);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserAsync([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            context.Users.Remove(user);
            await context.SaveChangesAsync();
            return Ok(user);
        }
    }
}