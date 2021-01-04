package com.newlecture.web.dao.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.newlecture.web.dao.NoticeDao;
import com.newlecture.web.entity.Notice;
import com.newlecture.web.entity.NoticeView;


public class JdbcNoticeDao implements NoticeDao {

	@Override
	public int insert(Notice notice) {
		int result = 0;

		String url = DBContext.URL;
		String sql = "INSERT INTO NOTICE(TITLE,CONTENT,WRITER_ID) VALUES(?,?,?)";

		try {

			Class.forName("oracle.jdbc.driver.OracleDriver");
			Connection con = DriverManager.getConnection(url, DBContext.UID, DBContext.PWD);

//			? 값을 꽂아 놓을 수 있게 함 - > PreparedStatement
			PreparedStatement st = con.prepareStatement(sql);
			st.setString(1, notice.getTitle());
			st.setString(2, notice.getContent());
			st.setString(3, notice.getWriterId());

//			결과가 있을 때만 필요(select 일경우만)
//			ResultSet rs = st.executeQuery(sql);

//			insert, update, delete 문장일 때
			result = st.executeUpdate();

			st.close();
			con.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return result;
	}

	@Override
	public Notice get(int id) {
		Notice n = null;

		String url = DBContext.URL;
		String sql = "SELECT * FROM NOTICE WHERE ID=" + id;

		try {
			// Driver load
			Class.forName("oracle.jdbc.driver.OracleDriver");
			// DB 연결
			Connection con = DriverManager.getConnection(url, DBContext.UID, DBContext.PWD);

			// DB 실행
			Statement st = con.createStatement();

			// DB 결과
			ResultSet rs = st.executeQuery(sql);

//			String[] nicnames= new String[2];

			if (rs.next()) {

				// int id = rs.getInt("ID");
				String title = rs.getNString("TITLE");
				String writerId = rs.getNString("WRITER_ID");
				String content = rs.getNString("CONTENT");
				Date regdate = rs.getDate("REGDATE");
				int hit = rs.getInt("HIT");
				String files = rs.getNString("FILES");

				n = new Notice(id, title, writerId, content, regdate, hit, files);

			}

			rs.close();
			st.close();
			con.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return n;
	}

	@Override
	public List<Notice> getList() {
		String url = DBContext.URL;
		String sql = "SELECT * FROM NOTICE";

		List<Notice> list = new ArrayList<>();

		try {
			// Driver load
			Class.forName("oracle.jdbc.driver.OracleDriver");
			// DB 연결
			Connection con = DriverManager.getConnection(url, DBContext.UID, DBContext.PWD);

			// DB 실행
			Statement st = con.createStatement();

			// DB 결과
			ResultSet rs = st.executeQuery(sql);

//			String[] nicnames= new String[2];

			while (rs.next()) {

				int id = rs.getInt("ID");
				String title = rs.getNString("TITLE");
				String writerId = rs.getNString("WRITER_ID");
				String content = rs.getNString("CONTENT");
				Date regdate = rs.getDate("REGDATE");
				int hit = rs.getInt("HIT");
				String files = rs.getNString("FILES");

				Notice n = new Notice(id, title, writerId, content, regdate, hit, files);

				list.add(n);
			}

			rs.close();
			st.close();
			con.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public int update(Notice notice) {
		int result = 0;

		String url = DBContext.URL;
		String sql = "UPDATE NOTICE SET TITLE=?,CONTENT=? WHERE ID=?";

		try {

			Class.forName("oracle.jdbc.driver.OracleDriver");
			Connection con = DriverManager.getConnection(url, DBContext.UID, DBContext.PWD);

//			? 값을 꽂아 놓을 수 있게 함 - > PreparedStatement
			PreparedStatement st = con.prepareStatement(sql);
			st.setString(1, notice.getTitle());
			st.setString(2, notice.getContent());
			st.setInt(3, notice.getId());

			result = st.executeUpdate();

			st.close();
			con.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return result;
	}

	@Override
	public int delete(int id) {
		int result = 0;

		String url = DBContext.URL;
		String sql = "DELETE FROM NOTICE WHERE ID=?";

		try {

			Class.forName("oracle.jdbc.driver.OracleDriver");
			Connection con = DriverManager.getConnection(url, DBContext.UID, DBContext.PWD);
			PreparedStatement st = con.prepareStatement(sql);
			st.setInt(1, id);

			result = st.executeUpdate();

			st.close();
			con.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public List<Notice> getList(int startIndex) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<NoticeView> getViewList() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<NoticeView> getViewList(int startIndex, int endIndex) {
		// TODO Auto-generated method stub
		return getViewList(startIndex,endIndex,null,null);
	}

	@Override
	public List<NoticeView> getViewList(int startIndex, int endIndex, String field, String query) {

		List<NoticeView> list = new ArrayList<>();

		String url = DBContext.URL;
		String sql = "SELECT * " + "FROM (" + "    SELECT ROWNUM NUM, N.* " + "    FROM ("
				+ "        SELECT * FROM NOTICE_VIEW ORDER BY REGDATE DESC" + "    ) N" + ") WHERE NUM BETWEEN ? AND ?";

		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			Connection con = DriverManager.getConnection(url, DBContext.UID, DBContext.PWD);
			PreparedStatement st = con.prepareStatement(sql);
			st.setInt(1, startIndex);
			st.setInt(2, endIndex);
			ResultSet rs = st.executeQuery();

			while (rs.next()) {

				int id = rs.getInt("ID");
				String title = rs.getNString("TITLE");
				String writerId = rs.getNString("WRITER_ID");
//				String content = rs.getNString("CONTENT");
				Date regdate = rs.getDate("REGDATE");
				int hit = rs.getInt("HIT");
				String files = rs.getNString("FILES");
				String writerName = rs.getString("WRITER_NAME");
				int cmtCount = rs.getInt("CMT_COUNT");

				NoticeView n = new NoticeView(id, title, writerId, "", regdate, hit, files, writerName, cmtCount);

				list.add(n);
			}

			rs.close();
			st.close();
			con.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public List<Notice> getList(int startIndex, int endIndex, String field, String query) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Notice getLast() {
		Notice n = null;

		String url = DBContext.URL;
		String sql = "SELECT * FROM NOTICE WHERE ID = (SELECT MAX(ID) FROM NOTICE)";

		try {
			// Driver load
			Class.forName("oracle.jdbc.driver.OracleDriver");
			// DB 연결
			Connection con = DriverManager.getConnection(url, DBContext.UID, DBContext.PWD);

			// DB 실행
			Statement st = con.createStatement();

			// DB 결과
			ResultSet rs = st.executeQuery(sql);

//			String[] nicnames= new String[2];

			if (rs.next()) {

				int id = rs.getInt("ID");
				String title = rs.getNString("TITLE");
				String writerId = rs.getNString("WRITER_ID");
				String content = rs.getNString("CONTENT");
				Date regdate = rs.getDate("REGDATE");
				int hit = rs.getInt("HIT");
				String files = rs.getNString("FILES");

				n = new Notice(id, title, writerId, content, regdate, hit, files);

			}

			rs.close();
			st.close();
			con.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return n;
	}

}
