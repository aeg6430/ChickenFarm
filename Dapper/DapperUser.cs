using Core;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DapperFile
{
    public class DapperUser : IUser
    {
        private SqlConnection Connection =>
            new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);

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
            string cmd = @"
              INSERT INTO [dbo].[UserData]
              ([UserName],[UserEmail],[UserPassword])
              VALUES (@UserName,@UserEmail,@UserPassword)";
            var input = new
            {
                UserName = request.UserName,
                UserEmail = request.UserEmail,
                UserPassword = request.UserPassword,
       
            };
            this.Connection.Execute(cmd, input);
        }
        //Read
        public IEnumerable<UserInfo> GetAll()
        {
            string cmd = @"SELECT 
u.[id] AS[使用者識別碼],
u.[account] AS[帳號],
u.[password],
u.[company_id] AS 公司識別碼,
u.[data_remark],
u.[create_date],
u.[create_sid],
u.[update_time],
u.[update_sid],
u.[deleted],
c.[company_no],
c.[company_name],
up.[name],
up.[email],
up.[address],
up.[mobile]
FROM[ChickenFarm].[dbo].[User] AS u
LEFT JOIN(
    SELECT[Company].[company_no],
[Company].[company_name],
[Company].[company_id]
FROM [Company]
) AS C
ON u.company_id = c.company_id

LEFT JOIN(
    SELECT[UserProfile].[user_id],
    [UserProfile].[name],
[UserProfile].[email],
[UserProfile].[address],
[UserProfile].[mobile]
FROM [UserProfile]
) AS up
ON u.id = up.user_id";
            var response = this.Connection.Query<UserInfo>(cmd);
            return response;
        }
        public UserInfo GetById(int id)
        {
            string cmd = @"SELECT 
u.[id] AS [使用者識別碼],
u.[account] AS [帳號],
u.[password],
u.[company_id] AS 公司識別碼,
u.[data_remark],
u.[create_date],
u.[create_sid],
u.[update_time],
u.[update_sid],
u.[deleted],
c.[company_no],
c.[company_name],
up.[name],
up.[email],
up.[address],
up.[mobile]
FROM [Northwind].[dbo].[User] AS u
LEFT JOIN(
	SELECT [Company].[company_no],
[Company].[company_name],
[Company].[company_id]
FROM [Company]
) AS C
ON u.company_id=c.company_id

LEFT JOIN(
	SELECT [UserProfile].[user_id],
	[UserProfile].[name],
[UserProfile].[email],
[UserProfile].[address],
[UserProfile].[mobile]
FROM [UserProfile]
) AS up
ON u.id=up.user_id
WHERE u.[id]=@id";
            using (var conn = this.Connection)
            {
                var response = this.Connection.Query<UserInfo>(cmd, new { id = id });
                return response.SingleOrDefault();
            }
        }
        public IEnumerable<UserInfo> GetByRequest(UserInfo request)
        {
            string cmd = @"SELECT 
u.[id] AS [使用者識別碼],
u.[account] AS [帳號],
u.[password],
u.[company_id] AS 公司識別碼,
u.[data_remark],
u.[create_date],
u.[create_sid],
u.[update_time],
u.[update_sid],
u.[deleted],
c.[company_no],
c.[company_name],
up.[name],
up.[email],
up.[address],
up.[mobile]
FROM [Northwind].[dbo].[User] AS u
LEFT JOIN(
	SELECT [Company].[company_no],
[Company].[company_name],
[Company].[company_id]
FROM [Company]
) AS C
ON u.company_id=c.company_id

LEFT JOIN(
	SELECT [UserProfile].[user_id],
	[UserProfile].[name],
[UserProfile].[email],
[UserProfile].[address],
[UserProfile].[mobile]
FROM [UserProfile]
) AS up
ON u.id=up.user_id
WHERE (u.[account] LIKE concat('%',@UserAccount,'%') OR @UserAccount IS NULL )
AND (c.[company_no]=@CompanyNo OR @CompanyNo IS NULL )
AND (c.[company_name] LIKE concat('%',@CompanyName,'%') OR @CompanyName IS NULL )";
            var response = this.Connection.Query<UserInfo>
                (cmd,
                new
                {
                    UserName = request.UserName,
                    UserEmail = request.UserEmail,
                    UserPassword = request.UserPassword
                });
            return response;
        }
        //Update
        public void PutById(int id, UserInfo request)
        {
            string cmd = @"UPDATE [User]
                            SET 
                            [account] = @UserAccount,
                            [password] = @UserPassword,
                            [company_id] = @CompanyId,
                            [data_remark] = @DataRemark,
                            [update_time] = GETDATE(),
                            [update_sid] = @UpdateSid
                          
                            WHERE [id] = @Id";
            using (var conn = this.Connection)
            {

                conn.Execute(cmd, new
                {
                    UserName = request.UserName,
                    UserEmail = request.UserEmail,
                    UserPassword = request.UserPassword
                });

            }
        }
        //Delete
        public void DeleteById(int id)
        {

            string cmdSelect = @"SELECT up.[user_id] FROM [Northwind].[dbo].[UserProfile] AS up WHERE up.[deleted]=0 AND up.[user_id]=@id";
            string cmdSelect2 = @"SELECT ur.[user_id] FROM [Northwind].[dbo].[UserRole] AS ur WHERE  ur.[user_id]=@id";
            string cmdUpdate = @"UPDATE [User]
                            SET 
                            [deleted] =1
                            WHERE [id] = @Id";
            using (var conn = this.Connection)
            {

                if (conn.Query<int?>(cmdSelect, new { id = id }).SingleOrDefault() == null && conn.Query<int?>(cmdSelect2, new { id = id }).SingleOrDefault() == null)
                {
                    conn.Execute(cmdUpdate, new
                    {
                        Id = id
                    });
                }





            }
        }


    }
}
