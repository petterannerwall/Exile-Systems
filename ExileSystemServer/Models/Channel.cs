using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExileSystemServer.Models
{
    [Serializable]
    public class Channel
    {
        public string ID { get; set; }
        public List<Player> Players { get; set; }
        public Channel(string id)
        {
            ID = id;
            Players = new List<Player>();
        }


    }
}
