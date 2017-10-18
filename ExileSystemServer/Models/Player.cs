using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExileSystemServer.Models
{
    [Serializable]
    public class Player
    {
        public string ConnectionID { get; set; }
        public string Account { get; set; }
        public string Character { get; set; }
        public string Area { get; set; }
        public string Guild { get; set; }
        public List<string> InArea { get; set; }
    }
}
