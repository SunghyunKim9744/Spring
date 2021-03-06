package com.newlecture.web.dao.mybatis;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.newlecture.web.dao.NoticeDao;
import com.newlecture.web.entity.Notice;
import com.newlecture.web.entity.NoticeView;
		// =============== Oracle =====================
//@Repository
//public class MyBatisNoticeDao implements NoticeDao{
//
//	@Autowired
//	private SqlSession session;
//	
//	private NoticeDao mapper;
//	
////	public MyBatisNoticeDao() {
////		System.out.println("생성자1");
////	}
//	@Autowired
//	public MyBatisNoticeDao(SqlSession session) {
//		//this.session = session;
//		//System.out.println("asdasd");
//		mapper = session.getMapper(NoticeDao.class);
//		
//	}
//	
//	@Override
//	public int insert(Notice notice) {
////		NoticeDao mapper = session.getMapper(NoticeDao.class);
////		return mapper.insert(notice);
//		return session.getMapper(NoticeDao.class).insert(notice);
//	}
//
//	@Override
//	public int update(Notice notice) {
//		// TODO Auto-generated method stub
//		return session.getMapper(NoticeDao.class).update(notice);
//	}
//
//	@Override
//	public int delete(int id) {
//		// TODO Auto-generated method stub
//		return 0;
//	}
//
//	@Override
//	public Notice get(int id) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	@Override
//	public List<Notice> getList(int startIndex, int endIndex, String field, String query) {
//		// TODO Auto-generated method stub
//		return session.getMapper(NoticeDao.class).getList(startIndex,endIndex,field,query);
//	}
//
//	@Override
//	public List<Notice> getList(int startIndex) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	@Override
//	public List<Notice> getList() {
//		// TODO Auto-generated method stub
//		return session.getMapper(NoticeDao.class).getList();
//	}
//
//	@Override
//	public List<NoticeView> getViewList() {
//		// TODO Auto-generated method stub
//		return session.getMapper(NoticeDao.class).getViewList(1, 10, "title", "");
//	}
//
//	@Override
//	public List<NoticeView> getViewList(int startIndex, int endIndex) {
//		
//		return session.getMapper(NoticeDao.class).getViewList(startIndex, endIndex, "title", "");
//	}
//
//	@Override
//	public List<NoticeView> getViewList(int startIndex, int endIndex, String field, String query) {
////		System.out.println("aa");
//		return mapper.getViewList(startIndex, endIndex, field, query);
//	}
//
//	@Override
//	public Notice getLast() {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	@Override
//	public int getCount(String field, String query) {
//		
//		return mapper.getCount(field, query);
//	}
//
//}
		// ==================== MySQL ========================
@Repository
public class MyBatisNoticeDao implements NoticeDao{

	@Autowired
	private SqlSession session;
	
	private NoticeDao mapper;
	
//	public MyBatisNoticeDao() {
//		System.out.println("생성자1");
//	}
	@Autowired
	public MyBatisNoticeDao(SqlSession session) {
		//this.session = session;
		//System.out.println("asdasd");
		mapper = session.getMapper(NoticeDao.class);
		
	}
	// 트랜잭션을 갖고오면 처리해주고 안갖고오면 안해줌.
	@Transactional(propagation = Propagation.SUPPORTS)
	@Override
	public int insert(Notice notice) {
//		NoticeDao mapper = session.getMapper(NoticeDao.class);
//		return mapper.insert(notice);
		return session.getMapper(NoticeDao.class).insert(notice);
	}

	@Override
	public int update(Notice notice) {
		// TODO Auto-generated method stub
		return session.getMapper(NoticeDao.class).update(notice);
	}

	@Override
	public int delete(int id) {
		// TODO Auto-generated method stub
		return mapper.delete(id);
	}

	@Override
	public Notice get(int id) {
		// TODO Auto-generated method stub
		return mapper.get(id);
	}

	@Override
	public List<Notice> getList(int offset, int size, String field, String query) {
		// TODO Auto-generated method stub
		return session.getMapper(NoticeDao.class).getList(offset,size,field,query);
	}

	@Override
	public List<Notice> getList(int offset) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Notice> getList() {
		// TODO Auto-generated method stub
		return session.getMapper(NoticeDao.class).getList();
	}

	@Override
	public List<NoticeView> getViewList() {
		// TODO Auto-generated method stub
		return session.getMapper(NoticeDao.class).getViewList(1, 10, "title", "");
	}

	@Override
	public List<NoticeView> getViewList(int offset, int size) {
		
		return session.getMapper(NoticeDao.class).getViewList(offset, size, "title", "");
	}

	@Override
	public List<NoticeView> getViewList(int offset, int size, String field, String query) {
//		System.out.println("aa");
		return mapper.getViewList(offset, size, field, query);
	}

	@Override
	public Notice getLast() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int getCount(String field, String query) {
		
		return mapper.getCount(field, query);
	}

	@Override
	public Notice getPrev(int id) {
		// TODO Auto-generated method stub
		return mapper.getPrev(id);
	}

	@Override
	public Notice getNext(int id) {
		// TODO Auto-generated method stub
		return mapper.getNext(id);
	}

	@Override
	public int deleteAll(int[] ids) {
		System.out.println("??asdasd");
		return mapper.deleteAll(ids);
	}

}

