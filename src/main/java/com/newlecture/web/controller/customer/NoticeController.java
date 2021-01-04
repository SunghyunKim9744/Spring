package com.newlecture.web.controller.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.newlecture.web.entity.Notice;
import com.newlecture.web.service.NoticeService;

@Controller
@RequestMapping("/customer/notice/")
public class NoticeController {

	@Autowired
	private NoticeService noticeService;
	@RequestMapping("list")
	public String list(Model model) {
		
//		NoticeService noticeService = new NoticeService();
		List<Notice> list = noticeService.getList();
		model.addAttribute("list", list);
//		7번째 줄에 적힌 url로 맵핑이 됨.
//		즉, /cutomer/board/notice/list.jsp
//		return "list.jsp";
		
//		return "/WEB-INF/view/customer/board/notice/list.jsp";
//		return "customer/notice/list";
//		tiles가 인식할 수 있는 이름으로 바꾸기
	    return "customer.notice.list";
	}
	
	@RequestMapping("detail")
	public String detail() {
		return "customer.notice.detail";
	}

}


