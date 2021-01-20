package com.newlecture.web.controller.admin.board;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.newlecture.web.entity.Notice;
import com.newlecture.web.service.NoticeService;

//@RestController -- > RESTful API에 적합, 데이터를 전달할 때
@Controller("adminNoticeController")
@RequestMapping("/admin/board/notice/")
public class NoticeController {
	
	@Autowired
	private NoticeService service;
	@RequestMapping("list")
	public String list() {
		return "admin.board.notice.list";
	}
	
//	reg 가 get요청으로 올 때
	@GetMapping("reg")
	public String reg() {
		return "admin.board.notice.reg";
	}
	
//	reg 가 post요청으로 올 때
	@PostMapping("reg")
//	객체가 전달될 때 setter가 있을 경우 같은 이름으로 꽂아서 갖고옴. n.setTitle,content 안해도됨
//	Principal 사용자 정보를 얻을 수 있음.
	public String reg(Notice notice,Principal principal/*String title, String content*/) {
		//System.out.println(title);
		notice.setWriterId(principal.getName());
		service.insert(notice);
//		/admin/board/notice/list 컨트롤러 요청
		return "redirect:list";
	}

	@RequestMapping("edit")
	public String edit() {
		return "admin.board.notice.edit";
	}
}
