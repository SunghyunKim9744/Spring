package com.newlecture.web.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.newlecture.web.entity.NoticeView;
import com.newlecture.web.service.NoticeService;

// 이름 충돌이 나기 때문에 apiNoticeController로 바꿈 
@RestController("apiNoticeController")
@RequestMapping("/api/notice/")
public class NoticeController {
	
	@Autowired
	private NoticeService service;
	
	@RequestMapping("list")
	public List<NoticeView> list(
			@RequestParam(name = "p", defaultValue="1") int page,
			@RequestParam(name = "f", required = false) String field,
			@RequestParam(value = "q", required = false) String query) {
		
		int size=10;
		List<NoticeView> list = service.getViewList(page,size,field,query);
		return list;
	}

}
