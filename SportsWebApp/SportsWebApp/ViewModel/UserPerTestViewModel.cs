using SportsWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportsWebApp.ViewModel
{
    public class UserPerTestViewModel
    {
        public DateTime Date { get; set; }
        public String TestName { get; set; }
        public String Name { get; set; }
        public int? SprintTestTime { get; set; }
        public double? CooperTestDistance { get; set; }
        public string FitnessRating { get; set; }
        public User User { get; set; }
    }
}
