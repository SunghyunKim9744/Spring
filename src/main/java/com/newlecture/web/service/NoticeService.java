package com.newlecture.web.service;

import java.util.List;

import com.newlecture.web.entity.Notice;
import com.newlecture.web.entity.NoticeView;


public interface NoticeService {
      
   List<NoticeView> getViewList(int page, int size, String field, String query);
   List<Notice> getList(int page, int size, String field, String query);   
   int deleteAll(int[] ids);   
   int hitUp(int id);   
   List<NoticeView> getViewList(int page, int size);   
   Notice get(int id);
   int insert(Notice notice);
   int update(Notice notice);   
   int delete(int id);
   int getLastId();
   
   int getCount(String field, String query);
}