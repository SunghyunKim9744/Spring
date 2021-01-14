package com.newlecture.web.dao.spring;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import com.newlecture.web.dao.NoticeDao;
import com.newlecture.web.entity.Notice;
import com.newlecture.web.entity.NoticeView;

//@Repository
public class SpringNoticeDao implements NoticeDao{

	@Autowired
	private JdbcTemplate jdbcTemplate;
    // 3가지 방법
	// JdbcTemplate - > MyBatis - > JPA
	@Override
	public int insert(Notice notice) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int update(Notice notice) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int delete(int id) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Notice get(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Notice> getList(int startIndex, int endIndex, String field, String query) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Notice> getList(int startIndex) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Notice> getList() {
//		List<Notice> list = new ArrayList<>();
//		list.add(new Notice("제목이다","내용"));
		
		String sql = "SELECT * FROM NOTICE";
		
//		RowMapper<Notice> rowMapper = new RowMapper<Notice>() {
//
//			@Override
//			public Notice mapRow(ResultSet rs, int rowNum) throws SQLException {
//				int id = rs.getInt("ID");
//				String title = rs.getNString("TITLE");
//				String writerId = rs.getNString("WRITER_ID");
//				String content = rs.getNString("CONTENT");
//				Date regdate = rs.getDate("REGDATE");
//				int hit = rs.getInt("HIT");
//				String files = rs.getNString("FILES");
//
//				Notice n = new Notice(id, title, writerId, content, regdate, hit, files);
//
//				return n;
//			}
//		};


		return jdbcTemplate.query(sql, (rs,row)->{
			int id = rs.getInt("ID");
			String title = rs.getNString("TITLE");
			String writerId = rs.getNString("WRITER_ID");
			String content = rs.getNString("CONTENT");
			Date regdate = rs.getDate("REGDATE");
			int hit = rs.getInt("HIT");
			String files = rs.getNString("FILES");

			Notice n = new Notice(id, title, writerId, content, regdate, hit, files);

			return n;
		});
	}

	@Override
	public List<NoticeView> getViewList() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<NoticeView> getViewList(int startIndex, int endIndex) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<NoticeView> getViewList(int startIndex, int endIndex, String field, String query) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Notice getLast() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int getCount(String field, String query) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Notice getPrev(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Notice getNext(int id) {
		// TODO Auto-generated method stub
		return null;
	}

}
