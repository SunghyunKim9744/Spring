package com.newlecture.web.controller.customer.board;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/customer/board/notice/")
public class NoticeController {

	@RequestMapping("list")
	public String list() {
//		7번째 줄에 적힌 url로 맵핑이 됨.
//		즉, /cutomer/board/notice/list.jsp
//		return "list.jsp";
		
//		return "/WEB-INF/view/customer/board/notice/list.jsp";
		return "/customer/board/notice/list";
	}

}
