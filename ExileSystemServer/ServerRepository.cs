using CachingFramework.Redis;
using CachingFramework.Redis.Serializers;
using ExileModels;
using System;
using System.Linq;

namespace ExileSystemServer
{
    public class ServerRepository
    {
        private Context redis;
        public ServerRepository()
        {
            redis = new Context("localhost:6379", new JsonSerializer());
        }

        public Channel UpdateOrAddPlayer(string channel, Player player)
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
    }
}
