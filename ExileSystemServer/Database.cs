using CachingFramework.Redis;
using CachingFramework.Redis.Serializers;
using ExileModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ExileSystemServer
{

    public class PlayerConnection
    {
        public string Channel { get; set; }
        public string ConnectionId { get; set; }
        public string Account { get; set; }
        public DateTime Updated { get; set; }

        public PlayerConnection()
        {
            Updated = DateTime.Now;
        }        
    }

    public static class Database
    {
        private static Context redis;
        public static void Initialize()
        {
            redis = new Context("localhost:6379", new JsonSerializer());
        }
        
        public static Channel UpdateOrAddPlayer(string channel, Player player)
        {

            Channel existingChannel = redis.Cache.GetObject<Channel>($"game:{channel}");
            if (existingChannel == null)
            {
                existingChannel = new Channel(channel);
                existingChannel.Players.Add(player);
            }
            else
            {
                var existingPlayer = existingChannel.Players.FirstOrDefault(c => c.Account == player.Account);
                if (existingPlayer != null)
                {
                    existingChannel.Players.Remove(existingPlayer);
                }
                existingChannel.Players.Add(player);

            }
            redis.Cache.SetObject($"game:{channel}", existingChannel, TimeSpan.FromMinutes(10));
            return existingChannel;

        }

        public static List<PlayerConnection> AddPlayerConnection(PlayerConnection connection)
        {
            List<PlayerConnection> connections = redis.Cache.GetObject<List<PlayerConnection>>("ExileSystemsConnections");
            if (connections == null)
            {
                connections = new List<PlayerConnection>();
                connections.Add(connection);
            }
            else
            {
                var existingConnection = connections.FirstOrDefault(t => t.ConnectionId == connection.ConnectionId);
                connections.Remove(existingConnection);
                connections.Add(connection);
            }
            redis.Cache.SetObject("ExileSystemsConnections", connections, TimeSpan.FromMinutes(60));

            return connections;
        }

        public static List<PlayerConnection> RemovePlayerConnection(PlayerConnection connection)
        {
            List<PlayerConnection> connections = redis.Cache.GetObject<List<PlayerConnection>>("ExileSystemsConnections");

            if (connections != null)
            {
                var existingConnection = connections.FirstOrDefault(t => t.ConnectionId == connection.ConnectionId);
                connections.Remove(existingConnection);
                redis.Cache.SetObject("ExileSystemsConnections", connections, TimeSpan.FromMinutes(60));
                return connections;
            }

            return new List<PlayerConnection>();
        }

    }
}
