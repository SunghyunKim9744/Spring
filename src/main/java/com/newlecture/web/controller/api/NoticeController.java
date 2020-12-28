package com.newlecture.web.controller.api;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// 이름 충돌이 나기 때문에 apiNoticeController로 바꿈 
@RestController("apiNoticeController")
@RequestMapping("/api/notice/")
public class NoticeController {
	
	@RequestMapping("list")
	public Map<String,Object> list() {
		Map<String, Object> notice = new HashMap<>();
		notice.put("id", 1);
		notice.put("title", "제목1");
//		List<String> list = new ArrayList<>();
//		list.add("hello");
//		list.add("hello2");
		return notice;
	}

}
