using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ExileSystem.Models
{
    public class Message
    {
        public enum MessageType
        {
            Message,
            //Events            
            SelfEnteringArea,
            OtherJoinArea,
            OtherLeaveArea,
            //Other
            GuildInformation,
            Other,
        }

        public enum MessageChannel
        {
            TradeChannel,
            PartyChannel,
            WhisperChannel,
            GlobalChannel,
            Information
        }

        public Guid ID;
        public DateTime Time { get; set; }
        public string Player { get; set; }
        public MessageType Type { get; set; }
        public MessageChannel Channel { get; set; }
        public string Text { get; set; }

        public Message(string message)
        {
            ID = Guid.NewGuid();

            const string pattern = @"(\d{4}\/\d{2}\/\d{2}\s\d{2}:\d{2}:\d{2})\s[\d]*\s[\d]*\s\[.*\]\s([$@%#]?)\s?(<.*>\s?)?(\w*):\s(.*)";
            var matches = Regex.Matches(message, pattern, RegexOptions.IgnorePatternWhitespace | RegexOptions.Multiline | RegexOptions.IgnoreCase);

            if (matches.Count != 1)
            {
                Type = MessageType.Other;
                return;
            }
            else
            {
                Time = DateTime.ParseExact(matches[0].Groups[1].Value, "yyyy/MM/dd HH:mm:ss", CultureInfo.InvariantCulture);
                Player = matches[0].Groups[3].Value.Split(' ').Last();
                Text = matches[0].Groups[4].Value;
            }

            var type = matches[0].Groups[2].Value;

            
            if (message.Contains("You have entered"))
            {
                Type = MessageType.SelfEnteringArea;
                Channel = MessageChannel.Information;
            }
            else if ((message.Contains("has left the area")))
            {
                Type = MessageType.OtherLeaveArea;
                Channel = MessageChannel.Information;
            }
            else if (message.Contains("Joined guild named"))
            {
                Type = MessageType.GuildInformation;
                Channel = MessageChannel.Information;
                Text = Helpers.SubstringBetween(Text, "Joined guild named ", " with").Trim();
            }

            if (type == "$")
            {
                Channel = MessageChannel.TradeChannel;
                Type = MessageType.Message;
            }
            else if (type == "@")
            {
                Channel = MessageChannel.WhisperChannel;
                Type = MessageType.Message;
            }
            else if (type == "%")
            {
                Channel = MessageChannel.PartyChannel;
                Type = MessageType.Message;
            }
            else if (type == "#")
            {
                Channel = MessageChannel.GlobalChannel;
                Type = MessageType.Message;
            }
            
            if (Type == MessageType.SelfEnteringArea)
            {
                   Text = Helpers.SubstringBetween(Text, "you have entered ", ".").Trim();
            }
            else if (Type == MessageType.OtherJoinArea)
            {
                Player = Helpers.SubstringBefore(Text, " has joined the area.").Trim();
            }
            else if (Type == MessageType.OtherLeaveArea)
            {
                Player = Helpers.SubstringBefore(Text, " has left the area.").Trim();
            }
        }
    }
}
