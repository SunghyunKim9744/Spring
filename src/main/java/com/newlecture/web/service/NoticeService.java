package com.newlecture.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newlecture.web.dao.NoticeDao;
import com.newlecture.web.entity.Notice;
import com.newlecture.web.entity.NoticeView;

//@Component 구성요소, 스프링 어플리케이션을 구성하는 구성요소 객체란 의미, 
//Component 안에는 @Controller, @Service, @Respository가 포함.
@Service
public class NoticeService {
	
	@Autowired
	private NoticeDao noticeDao;
	
//	public NoticeService() {
//		
//		noticeDao = new JdbcNoticeDao();
//	}

	
	public int insert(Notice notice) {
		
		return noticeDao.insert(notice);
	}
	
	public List<Notice> getList(){
		return noticeDao.getList();
	}
	public List<Notice> getList(int page, int size, String field, String query) {
		int startIndex = 1+(page-1)*size;
		int endIndex = page*10;
		return noticeDao.getList(startIndex, endIndex, field, query);
	}

//	public int hitUp(int id) {
//		int result =0;
//		Notice notice = noticeDao.get(id);
//		notice.setHit(notice.getHit()+1);
//		result = noticeDao.update(notice);
//		return result;
//	}
	
	public int deletaAll(int[] ids) {
		
		int result = 0;
		for(int i=0; i<ids.length; i++) {
			int id= ids[i];
			result += noticeDao.delete(id);
		}
			
		return result;
	}
	
	
	public Notice get(int id) {

		return noticeDao.get(id);
	}

	public int update(Notice notice) {
		
		return noticeDao.update(notice);
	}
	
	public int delete(int id) {
	
		return noticeDao.delete(id);
	}


	public int getLastId() {
		Notice n = noticeDao.getLast();
		return n.getId();
	}


	public List<NoticeView> getViewList() {
		
		return getViewList(1,10,"title","");
	}
	
	public List<NoticeView> getViewList(int page,int size) {
		
		return getViewList(page, size,"title","");
	}
	
	public List<NoticeView> getViewList(int page,int size, String title, String query) {
		int startIndex = 1+(page-1)*10;
		int endIndex = page*size;
		return noticeDao.getViewList(startIndex, endIndex,title,query);
	}
}
