package com.newlecture.web.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import com.newlecture.web.entity.NoticeView;
import com.newlecture.web.entity.Notice;

			// ================== Oracle ==================
//// mybatis - > sql과 필요한 인터페이스만 알려주면 됨 - > 구현체를 만들고 spring ioc에 담음.
////@Mapper 분리
//public interface NoticeDao {
//	
//	int insert(Notice notice);
//	int update(Notice notice);
//	int delete(int id);
//	
////	#{}, ${} - > # - > 값, $ - > 문자
//	//@Select("SELECT * FROM NOTICE WHERE ID=#{id}")
//	Notice get(int id);
//	
//	List<Notice> getList(int startIndex, int endIndex, String field, String query);
//	List<Notice> getList(int startIndex);
//	
//	//@Select("SELECT * FROM NOTICE")
////	자바 변수명과 다를 때 맵핑 방법 1.
//	//@Result(property = "writerId", column = "WRITER_ID")
////		여러개를 맵핑할 경우
////	@Results(value = {
////			@Result(property = "writerId", column = "WRITER_ID"),
////			@Result(property = "title", column = "TITLE2")
////	})
//	
//// 방법 2. - > 쿼리문에서 별칭 주기
//	List<Notice> getList();
//	
//	List<NoticeView> getViewList();
//	List<NoticeView> getViewList(int startIndex, int endIndex);
//	List<NoticeView> getViewList(int startIndex, int endIndex, String field, String query);
//	Notice getLast();
//	int getCount(String field, String query);
//	
//}

		//================== MySQL ==================
public interface NoticeDao {
	
	int insert(Notice notice);
	int update(Notice notice);
	int delete(int id);
	

	Notice get(int id);
	
	List<Notice> getList(int offset, int size, String field, String query);
	List<Notice> getList(int offset);
	
	List<Notice> getList();
	
	List<NoticeView> getViewList();
	List<NoticeView> getViewList(int offset, int size);
	List<NoticeView> getViewList(int offset, int size, String field, String query);
	Notice getLast();
	int getCount(String field, String query);
	Notice getPrev(int id);
	Notice getNext(int id);
	
}
