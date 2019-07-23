using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWebApp.Models;
using SportsWebApp.ViewModel;

namespace SportsWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly SportsDbContext context;

        public TestController(SportsDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            //var sth = await context.TestTypeMappers.Include(t => t.Test.UserTestMappers).Include(t => t.TestType).OrderByDescending(t => t.Test.Date).ToListAsync();
            return Ok(await context.TestTypeMappers.Include(t => t.Test.UserTestMappers).Include(t => t.TestType).OrderByDescending(t => t.Test.Date).ToListAsync());
        }

        [HttpGet("GetTestType")]
        public async Task<IActionResult> GetTestTypeAsync()
        {
            return Ok(await context.TestTypes.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTestById([FromRoute] int id)
        {
            var test = await context.TestTypeMappers.Include(t => t.Test).ThenInclude(t => t.UserTestMappers).ThenInclude(t => t.User).Include(t => t.TestType).Where(t => t.TestID == id).ToListAsync();
            return Ok(test);
        }

        [HttpGet("GetUserByTestId/{testId}/{userId}")]
        public async Task<IActionResult> GetUserByTestId([FromRoute] int testId, [FromRoute] int userId)
        {
            var user = await context.UserTestMappers.Include(u => u.User).Where(u => u.TestID == testId).Where(u => u.UserID == userId).FirstOrDefaultAsync();
            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTestAsync([FromBody] TestViewModel test)
        {
            TestType TestTypes = await context.TestTypes.FirstOrDefaultAsync(t => t.Name == test.TestType);
            TestTypeMapper TestType = new TestTypeMapper();
            Test Tests = new Test();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Tests.Date = test.Date;
            context.Tests.Add(Tests);
            TestType.TestID = Tests.ID;
            TestType.TestTypeID = TestTypes.ID;
            context.TestTypeMappers.Add(TestType);
            await context.SaveChangesAsync();

            return Ok(test);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTestAsync([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var test = await context.Tests.FindAsync(id);
            if (test == null)
            {
                return NotFound();
            }
            context.Tests.Remove(test);
            await context.SaveChangesAsync();
            return Ok(test);
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> AddAthleteAsync([FromRoute] int id, [FromBody] AthleteAddViewModel athlete)
        {
            UserTestMapper UserTest = new UserTestMapper();
            var UserExist = (from user in context.UserTestMappers.Where(t => t.TestID == id)
                             select user.User.Name).ToList();
            var Tests = await context.Tests.FirstOrDefaultAsync(t => t.ID == id);
            var Users = context.Users.Where(u => u.Name == athlete.Name);

            if (!UserExist.Contains(athlete.Name))
            {
                UserTest.TestID = Tests.ID;
                foreach (User user in Users)
                {
                    UserTest.UserID = user.ID;
                }
                if (athlete.Distance != 0)
                {
                    UserTest.CooperTestDistance = athlete.Distance;
                    UserTest.FitnessRating = CalculateFitness(athlete.Distance);
                }
                else
                {
                    UserTest.SprintTestTime = athlete.Time;
                }
                context.UserTestMappers.Add(UserTest);
            }
            else
            {
                var UpdateUser = context.UserTestMappers.Where(u => u.User.Name == athlete.Name).Where(u => u.TestID == id).FirstOrDefault();

                if (athlete.Distance != 0)
                {
                    UpdateUser.CooperTestDistance = athlete.Distance;
                    UpdateUser.FitnessRating = CalculateFitness(athlete.Distance);
                }
                else
                {
                    UpdateUser.SprintTestTime = athlete.Time;
                }
                context.UserTestMappers.Update(UpdateUser);
            }
            await context.SaveChangesAsync();
            return Ok(athlete);
        }

        [HttpPut("{testId}/{athleteId}")]
        public async Task<IActionResult> AthleteEditASync([FromRoute] int testId, [FromRoute] int athleteId, [FromBody] UserPerTestViewModel athlete)
        {
            var UserPerTest = context.UserTestMappers.Include(u => u.User).Where(u => u.TestID == testId).Where(u => u.UserID == athleteId).FirstOrDefault();
            UserPerTest.User.Name = athlete.User.Name;
            if (athlete.CooperTestDistance != null)
            {
                UserPerTest.CooperTestDistance = athlete.CooperTestDistance;
                UserPerTest.FitnessRating = CalculateFitness(athlete.CooperTestDistance);
            }
            else
            {
                UserPerTest.SprintTestTime = athlete.SprintTestTime;
            }
            context.UserTestMappers.Update(UserPerTest);
            await context.SaveChangesAsync();

            return Ok(athlete);
        }

        [HttpDelete("{testId}/{athleteId}")]
        public async Task<IActionResult> DeleteAthleteAsync([FromRoute] int testId, [FromRoute] int athleteId)
        {
            var athlete = context.UserTestMappers.Where(a => a.TestID == testId).Where(a => a.UserID == athleteId).FirstOrDefault();
            context.UserTestMappers.Remove(athlete);
            await context.SaveChangesAsync();
            return Ok();
        }

        private string CalculateFitness(double? distance)
        {
            if (distance <= 1000)
            {
                return "Below Average";
            }
            else if (distance > 1000 && distance <= 2000)
            {
                return "Average";
            }
            else if (distance > 2000 && distance <= 3500)
            {
                return "Good";
            }
            else if (distance > 3500)
            {
                return "Very Good";
            }
            return " ";
        }
    }
}