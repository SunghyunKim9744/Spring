package com.newlecture.web.dao.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Date;

import com.newlecture.web.dao.MemberDao;
import com.newlecture.web.entity.Member;

public class JdbcMemberDao implements MemberDao{

   @Override
   public Member get(String nicname) {
      Member m = null;
      
      String url = DBContext.URL;
      String sql = "SELECT * FROM MEMBER WHERE NICNAME='"+ nicname+"'";

      try {

         Class.forName("oracle.jdbc.driver.OracleDriver");
         Connection con = DriverManager.getConnection(url, DBContext.UID, DBContext.PWD);
         Statement st = con.createStatement();
         ResultSet rs = st.executeQuery(sql);

         if (rs.next()) {
            
            int id = rs.getInt("id");
            String pwd = rs.getString("pwd");
            String email = rs.getString("email");
            Date regDate = rs.getDate("regdate");
            
            m = new Member(id, nicname, pwd, email, regDate);

         }

         rs.close();
         st.close();
         con.close();

      } catch (SQLException e) {
         e.printStackTrace();
      } catch (ClassNotFoundException e) {
         e.printStackTrace();
      }
      
      return m;
   }

}