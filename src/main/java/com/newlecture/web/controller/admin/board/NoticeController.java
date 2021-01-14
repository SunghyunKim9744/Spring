package com.newlecture.web.controller.admin.board;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

//@RestController -- > RESTful API에 적합, 데이터를 전달할 때
@Controller("adminNoticeController")
@RequestMapping("/admin/board/notice/")
public class NoticeController {
	
	@RequestMapping("list")
	public String list() {
		return "admin.board.notice.list";
	}
	
	@RequestMapping("reg")
	public String reg() {
		return "admin.board.notice.reg";
	}

	@RequestMapping("edit")
	public String edit() {
		return "admin.board.notice.edit";
	}
}
