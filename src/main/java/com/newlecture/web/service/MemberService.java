package com.newlecture.web.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.newlecture.web.dao.MemberDao;
import com.newlecture.web.dao.jdbc.JdbcMemberDao;
import com.newlecture.web.entity.Member;

public class MemberService {
	
	private MemberDao memberDao;
	
	public MemberService() {
		memberDao = new JdbcMemberDao();
	}


	public List<Member> getList() {
		String url = "jdbc:oracle:thin:@hi.namoolab.com:1521/xepdb1";
		String sql = "SELECT * FROM MEMBER WHERE PWD='111'";

		List<Member> list = new ArrayList<>();

		try
		{
			// Driver load
			Class.forName("oracle.jdbc.driver.OracleDriver");
			// DB 연결
			Connection con = DriverManager.getConnection(url, "NEWLEC", "11111");

			// DB 실행
			Statement st = con.createStatement();

			// DB 결과
			ResultSet rs = st.executeQuery(sql);

//			String[] nicnames= new String[2];

			while (rs.next()) {
				int id = rs.getInt("ID");
				String nicname = rs.getNString("NICNAME");
				String pwd = rs.getNString("PWD");
				String name = rs.getNString("NAME");

				Member m = new Member();
				m.setId(id);
				m.setNicname(nicname);
				m.setPwd(pwd);
				m.setName(name);

				list.add(m);
					

			}

			rs.close();
			st.close();
			con.close();
		}catch(
		SQLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return list;
	}

	public boolean isVaild(String uid, String pwd) {
		Member member = memberDao.get(uid);
		if(member == null) // 회원이 아닌 경우
			return false;
		else if(!(member.getPwd().equals(pwd))) // 회원이긴 한데 비밀번호가 일치하지 않는 경우
			return false;
		return true;
	}
}
