using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SportsWebApp.Models
{
    public class TestTypeMapper
    {
        [Key]
        public int ID { get; set; }
        public int TestID { get; set; }
        public int TestTypeID { get; set; }

        [ForeignKey("TestID")]
        public virtual Test Test { get; set; }
        [ForeignKey("TestTypeID")]
        public virtual TestType TestType { get; set; }
    }
}
