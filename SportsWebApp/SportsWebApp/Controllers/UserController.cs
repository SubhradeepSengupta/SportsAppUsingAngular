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

        public async Task<IActionResult> CreateUserAsync([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            context.Users.Add(user);
            await context.SaveChangesAsync();

            return RedirectToAction("Index");
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