using Core;
using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;


namespace DapperGame
{
    public class DapperGame : IGame
    {
        private SqlConnection Connection =>
            new SqlConnection(ConfigurationManager.ConnectionStrings["ChickenFarm"].ConnectionString);
        public string ConnectionTest()
        {

            try
            {
                var conn = this.Connection;
                conn.Open();
                return String.Concat("連線狀態:", conn.State.ToString());
            }
            catch (Exception err)
            {
                return String.Concat("錯誤:", err.Message);
            }
        }
        //Create
        public void PostByRequest(GameInfo request)
        {
            string cmd = @"
              INSERT INTO [dbo].[GameData]
              ([UserID],[AchievementData],[GameData])
              VALUES (@UserID,@AchievementData,@GameData)";
            var input = new
            {
                UserID = request.UserID,
                AchievementData = request.AchievementData,
                GameData = request.GameData,      
            };
            this.Connection.Execute(cmd, input);
        }
        //Read
        public IEnumerable<GameInfo> GetAll()
        {
         
            string cmd = @"SELECT 
            gd.[UserID],
            gd.[AchievementData],
            gd.[GameData],
            gd.[EditTime]
            FROM[ChickenFarm].[dbo].[GameData] AS gd";
            var response = this.Connection.Query<GameInfo>(cmd);
            return response;
        }

        public GameInfo GetById(string id)
        {
           // SendMessage("測試文字", "NmY8sOWY4JvtqtAIX30w3jXBHrcyvSf4S3sixLrJhof");
            string cmd = @"SELECT 
            gd.[UserID],
            gd.[AchievementData],
            gd.[GameData]
            FROM[ChickenFarm].[dbo].[GameData] AS gd
            WHERE gd.[UserID]=@id";
            using (var conn = this.Connection)
            {
                var response = this.Connection.Query<GameInfo>(cmd, new { id = id });
                return response.SingleOrDefault();
            }
        }

        public IEnumerable<GameInfo> GetByRequest(GameInfo request)
        {
            string cmd = @"SELECT 
            gd.[UserID],
            gd.[AchievementData],
            gd.[GameData]
            FROM[ChickenFarm].[dbo].[GameData] AS gd
            WHERE 
            (gd.[UserID] =@UserID)
            OR (gd.[AchievementData]=@AchievementData)
            OR (gd.[GameData] =@GameData)";
            var response = this.Connection.Query<GameInfo>
                (cmd,
                new
                {
                    UserID = request.UserID,
                    AchievementData = request.AchievementData,
                    GameData = request.GameData
                });
            return response;
        }
        //Update
        public void PutById(string id, GameInfo request)
        {
            string cmd = @"UPDATE [GameData]
                            SET 
                            [UserID] = @UserID,
                            [AchievementData] = @AchievementData,
                            [GameData] = @GameData,    
                            [EditTime] = GETDATE()
                            WHERE [UserID] = @UserID";
            using (var conn = this.Connection)
            {

                conn.Execute(cmd, new
                {
                    UserID = id,
                    AchievementData = request.AchievementData,
                    GameData = request.GameData,
                });

            }
        }
        //Delete
        public void DeleteById(string id)
        {
            string cmd = @"DELETE FROM [GameData]
                            WHERE [UserID] = @UserID";
            using (var conn = this.Connection)
            {

                conn.Execute(cmd, new
                {
                    UserID = id,
                   
                });

            }
        }           


        public void SendMessage(string message, string token)
        {
            string url = "https://notify-api.line.me/api/notify";
            string postData = "message=" + WebUtility.HtmlEncode("\r\n" + message);
            byte[] byteArray = Encoding.UTF8.GetBytes(postData);
            Uri target = new Uri(url);
            WebRequest request = WebRequest.Create(target);
            request.Method = "POST";
            request.ContentType = "application/x-www-form-urlencoded";
            request.ContentLength = byteArray.Length;
            request.Headers.Add("Authorization", "Bearer " + token);

            using (var dataStream = request.GetRequestStream())
            {
                dataStream.Write(byteArray, 0, byteArray.Length);
            }
        }

    }

}
