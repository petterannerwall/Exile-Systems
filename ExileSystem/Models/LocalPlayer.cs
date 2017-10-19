using ExileModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExileSystem.Models
{
    public static class LocalPlayer
    {
        public static Player player { get; set; }
        public static void Initialize()
        {
            player = new Player();
        }
    }
}
