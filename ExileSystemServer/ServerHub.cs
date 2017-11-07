using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Concurrent;
using ExileModels;

namespace ExileSystemServer
{
    public class ServerHub : Hub
    {

        public ServerHub()
        {

        }

        public override Task OnDisconnected(bool stopCalled)
        {
            return base.OnDisconnected(stopCalled);
        }

        public override Task OnReconnected()
        {

            return base.OnReconnected();
        }

        public League GetLeague(string name)
        {
            Console.WriteLine("Getting data for league: " + name);
            return Database.GetSpecificLeague(name);
        }

        public void Login(string channel, Player player)
        {
            Groups.Add(Context.ConnectionId, channel);
            UpdatePlayer(channel, player, MessageType.Other);
        }

        public void RegisterSpectator(string channel)
        {
            Groups.Add(Context.ConnectionId, channel);
        }

        public void UpdatePlayer(string channel, Player player, MessageType reason)
        {
            if (reason == MessageType.OtherJoinArea)
            {

            }

            if (player.Character != null)
            {
                var channelObject = Database.UpdateOrAddPlayer(channel, player);
                Console.WriteLine(DateTime.Now + " Updated Account: " + player.Account + " and Character: " + player.Character.Name);
                Clients.Group(channel).ChannelUpdate(channelObject);
            }
        }        
    }
}
