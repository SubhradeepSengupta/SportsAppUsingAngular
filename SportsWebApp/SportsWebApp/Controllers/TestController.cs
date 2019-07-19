using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SportsWebApp.Models;

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
    }
}