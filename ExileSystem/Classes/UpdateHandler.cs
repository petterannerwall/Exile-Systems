using ExileSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ExileSystem.Classes;

namespace ExileSystem.Classes
{
    public static class UpdateHandler
    {
        public static void HandleUpdateFromMessage(Message message)
        {
            switch (message.Type)
            {
                case Message.MessageType.Message:
                    break;
                case Message.MessageType.SelfEnteringArea:
                    LocalPlayer.player.Area = message.Text;
                    break;
                case Message.MessageType.OtherJoinArea:
                    LocalPlayer.player.InArea.Add(message.Player);
                    break;
                case Message.MessageType.OtherLeaveArea:
                    LocalPlayer.player.InArea.Remove(message.Player);
                    break;
                case Message.MessageType.GuildInformation:
                    LocalPlayer.player.Guild = message.Text;
                    break;
                case Message.MessageType.Other:
                    break;
                default:
                    break;
            }

            if (message.Type != Message.MessageType.Other)
            {
                HubProxy.UpdatePlayer(LocalPlayer.player);
            }

            //Send update call to webserver here
        }
    }
}
