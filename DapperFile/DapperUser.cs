using Core;
using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Hosting;

namespace DapperUser
{
    public class DapperUser : IUser
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
        public void PostByRequest(UserInfo request)
        {
      
            SendMessageWithImage("嗨嗨", "ZnMyyXSvOuzjFXvZ4T5mEI6xRcjsJD5R4WvFvO1iBTS");
            string cmd = @"
              INSERT INTO [dbo].[UserData]
              ([GUID],[UserID],[UserEmail],[UserPassword])
              VALUES (@GUID,@UserID,@UserEmail,@UserPassword)";
            var input = new
            {
                GUID = request.GUID,
                UserID = request.UserID,
                UserEmail = request.UserEmail,
                UserPassword = request.UserPassword,
            };
            this.Connection.Execute(cmd, input);
        }
        //Read
        public IEnumerable<UserInfo> GetAll()
        {
            string cmd = @"SELECT 
            ud.[GUID],
            ud.[UserID],
            ud.[UserEmail],
            ud.[UserPassword]
            FROM[ChickenFarm].[dbo].[UserData] AS ud";
            var response = this.Connection.Query<UserInfo>(cmd);
            return response;
        }
        public UserInfo GetById(string id)
        {
            string cmd = @"SELECT 
            ud.[GUID],
            ud.[UserID],
            ud.[UserEmail],
            ud.[UserPassword]
            FROM[ChickenFarm].[dbo].[UserData] AS ud
            WHERE ud.[GUID]=@id";
            using (var conn = this.Connection)
            {
                var response = this.Connection.Query<UserInfo>(cmd, new { id = id });
                return response.SingleOrDefault();
            }
        }
        public IEnumerable<UserInfo> GetByRequest(UserInfo request)
        {
            string cmd = @"SELECT 
            ud.[GUID],
            ud.[UserID],
            ud.[UserEmail],
            ud.[UserPassword]
            FROM[ChickenFarm].[dbo].[UserData] AS ud
            WHERE 
            (ud.[UserID] =@UserID)
            OR (ud.[UserEmail]=@UserEmail)
            OR (ud.[UserPassword] =@UserPassword)";
            var response = this.Connection.Query<UserInfo>
                (cmd,
                new {
                    GUID =request.GUID,
                    UserID = request.UserID,
                    UserEmail = request.UserEmail,
                    UserPassword = request.UserPassword,
                });
            return response;
        }
        //Update
        public void PutById(string id, UserInfo request)
        {
            string cmd = @"UPDATE [UserData]
                            SET 
                            [UserID] = @UserId,
                            [UserEmail] = @UserEmail,
                            [UserPassword] = @UserPassword,    
                            [EditTime] = GETDATE()
                            WHERE [GUID] = @GUID";
            using (var conn = this.Connection)
            {

                conn.Execute(cmd, new
                {
                    GUID = id,
                    UserID = request.UserID,
                    UserEmail = request.UserEmail,
                    UserPassword = request.UserPassword,
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


        public void SendMessageWithImage(string message, string token)
        {


            string filePath = "../ChickenFarm/Images/Pic.png";




            string relativeFilePath = "../ChickenFarm/Images/Pic.png";

     
            string absoluteFilePath = Path.Combine(HostingEnvironment.MapPath("~"), relativeFilePath);


            byte[] fileContents = File.ReadAllBytes(absoluteFilePath);



            HttpClientHandler handler = new HttpClientHandler();
            HttpClient Client = new HttpClient(handler);
            Client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);    
            MultipartFormDataContent content = new MultipartFormDataContent();
            ByteArrayContent baContent = new ByteArrayContent(fileContents);
            content.Add(baContent, "imageFile", "jpg");
            string url = @"https://notify-api.line.me/api/notify?message=";        
            url = url + message;
            var response = Client.PostAsync(url, content).Result;





        }





    }

}
