﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ESC.Resturant.Data.Entities
{
    public class Settings
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public bool IsDefault { get; set; }
        public bool IsDelete { get; set; }
    }
}
